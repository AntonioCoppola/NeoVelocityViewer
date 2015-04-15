/*
Global variables for the application.
*/

// Basic app settings
var app = angular.module('velocity-viewer', []);        // The Angular app
var data_files = [];                                    // Raw data file names
var segment_files = [];                                 // Segment file names
var lines_dict = {};                                    // The vectors on canvas
var segments_dict = {};                                 // The polylines on canvas
var ctaLayer = null;                                    // The extra KML layer
var scale_param = 15;
var selector_mode_on = true;
var debug;

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

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function remove(arr,elements) {
  elements.forEach(function(e) {
    for(var i=arr.length-1; i>=0; i--) {
      if(arr[i]==e) { arr.splice(i,1); }
    }
  });
}