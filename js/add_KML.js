/*
Logic to add KML layers
*/

function addKML() {

    var KMLurl = $('#kml-url').val();

    ctaLayer = new google.maps.KmlLayer({
        url: KMLurl
    });
    ctaLayer.setMap(map);
}

function clearKML() {

	ctaLayer.setMap(null);
	
}