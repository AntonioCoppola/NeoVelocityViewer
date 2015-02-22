var length_refresh = function() {

    // Update scale_param
    scale_param = 31 - slider.getValue();
    // Update map
    updateMap();

};

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