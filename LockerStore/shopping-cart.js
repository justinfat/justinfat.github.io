$(function() {
    // This button will increment the value
    $('.spc-qty-plus').click(function(e) {
      // Stop acting like a button
      e.preventDefault();
      // Get the field name
      fieldName = $(this).attr('field');
      // Get its current value
      var currentVal = parseInt($('input[name=' + fieldName + ']').val());
      // If is not undefined
      if (!isNaN(currentVal)) {
        // Increment
        $('input[name=' + fieldName + ']').val(currentVal + 1);
      } else {
        // Otherwise put a 0 there
        $('input[name=' + fieldName + ']').val(0);
      }
    });
    // This button will decrement the value till 0
    $(".spc-qty-minus").click(function(e) {
      // Stop acting like a button
      e.preventDefault();
      // Get the field name
      fieldName = $(this).attr('field');
      // Get its current value
      var currentVal = parseInt($('input[name=' + fieldName + ']').val());
      // If it isn't undefined or its greater than 0
      if (!isNaN(currentVal) && currentVal > 0) {
        // Decrement one
        $('input[name=' + fieldName + ']').val(currentVal - 1);
      } else {
        // Otherwise put a 0 there
        $('input[name=' + fieldName + ']').val(0);
     }
   });
});

function SelectAll(obj,cName) {
    var checkboxs = document.getElementsByName(cName);
    for(var i=0;i<checkboxs.length;i++){checkboxs[i].checked = obj.checked;}
};

/*$(function () {
    var checkboxs = document.getElementsByClassName("spc-checkbox");
    var orderButton = document.getElementById("spc-order");
    
    for(var i=0;i<checkboxs.length;i++){
        var a = 0;

        if(checkboxs[i].checked == true) { a++; }

        if(a != 0){
            orderButton.disabled = false;
        }else{
            orderButton.disabled = true;
        }
    }
     
});*/

function SwitchToCheckout(){
    $('.screen').css("display","none");
    $('#check-out').css("display","block");
}
function SwitchToShoppingcart(){
    $('.screen').css("display","none");
    $('#shopping-cart').css("display","block");
}
function SpcEdit(Obj){
    Obj.innerText = "完成";
    Obj.setAttribute("onclick","SpcEditDone(this)");
    $('.spc-qty').css("display","none");
    $('.spc-item-delete').css("display","block");
}
function SpcEditDone(Obj){
    Obj.innerText = "編輯";
    Obj.setAttribute("onclick","SpcEdit(this)");
    $('.spc-qty').css("display","block");
    $('.spc-item-delete').css("display","none");
}