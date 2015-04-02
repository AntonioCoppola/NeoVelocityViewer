/*
Get LatLng coordinates from drag selector action.

This function was contributed by Marius Manastireanu @ StackOverflow. Reference URL:
http://stackoverflow.com/questions/25219346/how-to-convert-from-x-y-screen-coordinates-to-latlng-google-maps
*/
function pixelToCoordinates(x, y) {

  var latLngBounds = map.getBounds();
  var neBound = latLngBounds.getNorthEast();
  var swBound = latLngBounds.getSouthWest();

  var neBoundInPx = map.getProjection().fromLatLngToPoint(neBound);
  var swBoundInPx = map.getProjection().fromLatLngToPoint(swBound);

  var procX = x/window.innerWidth;
  var procY = y/window.innerHeight;
  
  var newLngInPx = (neBoundInPx.x - swBoundInPx.x) * procX + swBoundInPx.x;
  var newLatInPx = (swBoundInPx.y - neBoundInPx.y) * procY + neBoundInPx.y;

  var newLatLng = map.getProjection().fromPointToLatLng(new google.maps.Point(newLngInPx, newLatInPx));
  return newLatLng;
}