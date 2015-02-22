var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
activateDragZoom();
listenForDrag();

function drawArrows(data_file, scale_param, color) {

    lineSymbol.fillColor = color;
    lineSymbol.fillOpacity = 1;

    // Draw Arrows
    for (var key in data_file) {

        var vector = data_file[key];

        // Get line coordinates
        var lineCoordinates = [
            new google.maps.LatLng(vector[1], vector[0]),
            new google.maps.LatLng(vector[1] + (vector[3] / scale_param), vector[0] + (vector[2] / scale_param))
        ];

        // Generate polylines
        // lines.push(new google.maps.Polyline({
        //     path: lineCoordinates,
        //     icons: [{
        //         icon: lineSymbol,
        //         offset: '100%'
        //     }],
        //     map: map,
        //     strokeColor: color,
        //     strokeWeight: 1.5
        // }));

        lines_dict[key.toUpperCase()] = new google.maps.Polyline({
            path: lineCoordinates,
            icons: [{
                icon: lineSymbol,
                offset: '100%'
            }],
            map: map,
            strokeColor: color,
            fillColor: color,
            strokeWeight: 1.5
        });

        // Set line properties
        // lines[lines.length - 1].name = key;
        // lines[lines.length - 1].infowindow = new google.maps.InfoWindow({
        //     content: contentString,
        //     position: lineCoordinates[0]
        // });

        lines_dict[key.toUpperCase()].name = key;
        lines_dict[key.toUpperCase()].toggled = true;
        lines_dict[key.toUpperCase()].realColor = color;

        // Content string for info window
        var contentString = '<div id="content">' + '<p><strong>Station Name: </strong>' + key.toUpperCase() +
            '</p><p><strong>Longitude: </strong>' + Number(vector[0]).toFixed(2) + '</p><p><strong>Latitude: </strong>' +
            Number(vector[1]).toFixed(2) + '</p><p><strong>Toggled: </strong>' +
            toTitleCase(lines_dict[key.toUpperCase()].toggled.toString()) +
            '</p></div>';

        lines_dict[key.toUpperCase()].infowindow = new google.maps.InfoWindow({
            content: contentString,
            position: lineCoordinates[0]
        });

        // Mousovers
        // google.maps.event.addListener(lines[lines.length - 1], "mouseover", showInfo);
        // google.maps.event.addListener(lines[lines.length - 1], "mouseout", hideInfo);
        google.maps.event.addListener(lines_dict[key.toUpperCase()], "mouseover", showInfo);
        google.maps.event.addListener(lines_dict[key.toUpperCase()], "mouseout", hideInfo);
        google.maps.event.addListener(lines_dict[key.toUpperCase()], "click", toggleSelected);

        // Garbage collection
        vector = [];
        lineCoordinates = [];
        contentString = '';

    }
}