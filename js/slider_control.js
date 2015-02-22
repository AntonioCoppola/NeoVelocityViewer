function length_refresh() {

    scale_param = 31 - slider.getValue();

    for (var lineKey in lines_dict) {

        var marker = lines_dict[lineKey];
        var vector = marker.vector;
        var lineCoordinates = [
            new google.maps.LatLng(vector[1], vector[0]),
            new google.maps.LatLng(vector[1] + (vector[3] / scale_param), vector[0] + (vector[2] / scale_param))
        ];

        lines_dict[lineKey].setPath(lineCoordinates);
    }
}

var slider = $('.slider_bs').slider({
        formatter: function(value) {
            return 'Current value: ' + value;
        }
    })
    .on('slideStop', length_refresh)
    .data('slider');

$(document).ready(function() {

    $("[name='my-checkbox']").bootstrapSwitch();

    $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        selector_mode_on = !selector_mode_on;
    });

    $('#sideMenu').BootSideMenu({
        side: "right",
        autoClose: true
    });

});