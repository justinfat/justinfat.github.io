$(document).ready(function () {
    initMap();
    $('.toast').toast('show');
    $('[data-toggle="popover"]').popover();
    //$('#infoBox').hide();
    //$('.sorterBox_after').hide();
    //$('#clear_btn').hide();
    $('.sorter img:nth-child(' + sorter_state + ')').addClass('disabled');
    $('#sorter_left').attr('src', './public/images/a2改/enabled_' + sorter_state + '.svg');
    $('#usedSorter').attr('src', './public/images/a2改/enabled_' + sorter_state + '.svg');
    //$('#save_btn').hide();
    //$('#cancel_btn').hide();
    //$('#shop_card').hide();
    //$('#shopTab_group').hide();
    //$('#shareBox').hide();
    $('#type_result').hide();
});

var map, marker, lat, lng;
var autocomplte, autocompleteLsr;
var pos_marker = './public/images/a1/a1-08.svg';
var locker_marker = './public/images/a1/a1-31前.svg'
var isLocate = false;
var sorter_state = 1;
var card_state = 0; // 1:result_card, 2:explore_card, 3:shop_card
var input_state = 1;
var page = 1;
var max_page = 1;
var otherExpand = false;
var shopTab_state = 1;
var latlng_list = [];
var minLat, maxLat, minLng, maxLng;
var result = 0;
var pageItems = 6;
var isSelectLocker = false;
var isOut_result = false;
var isOut_shop = false;
var isDown_result = false;
var isDown_shop = false;
var press_y = 0
var stationID;
var stationName;
var stationAddr;
var storeID;
var storeName;
var storeAddr;
var storeTel;
var singleItemNum;
var orderNum = 0;
var itemName = []
var itemAmount = []
var itemPrice = []
var typingTimer;                //timer identifier
var doneTypingInterval = 200;
var html_1 = '&emsp;<img src="public/images/a5/a5-43.svg"></img>&emsp;<span>$'
var html_2 = '</span>&emsp;<img src="public/images/a5/a5-49.svg"></img>'
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
        zoom: 16,
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
    addAutocomplete();
}

function addAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('keywordBlank'));
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);
    autocompleteLsr = autocomplete.addListener('place_changed', function () {
        // var place = autocomplete.getPlace();
        // if (!place.geometry) {
        //     // User entered the name of a Place that was not suggested and
        //     // pressed the Enter key, or the Place Details request failed.
        //     window.alert("No details available for input: '" + place.name + "'");
        //     return;
        // }
    });

}
function removeAutocomplete() {
    google.maps.event.removeListener(autocompleteLsr);
    google.maps.event.clearInstanceListeners(autocomplete);
    $(".pac-container").remove();
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
                zoom: 16,
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
            zoom: 16,
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
                zoom: 16,
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
        $.get('/searchLocker', {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng(),
        }, (data) => {
            $('#info_t1').html(data.name + '站');
            $('#info_t2').html(data.addr);
            stationName = data.name;
            stationAddr = data.addr + '站';
        })
        $('#shareBox').hide();
        $('#infoBox').show();
        isSelectLocker = false;
        $('#goto').attr('src', 'public/images/a1/a1-16前.svg')
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
                zoom: 16,
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
                latlng_list.push({ lat: results[i].geometry.location.lat(), lng: results[i].geometry.location.lng() });
                $.get('/insertLocker', {
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
            minLat = Math.min.apply(Math, latlng_list.map(function (o) { return o.lat; }));
            maxLat = Math.max.apply(Math, latlng_list.map(function (o) { return o.lat; }));
            minLng = Math.min.apply(Math, latlng_list.map(function (o) { return o.lng; }));
            maxLng = Math.max.apply(Math, latlng_list.map(function (o) { return o.lng; }));
        });
}
function getSearchResult(keywords) {
    // console.log(minLat + ' ' + maxLat + ' ' + minLng + ' ' + maxLng)
    var sorter;
    // console.log('sorter=' + sorter_state)
    switch (sorter_state) {
        case 1:
            {
                sorter = 'starNum';
                break;
            }
        case 2:
            {
                sorter = 'like';
                break;
            }
        case 3:
            {
                sorter = 'priceNum';
                break;
            }
        case 4:
            {
                sorter = 'isGroup'
                break;
            }
        default:
            {
                sorter = 'starNum'
                break;
            }
    }
    $.get('/searchTag', {
        keywords: keywords,
        minLat: minLat,
        maxLat: maxLat,
        minLng: minLng,
        maxLng: maxLng,
        sorter: sorter,
    }, (data) => {
        if (data.results.length < 1) {
            alert("No result");
            $('#result_list').hide();

        }
        else {
            $('#result_list').show();
            $('.result_container').not(':first').remove();
            for (var i = 0; i < data.results.length; i++) {
                if (i) {
                    $('.result_container').eq(i - 1).clone('withDataAndEvents').appendTo($('#result_list'));
                }
                else {
                    $('.result_container').eq(0).css('display', 'block');
                }
                $('.result_container').eq(i).find('p.result_name').text(data.results[i].name);
                $('.result_container').eq(i).find('div.result_tag').text(data.results[i].tag);
                for (var j = 0; j < 5; j++) {
                    if (j < Math.trunc(data.results[i].starNum))
                        $('.result_container').eq(i).find('img.star').eq(j).attr('src', './public/images/a2/a2-14.svg');
                    else
                        $('.result_container').eq(i).find('img.star').eq(j).attr('src', './public/images/a2/a2-15.svg');
                }
                for (var j = 0; j < 3; j++) {
                    if (j < Math.trunc(data.results[i].priceNum))
                        $('.result_container').eq(i).find('img.money').eq(j).attr('src', './public/images/a2/a2-36.svg');
                    else
                        $('.result_container').eq(i).find('img.money').eq(j).attr('src', './public/images/a2/a2-32.svg');
                }
                // $('.result_container').eq(i).find('div.tag').text(data.results[i].tag);
                $('.result_container').eq(i).find('img.result_pic').attr('src', data.results[i].img + '?width=180&height=180');
                // if (i > 5) {
                //     $('.result_container').eq(i).hide();
                // }
            }
        }
    })
}

function getShopInfo(name) {
    $.get('/searchShop', {
        name: name,
    }, (data) => {
        $('#shopRect_top img.shopImg').attr('src', data.img + '?width=180&height=180');
        $('#shopName').val(data.name);
        $('#shopRect_top span.shopAddr_txt').text(data.addr);
        $('#shopRect_top span.shopTime_txt').text(data.openTime);
        for (var j = 0; j < 5; j++) {
            if (j < Math.trunc(data.starNum)) {
                // $('#shopRect_top div.starBar :nth-child(' + j + ')').attr('src', './public/images/b1/開始使用部分切圖用-65.svg');
                $('#shopRect_top img.star').eq(j).attr('src', './public/images/b1/開始使用部分切圖用-65.svg');
            }
            else {
                $('#shopRect_top img.star').eq(j).attr('src', './public/images/b1/開始使用部分切圖用-66.svg');
            }
        }
        for (var j = 0; j < 3; j++) {
            if (j < Math.trunc(data.priceNum)) {
                $('#shopRect_top img.money').eq(j).attr('src', './public/images/b1/開始使用部分-32.svg');
            }
            else {
                $('#shopRect_top img.money').eq(j).attr('src', './public/images/b1/開始使用部分-27.svg');
            }
        }
        $('#shopRect_top div.shopType').text(data.shopType);
        $('#shop_card').show()
        $('#nameBox').show();
        getShopItem_single(data.id);
        getShopItem_group(data.id);
        storeName = data.name;
        storeAddr = data.addr;
        storeTel = data.tel;
        storeID = data.id;
    })
}

function getShopItem_single(id) {
    $.get('/getItem_single', {
        id: id,
    }, (data) => {
        data.results.items = data.results.items.filter(function (obj) {
            return obj.price !== 0;
        });
        data.results.items.sort((a, b) => b.img.length - a.img.length);
        for (var i = 0; i < data.results.items.length; i++) {

            if (i) {
                $('#singleItemList div.shopItem').eq(i - 1).clone('withDataAndEvents').appendTo($('#singleItemList'));
            }
            else {
                $('#singleItemList div.shopItem').eq(0).css('display', 'block');
            }
            $('#singleItemList div.shopItem_name').eq(i).text(data.results.items[i].name);
            $('#singleItemList span.shopItem_intro').eq(i).text(data.results.items[i].introduce);
            $('#singleItemList div.shopItem_price').eq(i).text('$ ' + data.results.items[i].price);
            if (data.results.items[i].img) {
                $('#singleItemList img.shopItem_img').eq(i).attr('src', data.results.items[i].img);
            }
            else {
                $('#singleItemList img.shopItem_img').eq(i).removeAttr('src').replaceWith($('#singleItemList img.shopItem_img').eq(i).clone());
            }
        }
    })
}
function getShopItem_group(id) {
    $.get('/getItem_group', {
        id: id,
    }, (data) => {
        data.results.items = data.results.items.filter(function (obj) {
            return obj.price !== 0;
        });
        data.results.items.sort((a, b) => b.img.length - a.img.length);
        for (var i = 0; i < data.results.items.length; i++) {
            if (i) {
                $('#groupItemList div.shopItem').eq(i - 1).clone('withDataAndEvents').appendTo($('#groupItemList'));
                $('#groupItemList div.optionContent').eq(i - 1).clone('withDataAndEvents').appendTo($('#groupItemList'));
            }
            else {
                $('#groupItemList div.shopItem').eq(0).css('display', 'block');
            }
            $('#groupItemList div.shopItem_name').eq(i).text(data.results.items[i].name);
            $('#groupItemList span.shopItem_intro').eq(i).text(data.results.items[i].introduce);
            $('#groupItemList div.shopItem_price').eq(i).text('$ ' + data.results.items[i].price);
            $('#groupItemList p.groupAmount_bottom').eq(i).text(data.results.items[i].groupAmount);
            if (data.results.items[i].img) {
                $('#groupItemList img.shopItem_img').eq(i).attr('src', data.results.items[i].img);
            }
            else {
                console.log('i=' + i)
                $('#groupItemList img.shopItem_img').eq(i).removeAttr('src').replaceWith($('#groupItemList img.shopItem_img').eq(i).clone());
            }
        }
    })
}

function zoomIn() {
    map.setZoom(map.getZoom() + 1)
}
function zoomOut() {
    map.setZoom(map.getZoom() - 1)
}
function changeSorter(orig, choose) {
    sorter_state = choose;
    getSearchResult($('#keywordBlank').val());
    $('.sorter img:nth-child(' + orig + ')').removeClass('disabled');
    $('.sorter img:nth-child(' + choose + ')').addClass('disabled');
    $('.sorter img:nth-child(' + orig + ')').attr('src', './public/images/a2改/enabled_' + orig + '.svg');
    $('.sorter img:nth-child(' + choose + ')').attr('src', './public/images/a2改/disabled_' + choose + '.svg');
    $('#sorter_left').attr('src', './public/images/a2改/enabled_' + choose + '.svg');
    $('#usedSorter').attr('src', './public/images/a2改/enabled_' + choose + '.svg');
    if (choose == 3) {
        $('#sorter_left').css('left', '4.1vmin');
        $('#usedSorter').css('left', '4.1vmin');
    }
    else {
        $('#sorter_left').css('left', '3vmin');
        $('#usedSorter').css('left', '3vmin');
    }

}
function clear_result_card() {
    $('#dropDown_btn').attr('src', './public/images/a1/a1-06.svg');
    $('#dropDown_btn').removeClass('backBtn');
    $('#dropDown_btn').addClass('dropIcon');
    if (card_state != 2) {
        $('#dropDown_btn').show();
        $('#dropDown_txt').show();
    }
    else {
        $('#dropDown_btn').hide();
        $('#dropDown_txt').hide();
    }
    $('.onMap_rise').animate({ top: '100%' }, 200);
    $('.onMap_rise').hide();
    $('.sorterBox_before').hide();
    // $('#search_btn').attr("src", "./public/images/a1/a1-02.svg");
    // $('#keywordBlank').css('border-color', '#2C50A1');
    $('#menu_btn').removeClass('logoIcon');
    $('#menu_btn').attr("src", "./public/images/a1/a1-04.svg");
    $('#menu_btn').addClass('menuIcon');
    $('#shop_card').hide();
    $('.onMap_shop').css('z-index', '-1');
    // card_state = 1;
}
//user is "finished typing," do something
function doneTyping() {
    if ($('#keywordBlank').val().length > 2) {
        console.log('request')
        $.get('/getRelatedTag', {
            keyword: $('#keywordBlank').val().split("# ").pop(),
        }, (data) => {
            var tmp = ""
            for (var i = 0; i < data.length; ++i) {
                tmp = tmp + "&nbsp#&nbsp" + data[i];
            }
            $('#relatedTag').html(tmp)
        })
    }
    else
    {
        $('#relatedTag').html('')
    }
}

$('#infoBox_close').click(function () {
    $('#infoBox').hide();
});
// $('#search_btn').click(function () {
//     console.log('card_state=' + card_state);
//     if ($('#keywordBlank').val().length < 3) {
//         event.preventDefault();
//         alert("Please enter what you want to search");
//         return;
//     }
//     if (card_state == 3) {
//         $('#shop_card').hide();
//         $('#result_card').show();
//         $('#dropDown_btn').hide();
//     }
//     else {
//         getSearchResult($('#keywordBlank').val());
//         $('#explore_card').collapse('hide');
//         $('#dropDown_btn').hide();
//         $('#dropDown_txt').hide();
//         $('#result_card').animate({ left: '0' }, 200);
//         setTimeout(function () {
//             $('#searchBox').css('visibility', 'visible')
//         }, 120);
//         $('.sorterBox_before').show();
//         // $('#search_btn').attr("src", "./public/images/a2/a2-05.svg");
//         $('#keywordBlank').css('border-color', '#ed9714');
//         if (isSelectLocker) {
//             $('#menu_btn').removeClass('menuIcon');
//             $('#menu_btn').attr("src", "./public/images/a2/a2-07.svg");
//             $('#menu_btn').addClass('logoIcon');
//         }
//         // $('#explore_card').css('top', '-100%');
//     }
//     card_state = 1;
// });
// document.getElementById('keywordBlank').addEventListener ("load", function () {
//                 var input = document.getElementsByTagName ("input");

//                 input[0].addEventListener ("keydown", function () {
//                     alert ("Caret position: " + this.selectionStart);

//                     // You can also set the caret: this.selectionStart = 2;
//                 });
//             });
$("#keywordBlank").focus(function () {
    console.log(input_state);
    if (input_state == 1) {
        removeAutocomplete();
        $('#photo_btn').hide();
        $('#clear_btn').show();
        if (!$(this).val()) {
            $(this).val('# ');
        }
    }
    else {
        addAutocomplete();
    }
});

$('#keywordBlank').keyup(function (e) {
    if (input_state == 1) {
        $(this).attr('size', $(this).val().length * 1.4);
        var start_x = $(this).position().left + $(this).width()
        if (start_x + $('#relatedTag').width() >= $('#clear_btn').position().left) {
            $('#relatedTag').css("top", "50%");
            $('#relatedTag').css("left", "15.2vmin");
        }
        else {
            $('#relatedTag').css("left", start_x);
            $('#relatedTag').css("top", "0.05rem");
        }
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
        if (e.keyCode == 13) { // user has pressed enter
            console.log('card_state=' + card_state);
            if ($('#keywordBlank').val().length < 3) {
                event.preventDefault();
                alert("Please enter what you want to search");
                return;
            }
            if (card_state == 3) {
                $('#shop_card').hide();
                $('.onMap_shop').css('z-index', '-1');
                $('.onMap_rise').show();
                $('.sorterBox_before').show();
                $('#dropDown_btn').hide();
            }
            else {
                getSearchResult($('#keywordBlank').val());
                $('#result_list').hide();
                $('#explore_card').collapse('hide');
                $('#dropDown_btn').hide();
                $('#dropDown_txt').hide();
                $('.onMap_rise').show();
                $('.onMap_rise').animate({ top: '36.9vmin' }, 200);
                setTimeout(function () {
                    $('#searchBox').css('visibility', 'visible')
                }, 120);
                $('.sorterBox_before').show();
                if (isSelectLocker) {
                    $('#menu_btn').removeClass('menuIcon');
                    $('#menu_btn').attr("src", "./public/images/a2/a2-07.svg");
                    $('#menu_btn').addClass('logoIcon');
                }
            }
            card_state = 1;
        }

        if ($(this).val()) {
            $('#photo_btn').hide();
            $('#clear_btn').show();
            if ($(this).val().charAt(0) !== '#') {
                $(this).val('# ' + $(this).val());
            }
        }
        else {
            $('#clear_btn').hide();
            $('#photo_btn').show();
            clear_result_card();
        }
    }
    else if (input_state == 2 || input_state == 3) {
        if (e.keyCode == 13) { // user has pressed enter
            codeAddress($('#keywordBlank').val());
            $('#keywordBlank').attr('placeholder', '# 今天你想要來點什麼 :)');
            $('#keywordBlank').removeClass('grayHint');
            $('#menu_btn').attr('src', './public/images/a1/a1-04.svg');
            $('#menu_btn').addClass('menuIcon');
            $('#menu_btn').removeClass('locationIcon');
            // $('#search_btn').show();
            $('#photo_btn').hide();
            $('#clear_btn').show();
            $('#dropDown_btn').attr('src', './public/images/a1/a1-06.svg');
            $('#dropDown_btn').show();
            $('#dropDown_btn').addClass('dropIcon');
            $('#dropDown_btn').removeClass('homeIcon');
            $('#save_btn').hide();
            $('#cancel_btn').hide();
            if (input_state == 2) {
                $('#home').attr('src', './public/images/a3/a3-12.svg');
                $('#homeAddr').text($('#keywordBlank').val());
                $('#homeAddr').addClass('dark');
            }
            else if (input_state == 3) {
                $('#work').attr('src', './public/images/a3/a3-07.svg');
                $('#workAddr').text($('#keywordBlank').val());
                $('#workAddr').addClass('dark');
            }
            $('#keywordBlank').val('');
            input_state = 1;
        }
    }
});

$('#keywordBlank').on('keydown', function () {
    clearTimeout(typingTimer);
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
$('.explore_btn').click(function () {
    console.log(card_state)
    if (card_state != 3) {
        $('.recommend.init').show();
        $('#explore_card').collapse('show');
        card_state = 2;
        $('#dropDown_btn').attr('src', './public/images/b1/開始使用部分-03.svg');
        $('#dropDown_btn').addClass('historyIcon');
        $('#dropDown_txt').html('# 速食 # 可樂 # 炸雞');
    }
    else {
        $('#shop_card').hide();
        $('.onMap_shop').css('z-index', '-1');
        $('.onMap_rise').show();
        $('#dropDown_btn').hide();
        card_state = 1;
    }
    console.log(card_state)
});
$('#explore_card').on('hidden.bs.collapse', function () {
    if (!otherExpand) {
        if (card_state != 1) {
            $('.explore_btn').show();
        }
    }
    otherExpand = false;
});
$('#foldCard_btn').click(function () {
    $('#explore_card').collapse('hide');
    $('#dropDown_btn').attr('src', './public/images/a1/a1-06.svg');
    $('#dropDown_btn').removeClass('backBtn');
    $('#dropDown_btn').removeClass('historyIcon');
    $('#dropDown_btn').addClass('dropIcon');
    $('#dropDown_btn').show();
    $('#dropDown_txt').html('# 探索你身邊的好物與本日推薦')
    $('#dropDown_txt').show();
    input_state = 1;
    $('#keywordBlank').attr('placeholder', '# 今天你想要來點什麼 :)');
    $('#keywordBlank').removeClass('grayHint');
    $('#menu_btn').attr('src', './public/images/a1/a1-04.svg');
    $('#menu_btn').addClass('menuIcon');
    $('#menu_btn').removeClass('locationIcon');
    // $('#search_btn').show();
    $('#photo_btn').show();
    // $('#clear_btn').show();
    $('#dropDown_btn').attr('src', './public/images/a1/a1-06.svg');
    // $('#dropDown_btn').hide();
    $('#dropDown_btn').addClass('dropIcon');
    $('#dropDown_btn').removeClass('homeIcon');
    $('#save_btn').hide();
    $('#cancel_btn').hide();
});
$('#slipResult_btn').click(function () {
    if (isOut_result) {
        $('.onMap_rise').animate({ top: '36.9vmin' }, 200);
    }
    else {
        var tmp = $('html').height() - $('#slipResult_btn').height();
        $('.onMap_rise').animate({ top: tmp }, 200);
    }
    isOut_result = !isOut_result;
});

$('#slipResult_btn').mousedown(function (e) {
    isPress_result = true
    press_y = e.pageY
});

$('#clear_btn').click(function () {
    console.log(card_state);
    $('#keywordBlank').val('');
    $('#relatedTag').html('');
    $(this).hide();
    $('#photo_btn').show();
    clear_result_card();
});
$('#setHome_btn').click(function () {
    input_state = 2;
    $('#keywordBlank').val('');
    $('#keywordBlank').attr('placeholder', 'Enter your home address');
    $('#keywordBlank').focus();
    $('#keywordBlank').addClass('grayHint');
    $('#menu_btn').attr('src', './public/images/a3/a3-38.svg');
    $('#menu_btn').removeClass('menuIcon');
    $('#menu_btn').addClass('locationIcon');
    // $('#search_btn').hide();
    $('#clear_btn').hide();
    $('#dropDown_btn').attr('src', './public/images/a3/a3-35.svg');
    $('#dropDown_btn').show();
    $('#dropDown_btn').removeClass('dropIcon');
    $('#dropDown_btn').addClass('homeIcon');
    $('#save_btn').show();
    $('#cancel_btn').show();
    if ($('#homeAddr').text() !== '輸入地址') {
        codeAddress($('#homeAddr').text());
    }
});
$('#setWork_btn').click(function () {
    input_state = 3;
    $('#keywordBlank').val('');
    $('#keywordBlank').attr('placeholder', 'Enter your work address');
    $('#keywordBlank').focus();
    $('#keywordBlank').addClass('grayHint');
    $('#menu_btn').attr('src', './public/images/a3/a3-38.svg');
    $('#menu_btn').removeClass('menuIcon');
    $('#menu_btn').addClass('locationIcon');
    // $('#search_btn').hide();
    $('#clear_btn').hide();
    $('#dropDown_btn').attr('src', './public/images/a3/a3-71.svg');
    $('#dropDown_btn').show();
    $('#dropDown_btn').removeClass('dropIcon');
    $('#dropDown_btn').addClass('homeIcon');
    $('#save_btn').show();
    $('#cancel_btn').show();
    if ($('#workAddr').text() !== '輸入地址') {
        codeAddress($('#workAddr').text());
    }
});

$('#cancel_btn').click(function () {
    input_state = 1;
    $('#keywordBlank').attr('placeholder', '# 今天你想要來點什麼 :)');
    $('#keywordBlank').removeClass('grayHint');
    $('#menu_btn').attr('src', './public/images/a1/a1-04.svg');
    $('#menu_btn').addClass('menuIcon');
    $('#menu_btn').removeClass('locationIcon');
    // $('#search_btn').show();
    $('#photo_btn').show();
    // $('#clear_btn').show();
    $('#dropDown_btn').attr('src', './public/images/a1/a1-06.svg');
    $('#dropDown_btn').hide();
    $('#dropDown_btn').addClass('dropIcon');
    $('#dropDown_btn').removeClass('homeIcon');
    $('#save_btn').hide();
    $('#cancel_btn').hide();
});

$('#save_btn').click(function () {
    codeAddress($('#keywordBlank').val());
    $('#keywordBlank').attr('placeholder', '# 今天你想要來點什麼 :)');
    $('#keywordBlank').removeClass('grayHint');
    $('#menu_btn').attr('src', './public/images/a1/a1-04.svg');
    $('#menu_btn').addClass('menuIcon');
    $('#menu_btn').removeClass('locationIcon');
    // $('#search_btn').show();
    $('#photo_btn').hide();
    $('#clear_btn').show();
    $('#dropDown_btn').attr('src', './public/images/a1/a1-06.svg');
    $('#dropDown_btn').show();
    $('#dropDown_btn').addClass('dropIcon');
    $('#dropDown_btn').removeClass('homeIcon');
    $('#save_btn').hide();
    $('#cancel_btn').hide();
    if (input_state == 2) {
        $('#home').attr('src', './public/images/a3/a3-12.svg');
        $('#homeAddr').text($('#keywordBlank').val());
        $('#homeAddr').addClass('dark');
    }
    else if (input_state == 3) {
        $('#work').attr('src', './public/images/a3/a3-07.svg');
        $('#workAddr').text($('#keywordBlank').val());
        $('#workAddr').addClass('dark');
    }
    $('#keywordBlank').val('');
    input_state = 1;
});
$('#explore_content div:nth-child(n) img.closeBtn').click(function () {
    $(this).closest('.list-group-item').hide();
});
$('.foldRank_btn').click(function () {
    $('#type_result').hide();
    $('#nearby').show();
});
$('#food_btn').click(function () {
    otherExpand = true;
    $('#nearby').hide();
    $('#type_result').show();
    $('#type_title').text('找美食');
    $('#type_icon').attr('src', './public/images/a3/a3-44.svg');
});
$('#drinks_btn').click(function () {
    otherExpand = true;
    $('#nearby').hide();
    $('#type_result').show();
    $('#type_title').text('想解渴');
    $('#type_icon').attr('src', './public/images/a3++/a3++-03.svg');
});
$('#medical_btn').click(function () {
    otherExpand = true;
    $('#nearby').hide();
    $('#type_result').show();
    $('#type_title').text('顧民生');
    $('#type_icon').attr('src', './public/images/a3++/a3++-02.svg');
});
$('#other_btn').click(function () {
    otherExpand = true;
    $('#nearby').hide();
    $('#type_result').show();
    $('#type_title').text('其他');
    $('#type_icon').attr('src', './public/images/b1/開始使用部分-18.svg');
});
$('.likeBtn').click(function () {
    if ($(this).hasClass('liked')) {
        $(this).attr('src', './public/images/a2/a2-19.svg');
        $(this).removeClass('liked')
    }
    else {
        $(this).attr('src', './public/images/a2/a2-18.svg');
        $(this).addClass('liked');
    }
});
$('#result_list div:nth-child(n).result_content').click(function () {
    card_state = 3;
    getShopInfo($(this).children('.result_name').text());
    $('.onMap_rise').hide();
    $('#shop_card').hide();
    $('.onMap_shop').css('z-index', '2');
    $('#searchBox').hide();
    $('#nameBox').hide();

});
$('.shopTab_btn').click(function () {
    if (shopTab_state == 1) {
        $(this).attr('src', './public/images/b1/開始使用部分-24.svg');
        $('#shopTab_single').hide();
        $('#shopTab_group').show();
        $('#shareBox').show();
        shopTab_state = 2;
    }
    else {
        $(this).attr('src', './public/images/b1/開始使用部分-23.svg');
        $('#shopTab_group').hide();
        $('#shopTab_single').show();
        $('#shareBox').hide();
        shopTab_state = 1;
    }
});
$('#shopTab_single div:nth-child(n).shopItem img.shopItem_plus').click(function () {
    var tmp = $(this).closest('.shopItem').find('div.itemAmount_txt').first();
    tmp.text((+(tmp.text())) + 1);
});
$('#shopTab_single div:nth-child(n).shopItem img.shopItem_minus').click(function () {
    var tmp = $(this).closest('.shopItem').find('div.itemAmount_txt').first();
    var val = +(tmp.text());
    if (val > 0) {
        tmp.text(val - 1);
    }
});
$('#shopTab_group div:nth-child(n).shopItem img.shopItem_plus').click(function () {
    var tmp = $(this).closest('.shopItem').find('div.groupAmount_top ').first();
    tmp.text((+(tmp.text())) + 1);
});
$('#shopTab_group div:nth-child(n).shopItem img.shopItem_minus').click(function () {
    var tmp = $(this).closest('.shopItem').find('div.groupAmount_top ').first();
    var val = +(tmp.text());
    if (val > 0) {
        tmp.text(val - 1);
    }
});
// $('#shopTab_group div:nth-child(n).shopItem div.shopItem_bottom').click(function () {
//     tmp = $(this).parent().parent().next();
//     if (tmp.hasClass('show')) {
//         tmp.collapse('hide');

//     }
//     else {
//         tmp.collapse('show');

//     }
// });
// $('#shopTab_group div:nth-child(n).shopItem').next().on('show.bs.collapse', function () {
//     $(this).prev().find('img.optionBtn_right').first().toggleClass('flip');
// });
// $('#shopTab_group div:nth-child(n).shopItem').next().on('hide.bs.collapse', function () {
//     $(this).prev().find('img.optionBtn_right').first().toggleClass('flip');
// });
$('#shareBox_close').click(function () {
    $('#shareBox').hide();
});
$('#heart').click(function () {
    if ($(this).hasClass('liked')) {
        $(this).attr('src', './public/images/a1/a1-18前.svg');
        $(this).removeClass('liked')
    }
    else {
        $(this).attr('src', 'public/images/a1/a1-19後.svg');
        $(this).addClass('liked')
    }
});
$('#goto').click(function () {
    isSelectLocker = true;
    $(this).attr('src', 'public/images/a1/a1-17後.svg')
});

$('.addBtn').click(function () {
    ++orderNum;
    var count = $('#singleItemList div.shopItem').length;
    console.log('count' + count);
    for (var i = 0; i < count; i++) {
        var amount = +($('#singleItemList div.itemAmount_txt').eq(i).text());
        if (amount > 0) {
            itemName.push($('#singleItemList div.shopItem_name').eq(i).text())
            itemAmount.push(amount);
            console.log('shopItmePrice=' + $('#singleItemList div.shopItem_price').eq(i).text())
            itemPrice.push(+($('#singleItemList div.shopItem_price').eq(i).text().substr(2)) * amount)
        }
    }
    console.log('item=' + itemName)
    console.log('amount=' + itemAmount)
    console.log('price=' + itemPrice)
    for (var i = 0; i < itemName.length; i++) {
        if (i) {
            $('ul.sub-menu .product-line').eq(i - 1).clone('withDataAndEvents').appendTo($('#SubMenu2'));
            var tmp = $('.order-content-mid :nth-child(' + orderNum + ') .order-object-detail-content-item').eq(i - 1);
            tmp.clone('withDataAndEvents').insertAfter(tmp);
        }
        else {
            $('ul.sub-menu .product-line').eq(0).css('display', 'block');
            $('.order-content-mid :nth-child(' + orderNum + ') .order-object-detail-content-item').eq(0).css('display', 'block');
        }
        $('ul.sub-menu .product-line').eq(i).html(itemName[i] + html_1 + itemPrice[i] + html_2);
        $('.order-content-mid :nth-child(' + orderNum + ') p.product-name-text').eq(i).text(itemName[i]);
        $('.order-content-mid :nth-child(' + orderNum + ') div.product-number').eq(i).text(itemAmount[i]);
        $('.order-content-mid :nth-child(' + orderNum + ') p.product-price-text').eq(i).text(itemPrice[i]);
    }
    $('#default span.store-name').eq(orderNum - 1).text(storeName);
    $('#default span.store-tel').eq(orderNum - 1).html(storeTel);
    $('#default span.store-addr').eq(orderNum - 1).html(storeAddr);
    $('#default span.station-name').eq(orderNum - 1).text(stationName + ' - 02');
    $('#default span.station-addr').eq(orderNum - 1).text(stationAddr);
    $('.order-content-mid p.store-name').eq(orderNum - 1).text(storeName);
    $('.order-content-mid p.store-tel-addr').eq(orderNum - 1).html(storeTel + '<br>' + storeAddr);
    $('.order-content-mid p.station-name').eq(orderNum - 1).text(stationName + ' - 02');
    $('.order-content-mid p.station-addr').eq(orderNum - 1).text(stationAddr);

});

$('.moreBar').click(function () {
    $(this).hide();
    $('.moreInfo').show();
});

$('.moreInfo img.optionBtn_right').click(function () {
    $('.moreInfo').hide();
    $('.moreBar').show();
});

$('#hot_btn').click(function () {
    if (!$(this).hasClass('select')) {
        $(this).attr('src', './public/images/b1/開始使用部分-37.svg');
        $('#cheap_btn').attr('src', './public/images/b1/開始使用部分-39.svg');
        $('#guess_btn').attr('src', './public/images/b1/開始使用部分-40.svg');
        $('#class_btn').attr('src', './public/images/b1/開始使用部分-42.svg');
    }
});

$('#cheap_btn').click(function () {
    if (!$(this).hasClass('select')) {
        $(this).attr('src', './public/images/b1/開始使用部分-38.svg');
        $('#hot_btn').attr('src', './public/images/b1/開始使用部分-36.svg');
        $('#guess_btn').attr('src', './public/images/b1/開始使用部分-40.svg');
        $('#class_btn').attr('src', './public/images/b1/開始使用部分-42.svg');
    }
});

$('#guess_btn').click(function () {
    if (!$(this).hasClass('select')) {
        $(this).attr('src', './public/images/b1/開始使用部分-41.svg');
        $('#hot_btn').attr('src', './public/images/b1/開始使用部分-36.svg');
        $('#cheap_btn').attr('src', './public/images/b1/開始使用部分-39.svg');
        $('#class_btn').attr('src', './public/images/b1/開始使用部分-42.svg');
    }
});

$('#class_btn').click(function () {
    if (!$(this).hasClass('select')) {
        $(this).attr('src', './public/images/b1/開始使用部分-43.svg');
        $('#hot_btn').attr('src', './public/images/b1/開始使用部分-36.svg');
        $('#cheap_btn').attr('src', './public/images/b1/開始使用部分-39.svg');
        $('#guess_btn').attr('src', './public/images/b1/開始使用部分-40.svg');
    }
});

$('.tab_btn').click(function () {
    if (!$(this).hasClass('select')) {
        $(this).toggleClass('select');
        $(this).siblings('.tab_btn.select').toggleClass('select');
    }
});

$('#slipShop_btn').click(function () {
    if (isOut_shop) {
        $('#shop_card').animate({ position: "absolute", top: 0 }, 200);
    } else {
        var tmp = $('#shop_card').height() - $('#slipShop_btn').height() - parseInt($('#slipShop_btn').css("margin-bottom"));
        $('#shop_card').animate({ position: "absolute", top: tmp }, 200);
    }
    isOut_shop = !isOut_shop;
});

$('#back_btn').click(function () {
    $('#shop_card').hide();
    $('.onMap_shop').css('z-index', '-1');
    $('.onMap_rise').show();
    $('#nameBox').hide();
    $('#searchBox').show();
    card_state = 1;
});

/************************ Handle finger swipe event **************************/
document.getElementById("slipResult_btn").addEventListener("touchstart", resultTouchStart, false);
document.getElementById("slipResult_btn").addEventListener("touchmove", handleTouchMove, false);
document.getElementById("slipResult_btn").addEventListener("touchcancel", handleTouchCancel, false);
document.getElementById("slipShop_btn").addEventListener("touchstart", shopTouchStart, false);
document.getElementById("slipShop_btn").addEventListener("touchmove", handleTouchMove, false);
document.getElementById("slipShop_btn").addEventListener("touchcancel", handleTouchCancel, false);
var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery

}
function resultTouchStart(evt) {
    isDown_result = true;
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function shopTouchStart(evt) {
    isDown_shop = true;
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!yDown) {
        return;
    }
    var yUp = evt.touches[0].clientY;
    var yDiff = yUp - yDown;

    if (isDown_result) {
        if (yDiff > 0 && (!isOut_result)) {
            var tmp = $('html').height() - $('#slipResult_btn').height();
            $('.onMap_rise').animate({ top: tmp }, 200);
            isOut_result = !isOut_result;
        } else if (yDiff < 0 && isOut_result) {
            $('.onMap_rise').animate({ top: '36.9vmin' }, 200);
            isOut_result = !isOut_result;
        }
    }
    else if (isDown_shop) {
        if (yDiff > 0 && (!isOut_shop)) {
            var tmp = $('#shop_card').height() - $('#slipShop_btn').height() - parseInt($('#slipShop_btn').css("margin-bottom"));
            $('#shop_card').animate({ position: "absolute", top: tmp }, 200);
            isOut_shop = !isOut_shop;
        } else if (yDiff < 0 && isOut_shop) {
            $('#shop_card').animate({ position: "absolute", top: 0 }, 200);
            isOut_shop = !isOut_shop;
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
    isDown_result = false;
    isDown_shop = false;
};

function handleTouchCancel(evt) {
    isDown_result = false;
    isDown_shop = false;
    xDown = null;
    yDown = null;
};