var length_refresh = function () {
	
	// Update scale_param
	scale_param = 31 - slider.getValue();

	// Update mapOptions
	mapOptions.zoom = map.zoom;
	mapOptions.center = map.center;
	mapOptions.mapTypeId = map.mapTypeId;

	// Update map
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	for (var key in Object.keys(data_files)){
		drawArrows(data_files[Object.keys(data_files)[key]], scale_param, 'brown');
	}
};

var slider = $('.slider_bs').slider({
        formatter: function(value) {
          return 'Current value: ' + value;
        }
      })
    .on('slideStop', length_refresh)
    .data('slider');