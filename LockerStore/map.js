var map, marker, lat, lng;
var pos_marker = './public/images/a1/a1-08.svg';
var locker_marker = './public/images/a1/a1-31前.svg'
var isLocate = false;
var sorter_state = 1;
var page = 1;
var max_page = 6;
var styles = {
    default: null,
    hide: [ // Hide stores and bus stations in the map
        {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'transit.station.bus',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
        }
    ]
};
function initMap() {
    document.getElementById('map-canvas').style.opacity = '0';
    var urlParams = new URLSearchParams(window.location.search);
    var isAuto = urlParams.get('locate_btn.x');
    lat = 22.9988146;
    lng = 120.2195148;
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 18,
        center: { lat: lat, lng: lng },
        styles: styles['hide_more'],
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
    });
    if (isAuto) {
        locate_once();
        document.getElementById('map-canvas').style.opacity = '1';
    }
    else {
        var addr = urlParams.get('address');
        codeAddress(addr);
        document.getElementById('map-canvas').style.opacity = '1';
    }
}

/* Only locate once when click */
function locate_once() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        /************ Get location ************/
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            /************ Draw Map ************/
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 18,
                center: { lat: lat, lng: lng },
                styles: styles['hide'],
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                zoomControl: false,
            });
            createMarker(pos_marker, { lat: lat, lng: lng }, true);
            getLockerPos({ lat: lat, lng: lng }, '7-11');
        }, function () {
            alert('Error: The Geolocation service failed.');
            alt_locate();
        });
    } else { // Browser doesn't support Geolocation
        alert('Error: Your browser doesn\'t support geolocation.');
        alt_locate();
    }
}

/* Alternative way of locating for http */
function alt_locate() {
    /************ Get location ************/
    xhr = new XMLHttpRequest();
    xhr.open(
        "POST",
        "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA7WQssz_5EAQLX-Xc1HwuZ1p-wJV7ubwk",
        true
    );
    xhr.onload = function () {
        var response = JSON.parse(this.responseText);
        lat = response.location.lat;
        lng = response.location.lng;
        //console.log(lat + ' ' + lng);

        /************ Draw Map ************/
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 18,
            center: { lat: lat, lng: lng },
            styles: styles['hide'],
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: false,
        });
        createMarker(pos_marker, { lat: lat, lng: lng }, true);
        getLockerPos({ lat: lat, lng: lng }, '7-11');
    };
    xhr.send();
}

/* Always relocate when changing position */
function locate_watch() {
    navigator.geolocation.watchPosition((position) => {
        if (!isLocate) {
            isLocate = true;
            //console.log(position.coords);
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 18,
                center: { lat: lat, lng: lng },
                styles: styles['hide'],
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                zoomControl: false,
            });
            createMarker(pos_marker, { lat: lat, lng: lng }, true);
            getLockerPos({ lat: lat, lng: lng }, '7-11');
        }
    });
}
function createMarker(marker_url, location, isDrop) {
    var marker;
    marker = new google.maps.Marker({
        map: map,
        position: location,
        icon: {
            url: marker_url,
            scaledSize: new google.maps.Size(60, 60),
        },
    });
    if (isDrop) {
        marker.setAnimation(google.maps.Animation.DROP);
    }
    marker.addListener('click', function () {
        //map.setZoom(8);
        //map.setCenter(marker.getPosition());
        $.get('/searchInfo', {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng(),
        }, (data) => {
            console.log(data.name);
            console.log(data.addr);
            $('#info_t1').html(data.name + '站');
            $('#info_t2').html(data.addr);
        })
        $('#infoBox').show();
    });
}

function codeAddress(address) {
    var request = {
        query: address,
        fields: ['name', 'geometry', 'formatted_address'],
    };
    var service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 18,
                center: results[0].geometry.location,
                styles: styles['hide'],
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                zoomControl: false,
            });
            createMarker(pos_marker, results[0].geometry.location, true);
            getLockerPos(results[0].geometry.location, '7-11');
        } else {
            alert("Failed, reason: " + status);
        }
    });
    // geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ 'address': address }, function (results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         map = new google.maps.Map(document.getElementById('map-canvas'), {
    //             zoom: 18,
    //             center: results[0].geometry.location,
    //             styles: styles['hide'],
    //             mapTypeControl: false,
    //             fullscreenControl: false,
    //             streetViewControl: false,
    //             zoomControl: false,
    //         });
    //         var marker = new google.maps.Marker({
    //             map: map,
    //             position: results[0].geometry.location,
    //             icon: {
    //                 url: pos_marker,
    //                 scaledSize: new google.maps.Size(60, 60),
    //             },
    //             animation: google.maps.Animation.DROP,
    //         });
    //     } else {
    //         alert("Failed, reason: " + status);
    //     }
    // })
}

function getLockerPos(center, query) {
    var service = new google.maps.places.PlacesService(map);
    // Perform a nearby search.
    service.nearbySearch(
        { location: center, keyword: query, rankBy: google.maps.places.RankBy.DISTANCE },
        function (results, status, pagination) {
            if (status !== 'OK') {
                alert("Failed, reason: " + status);
                return;
            }
            console.log(results.length);
            for (var i = 0; i < results.length; i++) {
                var tmp = results[i].name;
                var start = tmp.indexOf(' ');
                var end = tmp.indexOf('門市');
                var lockerName = tmp.slice(start + 1, end);
                tmp = results[i].plus_code.compound_code;
                end = tmp.lastIndexOf('市');
                if (end > -1) {
                    var county = tmp.slice(end - 2, end + 1);
                }
                else {
                    end = tmp.lastIndexOf('縣');
                    var county = tmp.slice(end - 2, end + 1);
                }
                var address = county + results[i].vicinity;
                //console.log(lockerName + '站');
                //console.log(address);
                createMarker(locker_marker, results[i].geometry.location, false);
                $.get('/insertInfo', {
                    lat: results[i].geometry.location.lat(),
                    lng: results[i].geometry.location.lng(),
                    name: lockerName,
                    addr: address,
                }, (data) => {
                    //console.log(data)
                })
            }
            if (pagination.hasNextPage) {
                sleep: 2;
                pagination.nextPage();
            }
        });
}
function zoomIn() {
    map.setZoom(map.getZoom() + 1)
}
function zoomOut() {
    map.setZoom(map.getZoom() - 1)
}
function changeSorter(orig, choose) {
    $('.sorter img:nth-child(' + orig + ')').removeClass('disabled');
    $('.sorter img:nth-child(' + choose + ')').addClass('disabled');
    $('.sorter img:nth-child(' + orig + ')').attr('src', './public/images/a2改/enabled_' + orig + '.svg');
    $('.sorter img:nth-child(' + choose + ')').attr('src', './public/images/a2改/disabled_' + choose + '.svg');
    $('#sorter_left').attr('src', './public/images/a2改/enabled_' + choose + '.svg');
    $('#usedSorter').attr('src', './public/images/a2改/enabled_' + choose + '.svg');
    if (choose == 3) {
        console.log('3');
        $('#sorter_left').css('width', '0.73vw');
        $('#usedSorter').css('width', '0.73vw');
        $('#sorter_left').css('left', '1.45vw');
        $('#usedSorter').css('left', '1.36vw');
    }
    else {
        $('#sorter_left').css('width', '1.53vw');
        $('#usedSorter').css('width', '1.52vw');
        $('#sorter_left').css('left', '1vw');
        $('#usedSorter').css('left', '0.94vw');
    }
    sorter_state = choose;
}
$(document).ready(function () {
    $('.toast').toast('show');
    $('[data-toggle="popover"]').popover();
    $('#infoBox').hide();
    $('#result_card').hide();
    $('.sorterBox').hide();
    $('.sorter img:nth-child(' + sorter_state + ')').addClass('disabled');
    $('#sorter_left').attr('src', './public/images/a2改/enabled_' + sorter_state + '.svg');
    $('#usedSorter').attr('src', './public/images/a2改/enabled_' + sorter_state + '.svg');
});
$('#close').click(function () {
    $('#infoBox').hide();
});
$('#search_btn').click(function () {
    $('#dropDown_btn').hide();
    $('#dropDown_txt').hide();
    $('#result_card').show();
    $('.sorterBox_before').show();
    $('#search_btn').attr("src", "./public/images/a2/a2-05.svg");
    $('#keywordBlank').css('border-color', '#ed9714');
    $('#menu_btn').removeClass('menuBtn_before');
    $('#menu_btn').attr("src", "./public/images/a2/a2-07.svg");
    $('#menu_btn').addClass('menuBtn_after');
    $('#maxPage').val(max_page);
});
$("#keywordBlank").focus(function () {
    $(this).val('# ');
});
$('#keywordBlank').keyup(function (e) {
    if (e.keyCode == 32) { // user has pressed space
        $(this).val($(this).val() + '# ');
    }
});
$('#more_btn').click(function () {
    $('.sorterBox_before').hide();
    $('.sorterBox_after').show();
});
$('.sorter').children().click(function () {
    changeSorter(sorter_state, $(this).index() + 1);
    $('.sorterBox_before').show();
    $('.sorterBox_after').hide();
});
$('#prev_btn').click(function () {
    --page;
    $('#thisPage').text(page);
    if (page <= 1) {
        $('#prev_btn').addClass('disabled');
        $('#prev_btn').attr('src', './public/images/a2/a2-30.svg');
    }
    if ($('#next_btn').hasClass('disabled') && page < max_page) {
        $('#next_btn').removeClass('disabled');
        $('#next_btn').attr('src', './public/images/a2/a2-28.svg');
    }
});
$('#next_btn').click(function () {
    ++page;
    $('#thisPage').text(page);
    if (page >= max_page) {
        $('#next_btn').addClass('disabled');
        $('#next_btn').attr('src', './public/images/a2/a2-29.svg');
    }
    if ($('#prev_btn').hasClass('disabled') && page > 1) {
        $('#prev_btn').removeClass('disabled');
        $('#prev_btn').attr('src', './public/images/a2/a2-27.svg');
    }
});
$('#fold_btn').click(function () {
    if ($(this).hasClass('in')) {
        $('.onMap_left').animate({ left: '-26vw' }, 200);
        $('.sorterBox').animate({ left: '-26vw' }, 200);
        $('#searchBox').css('visibility', 'hidden');
        $(this).attr('src', './public/images/a2/a2-40.svg');
        $(this).removeClass('in');
    }
    else {
        $('.onMap_left').animate({ left: '0' }, 200);
        $('.sorterBox').animate({ left: '1.1vw' }, 200);
        setTimeout(function () {
            $('#searchBox').css('visibility', 'visible')
        }, 120);
        $(this).attr('src', './public/images/a2/a2-04.svg');
        $(this).addClass('in');
    }
});