var count = 0;
function showDetail()
 {
     count++;
     if (count % 2 == 0) {
         $('.right_side').css("display", "inline-block");
         $('.arrow-img').css("transform", "rotate(180deg)");
      $('.middle').css("float", "left");
     }
     else {
         $('.right_side').css("display", "none");
         $('.arrow-img').css("transform", "rotate(0deg)");
      $('.middle').css("float", "right");
     }
 }
