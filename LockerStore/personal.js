 function showDetail()
 {
     count++;
     if (count % 2 == 1) {
         $('.sub-menu').css("display", "inline-block");
         $('.arrow-btn').css("transform", "rotate(180deg)");
     }
     else {
         $('.sub-menu').css("display", "none");
         $('.arrow-btn').css("transform", "rotate(0deg)");
     }
 }
