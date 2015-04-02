/*
Logical handles and directives for uploading files to memory.
*/

// Clear memory
function clearInput(file_input) {
    try {
        file_input.value = null;
    } catch (ex) {}
    if (file_input.value) {
        file_input.parentNode.replaceChild(file_input.cloneNode(true), file_input);
    }
}

// Main logical controller for file uploads
app.controller('data_ctrl', function($scope) {

    // Load JSON function
    $scope.loadJSON = function($fileContent) {

        // Retrieve $scope.filename
        $scope.filename = $("#filebox")[0].value.split("\\").pop();

        // Input checking
        if ($scope.filename.indexOf(".sta.data") == -1) {
            alert("The input file extension must be sta.data.");
            clearInput($('#filebox')[0]);
        } else if ($.inArray($scope.filename, data_files) > -1) {
            alert("This data file is already loaded.");
            clearInput($('#filebox')[0]);
        } else {

            // Parse data
            $scope.rows = $fileContent.split(/\n/);
            $scope.data_points = {};
            $scope.station_names = [];
            for (var i in $scope.rows) {
                $scope.row = $scope.rows[i].split("\t");
                $scope.data_points[$scope.row[9]] = [parseFloat($scope.row[0]), parseFloat($scope.row[1]),
                    parseFloat($scope.row[2]), parseFloat($scope.row[3]),
                    parseFloat($scope.row[4]), parseFloat($scope.row[5]),
                    parseFloat($scope.row[8])
                ];
                if (!$.inArray($scope.row[9], $scope.station_names)) {
                    $scope.station_names.push($scope.row[9]);
                }
            }

            // Store data
            data_files.push($scope.filename);
            // colors_array[$scope.filename] = tinycolor('#A52A2A');
            $scope.data_keys = data_files;

            // Draw arrows
            drawArrows($scope.filename, $scope.data_points, scale_param, '#A52A2A');

            // Garbage removal
            clearInput($('#filebox')[0]);
            delete $scope.filename;
            delete $scope.data_points;
            delete $scope.rows;
            delete $scope.row;
        }
    };

    // Remove data function
    $scope.removeData = function(data_key) {

        // Delete key
        var index = data_files.indexOf(data_key);
        if (index > -1) {
            data_files.splice(index, 1);
        }

        // Clear lines dictionary
        for (var member in lines_dict) {
            if (lines_dict[member].filename == data_key) {
                lines_dict[member].setMap(null);
                delete lines_dict[member];
            }
        }
    };

});


// File reading directive. Do not alter this if possible;
// rather make changes to the controller.
app.directive('onReadFile', function($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attributes) {
            var fun = $parse(attributes.onReadFile);

            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fun(scope, {
                            $fileContent: onLoadEvent.target.result
                        });
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});