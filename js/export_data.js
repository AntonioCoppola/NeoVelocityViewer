/*
Logic to export STA.DATA.
*/

function exportData() {

    if (data_files.length === 0) {
        alert('No data loaded in memory.');
        return;
    }

    var downloadName = $('#fname').val();
    if(downloadName === ""){
		alert('Please enter a filename.');
    }

    csvRows = [];

    for (var lineKey in lines_dict) {

        var marker = lines_dict[lineKey];

        if (marker.name != "undefined") {
            var row = [];

            row.push(marker.vector[0]);
            row.push(marker.vector[1]);
            row.push(marker.vector[2]);
            row.push(marker.vector[3]);
            row.push(marker.vector[4]);
            row.push(marker.vector[5]);
            row.push(0);
            row.push(0);
            row.push(marker.vector[6]);
            row.push(marker.name);

            csvRows.push(row.join('\t'));
        }

    }

    var csvString = csvRows.join('\n');

    var pom = document.createElement('a');
    var blob = new Blob([csvString], {
        type: 'text/csv;charset=utf-8;'
    });
    var url = URL.createObjectURL(blob);
    pom.href = url;
    pom.setAttribute('download', downloadName);
    pom.click();

}