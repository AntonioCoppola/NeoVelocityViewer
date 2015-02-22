function clearInput(file_input) {
    try {
        file_input.value = null;
    } catch (ex) {}
    if (file_input.value) {
        file_input.parentNode.replaceChild(file_input.cloneNode(true), file_input);
    }
}

function updateMap() {

    // Update mapOptions
    mapOptions.zoom = map.zoom;
    mapOptions.center = map.center;
    mapOptions.mapTypeId = map.mapTypeId;

    // Clear lines array
    // while (lines.length > 0) {
    //     lines.pop();
    // }
    for (var member in lines_dict) delete lines_dict[member];

    // Instantiate new map
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    activateDragZoom();

    // Redraw lines
    for (var key in Object.keys(data_files)) {
        drawArrows(data_files[Object.keys(data_files)[key]], scale_param,
            "#" + colors_array[Object.keys(data_files)[key]].toHex());
    }
}


app.controller('data_ctrl', function($scope) {

    $scope.test_array = ['a', 'b', 'c'];

    // // Color picker updating
    // $scope.$on('repeatFinished', function(ngRepeatFinishedEvent) {

    //     alert('hi');

    //     // $(".colorpicker").spectrum({
    //     //     color: "#f00"
    //     // });
    // });

    // Load JSON function
    $scope.loadJSON = function($fileContent) {

        // Retrieve $scope.filename
        $scope.filename = $("#filebox")[0].value.split("\\").pop();

        // Input checking
        if ($scope.filename.indexOf(".sta.data") == -1) {
            alert("The input file extension must be sta.data.");
            clearInput($('#filebox')[0]);
        } else if ($.inArray($scope.filename, Object.keys(data_files)) > -1) {
            alert("This data file is already loaded.");
            clearInput($('#filebox')[0]);
        } else {

            // Parse data
            $scope.rows = $fileContent.split(/\n/);
            $scope.data_points = {};
            $scope.station_names = [];
            for (var i in $scope.rows) {
                $scope.row = $scope.rows[i].split("\t");
                $scope.data_points[$scope.row[9]] = [parseFloat($scope.row[0]), parseFloat($scope.row[1]), parseFloat($scope.row[2]), parseFloat($scope.row[3]), parseFloat($scope.row[4]), parseFloat($scope.row[5])];
                if (!$.inArray($scope.row[9], $scope.station_names)) {
                    $scope.station_names.push($scope.row[9]);
                }
            }

            // Store data
            data_files[$scope.filename] = $scope.data_points;
            colors_array[$scope.filename] = tinycolor('#A52A2A');
            $scope.data_keys = Object.keys(data_files);

            // Draw arrows
            drawArrows($scope.data_points, scale_param, '#A52A2A');

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

        // Update mapOptions
        mapOptions.zoom = map.zoom;
        mapOptions.center = map.center;
        mapOptions.mapTypeId = map.mapTypeId;

        // Delete key
        delete data_files[data_key];
        $scope.data_keys = Object.keys(data_files);

        // Clear lines array
        // while (lines.length > 0) {
        //     lines.pop();
        // }
        for (var member in lines_dict) delete lines_dict[member];


        // Update map
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        activateDragZoom();
        for (var key in Object.keys(data_files)) {
            drawArrows(data_files[Object.keys(data_files)[key]], scale_param, 'brown');
        }
    };

});

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