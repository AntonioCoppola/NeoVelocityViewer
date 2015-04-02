/*
Global variables for the application.
*/

// Basic app settings
var app = angular.module('velocity-viewer', []);
var data_files = [];
var lines_dict = {};
var ctaLayer = null;
// var colors_array = {};
var scale_param = 15;
var selector_mode_on = true;

// Google Maps API options
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

// Global function/method prototypes
Number.prototype.between = function(min, max) {
    return this > min && this < max;
};

function toTitleCase(str) {
    return str.replace(/\b\w/g, function(txt) {
        return txt.toUpperCase();
    });
}
