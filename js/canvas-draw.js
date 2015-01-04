var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 2,
        strokeOpacity: 1,
        strokeWeight: 2
    };

var mapOptions = {
    zoom: 3,
    center: new google.maps.LatLng(41.9000, 12.4833),
    mapTypeId: google.maps.MapTypeId.TERRAIN
};

var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

function drawArrows(data_file, scale_param, color) {
    // Draw Arrows
    for (var key in data_file) {

        var vector = data_file[key];

        // Set scale_param to 15; color to 'brown' by default
        var lineCoordinates = [
            new google.maps.LatLng(vector[1], vector[0]),
            new google.maps.LatLng(vector[1] + (vector[3] / scale_param), vector[0] + (vector[2] / scale_param))
        ];

        var line = new google.maps.Polyline({
            path: lineCoordinates,
            icons: [{
                icon: lineSymbol,
                offset: '100%'
            }],
            map: map,
            strokeColor: color,
            strokeWeight: 1.5
        });

        //google.maps.event.addListener(line, "mouseover", line.setOptions({strokeOpacity: 0.8}));
    }
}

//google.maps.event.addDomListener(window, 'load', initialize);

//drawArrows();