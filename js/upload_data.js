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

    $scope.loadSegment = function($fileContent) {

        // Retrieve filename
        $scope.filename = $("#segmentbox")[0].value.split("\\").pop();

        // Input checking
        if ($scope.filename.indexOf(".line") == -1 & $scope.filename.indexOf(".segment")) {
            alert("You must select a line or segment file.");
        } else if ($.inArray($scope.filename, segment_files) > -1) {
            alert("This data file is already loaded.");
        }

        // Parse .line file
        if ($scope.filename.indexOf(".line") != -1) {

            // Instantiate data array
            $scope.lines = [];

            $scope.rows = $fileContent.split(/\n/);
            var lines_counter = 0;

            for (var i in $scope.rows) {

                $scope.row = $scope.rows[i];

                if ($scope.row.indexOf("NaN") != -1) {
                    $scope.lines.push([]);
                    lines_counter = lines_counter + 1;
                } else {
                    $scope.coordinates = $scope.rows[i].split(" ");
                    $scope.lines[lines_counter - 1].push({
                        'lon': Number($scope.coordinates[0]),
                        'lat': Number($scope.coordinates[1])
                    });
                }
            }

            // Record action
            segment_files.push($scope.filename);
            $scope.segment_keys = segment_files;

            // Draw the polylines
            drawSegments($scope.filename, $scope.lines);

            // Garbage removal
            delete $scope.filename;
            delete $scope.lines;
            delete $scope.rows;
            delete $scope.row;
        }

        // Parse .segment file
        if ($scope.filename.indexOf(".segment") != -1) {

            // Instantiate data array
            $scope.lines = [];
            $scope.rows = $fileContent.split(/\n/);
            $scope.segmentNames = [];

            // Find line identifiers
            for (var j in $scope.rows) {

                $scope.row = $scope.rows[j];
                $scope.tokens = $scope.rows[j].match(/\b\w+\b/g);
                if ($scope.tokens) {
                    if ($scope.tokens.length == 1) {
                        $scope.segmentNames.push($scope.tokens[0]);
                    }
                }
            }

            // Unique values
            $scope.segmentNames = $scope.segmentNames.filter(onlyUnique);
            var lines_counter = 0;

            // Some code (a bit ugly) to strip the desired coordinates
            for (var k in $scope.segmentNames) {
                var name = $scope.segmentNames[k];
                if (name != "Name") {

                    $scope.lines.push([]);
                    lines_counter = lines_counter + 1;

                    for (var z in $scope.rows) {
                        $scope.tokens = $scope.rows[z].match(/\b\w+\b/g);
                        if ($scope.tokens) {
                            if ($scope.tokens.length == 1 & $scope.tokens[0] == name) {
                                $scope.tokens = $scope.rows[Number(z) + 1].split(" ");
                                while ($scope.tokens.indexOf("") != -1)
                                    $scope.tokens.splice($scope.tokens.indexOf(""), 1);
                                $scope.lines[lines_counter - 1].push({
                                    'lon': Number($scope.tokens[0]),
                                    'lat': Number($scope.tokens[1])
                                });
                            }
                        }
                    }
                }
            }

            // Record action
            segment_files.push($scope.filename);
            $scope.segment_keys = segment_files;

            // Draw the polylines
            drawSegments($scope.filename, $scope.lines);

            // Garbage removal
            delete $scope.filename;
            delete $scope.lines;
            delete $scope.rows;
            delete $scope.row;
            delete $scope.segmentNames;
            delete $scope.tokens;

        }

        // Clear input box
        clearInput($('#segmentbox')[0]);

    };

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
                if ($scope.rows[i].indexOf("\t") != -1) {
                    $scope.row = $scope.rows[i].split("\t");
                } else {
                    $scope.row = $scope.rows[i].split(" ");
                }
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

    // Remove segment function
    $scope.removeSegment = function(segment_key) {

        // Delete key
        var index = segment_files.indexOf(segment_key);
        if (index > -1) {
            segment_files.splice(index, 1);
        }

        // Clear lines dictionary
        for (var member in segments_dict) {

            if (member.indexOf(segment_key.toUpperCase()) != -1) {
                segments_dict[member].setMap(null);
                delete segments_dict[member];
            }
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