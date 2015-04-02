/*
Logic for station marker toggling. Some work needs to be done to consolidate redundant code.
*/
function showInfo() {
    //this.infowindow.open(map);
    $('#station-name').text(this.name);
    $('#north-velocity').text(Number(this.vector[3]).toFixed(2));
    $('#east-velocity').text(Number(this.vector[2]).toFixed(2));
    $('#north-sigma').text(Number(this.vector[5]).toFixed(2));
    $('#east-sigma').text(Number(this.vector[4]).toFixed(2));
    $('#longitude').text(this.infowindow.position.D.toFixed(2));
    $('#latitude').text(this.infowindow.position.k.toFixed(2));
    $('#toggled').text(toTitleCase(this.toggled.toString()));
}

function hideInfo() {
    //this.infowindow.close();
    $('#station-name').text(' — ');
    $('#north-velocity').text(' — ');
    $('#east-velocity').text(' — ');
    $('#north-sigma').text(' — ');
    $('#east-sigma').text(' — ');
    $('#longitude').text(' — ');
    $('#latitude').text(' — ');
    $('#toggled').text(' — ');
}

function setMarkerStatus(toggleStatus) {
    this.toggled = toggleStatus;
    // var contentString = '<div id="content">' + '<p><strong>Station Name: </strong>' + this.name +
    //         '</p><p><strong>North Velocity: </strong>' + Number(this.vector[3]).toFixed(2) +
    //         '</p><p><strong>East Velocity: </strong>' + Number(this.vector[2]).toFixed(2) +
    //         '</p><p><strong>North Sigma: </strong>' + Number(this.vector[5]).toFixed(2) +
    //         '</p><p><strong>East Sigma: </strong>' + Number(this.vector[4]).toFixed(2) +
    //     '</p><p><strong>Longitude: </strong>' + this.infowindow.position.D.toFixed(2) + '</p><p><strong>Latitude: </strong>' +
    //     this.infowindow.position.k.toFixed(2) + '</p><p><strong>Toggled: </strong>' +
    //     toTitleCase(this.toggled.toString()) +
    //     '</p></div>';
    // this.infowindow.setContent(contentString);

    var newicon = this.icons;
    if (this.toggled) {
        newicon[0].icon.fillColor = this.realColor;
        this.setOptions({
            strokeColor: this.realColor,
            fillColor: this.realColor,
            icons: newicon
        });
    } else {

        newicon[0].icon.fillColor = '#484A48';

        this.setOptions({
            strokeColor: '#484A48',
            fillColor: '#484A48',
            icons: newicon
        });
    }
}

function toggleSelected() {

    this.toggled = !this.toggled;

    // var contentString = '<div id="content">' + '<p><strong>Station Name: </strong>' + this.name +
    //         '</p><p><strong>North Velocity: </strong>' + Number(this.vector[3]).toFixed(2) +
    //         '</p><p><strong>East Velocity: </strong>' + Number(this.vector[2]).toFixed(2) +
    //         '</p><p><strong>North Sigma: </strong>' + Number(this.vector[5]).toFixed(2) +
    //         '</p><p><strong>East Sigma: </strong>' + Number(this.vector[4]).toFixed(2) +
    //     '</p><p><strong>Longitude: </strong>' + this.infowindow.position.D.toFixed(2) + '</p><p><strong>Latitude: </strong>' +
    //     this.infowindow.position.k.toFixed(2) + '</p><p><strong>Toggled: </strong>' +
    //     toTitleCase(this.toggled.toString()) +
    //     '</p></div>';

    // this.infowindow.setContent(contentString);
    //this.infowindow.open(map);

    $('#toggled').text(toTitleCase(this.toggled.toString()));
    
    var newicon = this.icons;

    if (this.toggled) {

        newicon[0].icon.fillColor = this.realColor;

        this.setOptions({
            strokeColor: this.realColor,
            fillColor: this.realColor,
            icons: newicon
        });
    } else {

        newicon[0].icon.fillColor = '#484A48';

        this.setOptions({
            strokeColor: '#484A48',
            fillColor: '#484A48',
            icons: newicon
        });
    }
}