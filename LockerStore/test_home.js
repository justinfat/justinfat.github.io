$(document).ready(function () {
    $('#find_btn').click((event) => {
        var addr = $('#addressBlank').val();
        if(!addr.length)
        {
          alert("請輸入地址");
        }
    })
});