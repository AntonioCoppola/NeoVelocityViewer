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