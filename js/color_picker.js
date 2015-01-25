app.directive('ngRepeatComplete', function($timeout) {
    return function(scope, element, attrs) {

        if (scope.$last) {

            $(".colorpicker")
                .removeClass('colorpicker')
                .spectrum({
                    color: "#A52A2A",
                    clickoutFiresChange: true,
                    change: function(color) {

                        colors_array[attrs.id] = color;
                        updateMap();

                    }
                });
        }

    };
});