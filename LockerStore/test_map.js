var map, marker, lat, lng, addr;
var isLocate = false;
var styles = {
    default: null,
    hide: [
        {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
        }
    ]
};
function initMap() {
    var urlParams = new URLSearchParams(window.location.search);
    var isAuto = urlParams.get('locate_btn.x');
    if (isAuto) {
        autoLocate();
    }
    else {
        addr = urlParams.get('address');
        codeAddress();
    }
}
function autoLocate() {
    navigator.geolocation.watchPosition((position) => {
        if (!isLocate) {
            isLocate = true;
            console.log(position.coords);
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            // 初始化地圖
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 18,
                center: { lat: lat, lng: lng }
            });
            marker = new google.maps.Marker({
                map: map,
                position: { lat: lat, lng: lng },
                icon: {
                    url: './public/images/about_us/part5/part5-logo.svg',
                    scaledSize: new google.maps.Size(50, 50),
                },
                animation: google.maps.Animation.DROP,
            });
            map.setOptions({ styles: styles['hide'] });
        }
    });
}

function codeAddress() {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': addr }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 18,
                center: results[0].geometry.location
            });
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                icon: {
                    url: './public/images/about_us/part5/part5-logo.svg',
                    scaledSize: new google.maps.Size(50, 50),
                },
                animation: google.maps.Animation.DROP,
            });
            map.setOptions({ styles: styles['hide'] });
        } else {
            alert("Failed, reason: " + status);
        }
    })
}