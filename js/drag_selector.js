function activateDragZoom() {
    map.enableKeyDragZoom({
        key: "shift",
        boxStyle: {
            border: "transparent",
            opacity: 0.7
        },
        paneStyle: {
            backgroundColor: "gray",
            opacity: 0.2
        }
    });
}

function setMarkerStatus(toggleStatus) {
    this.toggled = toggleStatus;
    var contentString = '<div id="content">' + '<p><strong>Station Name: </strong>' + this.name +
        '</p><p><strong>Longitude: </strong>' + this.infowindow.position.D.toFixed(2) + '</p><p><strong>Latitude: </strong>' +
        this.infowindow.position.k.toFixed(2) + '</p><p><strong>Toggled: </strong>' +
        toTitleCase(this.toggled.toString()) +
        '</p></div>';
    this.infowindow.setContent(contentString);
    var newicon = this.icons;
    if (this.toggled) {
        newicon[0].icon.fillColor = this.realColor;
        this.setOptions({
            strokeColor: this.realColor,
            fillColor: this.realColor,
            icons: newicon
        });
    } else {

        newicon[0].icon.fillColor = '#484A48';

        this.setOptions({
            strokeColor: '#484A48',
            fillColor: '#484A48',
            icons: newicon
        });
    }
}

function listenForDrag() {
    drag_obj = map.getDragZoomObject();
    google.maps.event.addListener(drag_obj, 'dragend', function(event) {

        var bounds = {
            left: pixelToCoordinates(event.left, event.top).D,
            right: pixelToCoordinates(event.right, event.top).D,
            top: pixelToCoordinates(event.left, event.top).k,
            bottom: pixelToCoordinates(event.left, event.bottom).k
        };

        for (var lineKey in lines_dict) {

            var marker = lines_dict[lineKey];
            var markerLocation = marker.infowindow.position;
            var markerLat = Number(markerLocation.k);
            var markerLng = Number(markerLocation.D);

            if (markerLng.between(bounds.left, bounds.right) && markerLat.between(bounds.bottom, bounds.top)) {
                setMarkerStatus.apply(lines_dict[lineKey], [selector_mode_on]);
            }
        }
    });
}