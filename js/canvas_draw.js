/*
Logic for canvas (map) drawing as stations are loaded and operated.
*/

var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
activateDragZoom();
listenForDrag();

function drawArrows(filename, data_file, scale_param, color) {

    // Draw Arrows
    for (var key in data_file) {

        var vector = data_file[key];

        // Get line coordinates
        var lineCoordinates = [
            new google.maps.LatLng(vector[1], vector[0]),
            new google.maps.LatLng(vector[1] + (vector[3] / scale_param), vector[0] + (vector[2] / scale_param))
        ];


        var paintColor;
        var toggleValue;

        if (vector[6] === 0) {
            toggleValue = false;
            paintColor = '#484A48';
        } else {
            toggleValue = true;
            paintColor = color;
        }

        var icon = [{
            icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 2,
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: paintColor,
                fillOpacity: 1
            },
            offset: '100%'
        }];

        lines_dict[key.toUpperCase()] = new google.maps.Polyline({
            path: lineCoordinates,
            icons: icon,
            map: map,
            strokeColor: paintColor,
            fillColor: paintColor,
            strokeWeight: 1.5
        });

        lines_dict[key.toUpperCase()].vector = vector;
        lines_dict[key.toUpperCase()].filename = filename;
        lines_dict[key.toUpperCase()].name = key;
        lines_dict[key.toUpperCase()].realColor = color;
        lines_dict[key.toUpperCase()].toggled = toggleValue;

        // Content string for info window
        var contentString = '<div id="content">' + '<p><strong>Station Name: </strong>' + key.toUpperCase() +
            '</p><p><strong>North Velocity: </strong>' + Number(vector[3]).toFixed(2) +
            '</p><p><strong>East Velocity: </strong>' + Number(vector[2]).toFixed(2) +
            '</p><p><strong>Longitude: </strong>' + Number(vector[0]).toFixed(2) + '</p><p><strong>Latitude: </strong>' +
            Number(vector[1]).toFixed(2) + '</p><p><strong>Toggled: </strong>' +
            toTitleCase(lines_dict[key.toUpperCase()].toggled.toString()) +
            '</p></div>';

        lines_dict[key.toUpperCase()].infowindow = new google.maps.InfoWindow({
            content: contentString,
            position: lineCoordinates[0]
        });

        // Mousovers
        google.maps.event.addListener(lines_dict[key.toUpperCase()], "mouseover", showInfo);
        google.maps.event.addListener(lines_dict[key.toUpperCase()], "mouseout", hideInfo);
        google.maps.event.addListener(lines_dict[key.toUpperCase()], "click", toggleSelected);

        // Garbage collection
        vector = [];
        lineCoordinates = [];
        contentString = '';

    }
}