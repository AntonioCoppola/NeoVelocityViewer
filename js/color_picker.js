/*
Logic for color picker.
*/

app.directive('ngRepeatComplete', function($timeout) {
    return function(scope, element, attrs) {

        if (scope.$last) {

            $(".colorpicker")
                .removeClass('colorpicker')
                .spectrum({
                    color: "#A52A2A",
                    clickoutFiresChange: true,
                    change: function(color) {

                        for (var lineKey in lines_dict) {

                            var marker = lines_dict[lineKey];

                            if (marker.filename == attrs.id) {
                                lines_dict[lineKey].realColor = "#" + color.toHex();
                                setMarkerStatus.apply(lines_dict[lineKey], [marker.toggled]);
                            }
                        }

                    }
                });
        }

    };
});