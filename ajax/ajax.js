var map, uluru, geocoder, autocomplete, coordInfoWindow, marker, markerimg, za, loc, urlFTTH, FTTH, geoAddress, latLng;
var maxZoomLevel = 19;

var xhr = new XMLHttpRequest();
var jsondata;

var result;

var fibreElement = document.getElementById('fibrecheck');
var loader = document.getElementById('loader');

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/* Post function that communicate with the PHP FILE - The type Json has been specified */
function post(data) {
    xhr.open("POST", "http://localhost/example/API/call.php", true); //database api
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data);
}
/* a function that  */
function getConnection(data) {

    var data = JSON.stringify(data);

    post(data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            jsondata = JSON.parse(xhr.responseText);


            if (jsondata.available) {

                console.log(jsondata.result)
                fibreElement.innerHTML = jsondata.result;
                networkProviderProducts(jsondata.networkProvider);

            } else {


                fibreElement.innerHTML = jsondata.result;
            }
        }

    }

}

function humanize(str) {
    var i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}

function networkProviderProducts(arr) {



    var variables = {
        'request': 'getNetworkProvider',
        'guidNertworkProviderId': []
    }

    arr.forEach(providerId => {
        variables.guidNertworkProviderId.push(providerId.guidNetworkProviderId);
    });

    var data = JSON.stringify(variables);

    post(data);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            jsondata = JSON.parse(xhr.responseText);


            var newArrayList = [];

            if (jsondata.success) {
                var links = [
                    { 'strName': 'openserve', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=39', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'vumatel', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=41', 'img': 'https://vumatel.co.za/img/vuma-logo.bc3baa99.svg' },
                    { 'strName': 'frogfoot', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=40', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'ttconnect', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=42', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'octotel', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=44', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'mitsol', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=43', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'fibrehoods', 'link': 'links', 'img': 'img' },
                    { 'strName': 'metrofibre', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=51', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'teralink', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=49', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'evotel', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=45', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'rise_telecoms', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=46', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'sadv_complexes', 'link': 'http://faznet.co.za/index.php?rp=/store/sa-digital-villages-complexes-fibre', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'centurycity', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=50', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'connectservices', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=48', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'clearaccess', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=47', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'evotel_north_riding', 'link': 'http://faznet.co.za/index.php?rp=/store/evotel-north-riding-fibre', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'maboneng_vumatel', 'link': 'http://faznet.co.za/index.php?rp=/store/mabaneng-fibre', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'sadv_suburbia', 'link': 'http://faznet.co.za/index.php?rp=/store/sa-digital-villages-surburbia', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'vuma_aerial', 'link': 'links', 'img': 'img' },
                    { 'strName': 'balwin', 'link': 'http://faznet.co.za/index.php?rp=/store/balwin-fibre', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'cellc_direct', 'link': 'links', 'img': 'img' },
                    { 'strName': 'netstream', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=52', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'frogfoot_asymmetrical', 'link': 'http://faznet.co.za/index.php?rp=/store/frogfootasymmetrical', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'blitz', 'link': 'http://faznet.co.za/index.php?rp=/store/blitz-fibre', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'lightstruck', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=53', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' },
                    { 'strName': 'link_africa', 'link': 'https://isp.faznet.co.za/cart.php?a=add&pid=55', 'img': 'https://connect.openserve.co.za/assets/images/openserve_logo.svg' }

                ];
                links.forEach(link => {

                    jsondata.result.forEach(res => {
                        if (link.strName == res.strName) {

                            newArrayList.push({ 'strName': res.strName, 'link': link.link, 'img': link.img });

                        }

                    });
                });

                Array.prototype.forEach.call(newArrayList, (el, i) => {


                    var link = document.createElement('a');
                    var img = document.createElement('img');
                    var p = document.createElement('p');

                    link.classList.add('card');
                    p.classList.add('paragragh-card');
                    p.style.color = 'white';
                    img.setAttribute('src', el.img);
                    img.setAttribute('alt', el.strName);
                    img.setAttribute('width', '170px');
                    link.setAttribute('href', el.link);
                    p.append(humanize(el.strName));
                    link.appendChild(img);
                    link.appendChild(p);
                    let info = document.querySelector('.card-container');

                    info.append(link);
                });
            }

        }
    }

}



// Create map element

var container = document.createElement('div');
container.style.position = 'relative';

container.id = "fibrecontainer";
container.innerHTML += '<input id="address-input" name="address-input" type="text" class="controls" placeholder="Enter a location" style="width:100%;">';
container.innerHTML += '<input id="latlong-input" name="latlong-input" type="hidden" value="0,0">';
container.innerHTML += '<div id="fibremap" name="fibremap" style="width:100%;height:400px"></div>';
insertAfter(document.getElementById('fibrescript'), container);

var gscript = document.createElement('script');
gscript.type = 'text/javascript';
gscript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDug8dO2sLm-xN-feiWEyVj5q7dm7sRgNM&libraries=places&region=ZA";
gscript.onload = loadArcGis;
insertAfter(document.getElementById('fibrescript'), gscript);


function loadArcGis() {
    // Insert ArcGIS script
    var arcgiscript = document.createElement('script');
    arcgiscript.type = 'text/javascript';
    arcgiscript.src = "https://www.axxess.co.za/public/js/arcgislink_compiled.js";
    arcgiscript.onload = initMap;
    insertAfter(document.getElementById('fibrescript'), arcgiscript);
    setTimeout(() => {
        loader.style.display = 'none';
    }, 3000);

}

function initMap() {
    uluru = {
        lat: -30.397,
        lng: 24.644
    };
    map = new google.maps.Map(document.getElementById('fibremap'), {
        zoom: 6,
        center: uluru,
        disableDefaultUI: true,
        mapTypeControl: true,
        zoomControl: true
    });

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('address-input'), {
        componentRestrictions: {
            country: 'za'
        }
    });
    autocomplete.addListener('place_changed', function(val) {

        var place = autocomplete.getPlace();



        if (place.geometry == undefined) {
            return false;
        }

        if (typeof(fibreCheckAjax) == "object") { // prevent multiple calls
            fibreCheckAjax.abort();
        }

        loc = place.geometry.location;



        document.getElementById('latlong-input').value = loc.lat() + ', ' + loc.lng();



        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(loc);
            map.setZoom(14);
        }

        marker.setPosition(loc);
        marker.setVisible(true);

        var address = '';

        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || ''),
                (place.address_components[3] && place.address_components[3].short_name || '')
            ].join(' ');
        }
        coordInfoWindow.setContent(address);
        document.getElementById('loader').style.display = 'flex';
        // getConnection() is the function that checks if fibre is available
        getConnection({ 'request': 'getFibre', 'address-input': address, 'lat': loc.lat(), 'lng': loc.lng() });
        if (isValidAddress(document.getElementById('address-input').value)) {

            map.setZoom(17);
        }
    });

    var styles = [{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{
            "saturation": 36
        }, {
            "color": "#333333"
        }, {
            "lightness": 40
        }]
    }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#ffffff"
        }, {
            "lightness": 16
        }]
    }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#fefefe"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#fefefe"
        }, {
            "lightness": 17
        }, {
            "weight": 1.2
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "lightness": 20
        }, {
            "color": "#ececec"
        }]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }, {
            "color": "#f0f0ef"
        }]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#f0f0ef"
        }]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": "off"
        }, {
            "color": "#d4d4d4"
        }]
    }, {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#ececec"
        }]
    }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "lightness": 21
        }, {
            "visibility": "off"
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#d4d4d4"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#303030"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [{
            "saturation": "-100"
        }]
    }, {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#dedede"
        }, {
            "lightness": 21
        }]
    }, {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.school",
        "elementType": "geometry.stroke",
        "stylers": [{
            "lightness": "-61"
        }, {
            "gamma": "0.00"
        }, {
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#bbbbbb"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#bbbbbb"
        }, {
            "lightness": 20
        }, {
            "weight": 0.2
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 50
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 16
        }]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#d4d4d4"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ADD3EF"
        }, {
            "lightness": 17
        }]
    }];
    map.setOptions({
        styles: styles
    });

    urlFTTH = 'https://openserve.co.za/gis/arcgis/rest/services/isp/FTTH_SRID4148/MapServer';
    FTTH = new gmaps.ags.MapService(urlFTTH);

    google.maps.event.addListener(FTTH, 'load', function() {
        var agsLayer = new gmaps.ags.MapType([new gmaps.ags.TileLayer(FTTH)], {
            opacity: 0.65
        });
        map.overlayMapTypes.clear();
        map.overlayMapTypes.insertAt(0, agsLayer);
    });

    if (geoJSON.success == 1) {
        for (var i = 0; i < geoJSON.data.length; i++) {
            if (geoJSON.data[i].geojson_collection != null) {
                var thisProvider = geoJSON.data[i].np_id;
                var thisCollection = JSON.parse(geoJSON.data[i].geojson_collection);

                window['layer-' + thisProvider] = new google.maps.Data();
                window['layer-' + thisProvider].addGeoJson(thisCollection);
                window['layer-' + thisProvider].setStyle(function(feature) {
                    return mapLayerStyle(feature);
                });

                window['layer-' + thisProvider].setMap(map);
                window['layer-' + thisProvider].addListener('click', function(event) {
                    mapClick(event.latLng);
                });
            }
        }
    } else if (result.success == 0) {
        console.log("error on loading geojson");
    }

    markerimg = {
        url: "https://www.axxess.co.za/public/img/map-pin.png",
        size: new google.maps.Size(43, 66),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(7, 49)
    };

    marker = new google.maps.Marker({
        map: map,
        position: za,
        icon: markerimg
    });

    coordInfoWindow = new google.maps.InfoWindow();
    coordInfoWindow.open(map, marker);
    coordInfoWindow.close();

    marker.addListener('click', function() {
        coordInfoWindow.open(map, marker);
    });

    geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(map, 'zoom_changed', function() {
        if (map.getZoom() > maxZoomLevel) {
            map.setZoom(maxZoomLevel);
        }
    });

    google.maps.event.addListener(map, 'click', function(event) {
        mapClick(event.latLng);
    });
}

function mapClick(latLng) {
    mapZoom = map.getZoom();

    if (mapZoom < 6) {

        map.setZoom(13);
        map.setCenter(latLng);
        return;
    }

    if (typeof(fibreCheckAjax) == "object") { // prevent multiple calls
        fibreCheckAjax.abort();
    }

    geocoder.geocode({
        'location': latLng
    }, function(results, status) {

        if (status === google.maps.GeocoderStatus.OK) {

            if (results[0]) {

                map.setCenter(latLng);
                map.setZoom(17);

                marker.setPosition(latLng);
                marker.setVisible(true);

                geoAddress = results[0].formatted_address;

                document.getElementById('address-input').value = geoAddress;



                var latLngInput = latLng.toString().replace(/\(/g, "").replace(/\)/g, "");
                document.getElementById('latlong-input').value = latLngInput;
            }
        }
    });
}

function mapLayerStyle(feature) {
    var status = feature.getProperty('status');
    var color = "#A900E6";
    var stroke = 1;
    var opacity = 0.62;

    return ({
        fillColor: color,
        fillOpacity: opacity,
        strokeColor: "#F7F7F7",
        strokeWeight: stroke,
        strokeOpacity: opacity
    });
}

function isValidAddress(str) {
    var re = /^(.*\d.*)$/i;
    re.test('');
    if (re.test(str)) return true;
    return false;
}