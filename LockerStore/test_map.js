var map, marker, lat, lng, addr;
function initialize() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map-canvas'));
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
        console.log(position.coords);
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        // 初始化地圖
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 18,
            center: { lat: lat, lng: lng }
        });
        marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map
        });
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
                position: results[0].geometry.location
            });
        } else {
            alert("失敗, 原因: " + status);
        }
    })
}