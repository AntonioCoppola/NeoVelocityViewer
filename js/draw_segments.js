function drawSegments(filename, lines) {

    // Draw Arrows
    for (var i in lines) {

        var line = lines[i];
        var coordinates = [];

        for (var j in line) {

            var point = line[j];
            coordinates.push(new google.maps.LatLng(point.lat, point.lon));

        }

        var name = filename + '_' + i;

        segments_dict[name.toUpperCase()] = new google.maps.Polyline({
            path: coordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        segments_dict[name.toUpperCase()].setMap(map);
    }
}