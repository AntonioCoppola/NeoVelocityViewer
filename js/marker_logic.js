/*
Logic for station marker toggling. Some work needs to be done to consolidate redundant code.
*/
function showInfo() {
    this.infowindow.open(map);
}

function hideInfo() {
    this.infowindow.close();
}

function setMarkerStatus(toggleStatus) {
    this.toggled = toggleStatus;
    var contentString = '<div id="content">' + '<p><strong>Station Name: </strong>' + this.name +
            '</p><p><strong>North Velocity: </strong>' + Number(this.vector[3]).toFixed(2) +
            '</p><p><strong>East Velocity: </strong>' + Number(this.vector[2]).toFixed(2) +
        '</p><p><strong>Longitude: </strong>' + this.infowindow.position.D.toFixed(2) + '</p><p><strong>Latitude: </strong>' +
        this.infowindow.position.k.toFixed(2) + '</p><p><strong>Toggled: </strong>' +
        toTitleCase(this.toggled.toString()) +
        '</p></div>';
    this.infowindow.setContent(contentString);
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

    var contentString = '<div id="content">' + '<p><strong>Station Name: </strong>' + this.name +
            '</p><p><strong>North Velocity: </strong>' + Number(this.vector[3]).toFixed(2) +
            '</p><p><strong>East Velocity: </strong>' + Number(this.vector[2]).toFixed(2) +
        '</p><p><strong>Longitude: </strong>' + this.infowindow.position.D.toFixed(2) + '</p><p><strong>Latitude: </strong>' +
        this.infowindow.position.k.toFixed(2) + '</p><p><strong>Toggled: </strong>' +
        toTitleCase(this.toggled.toString()) +
        '</p></div>';

    this.infowindow.setContent(contentString);
    //this.infowindow.open(map);
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