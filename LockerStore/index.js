$(document).ready(() => { 
  /****************** Animation in the part of What_we_do ******************/
  /* First Time */
  document.getElementById("d1").id = "d1_show";
  setTimeout(function() {
    document.getElementById("d2").id = "d2_show";
  }, 3000);
  setTimeout(function() {
    document.getElementById("d3").id = "d3_show";
  }, 6000);
  setTimeout(function() {
    document.getElementById("d4").id = "d4_show";
  }, 9000);
  setTimeout(function() {
    document.getElementById("d5").id = "d5_show";
  }, 12000);
  setTimeout(function() {
    document.getElementById("d6").id = "d6_show";
  }, 15000);
  setTimeout(function() {
    document.getElementById("d1_show").id = "d1";
  }, 7000);
  setTimeout(function() {
    document.getElementById("d2_show").id = "d2";
  }, 10000);
  setTimeout(function() {
    document.getElementById("d3_show").id = "d3";
  }, 13000);
  setTimeout(function() {
    document.getElementById("d4_show").id = "d4";
  }, 16000);
  setTimeout(function() {
    document.getElementById("d5_show").id = "d5";
  }, 19000);
  setTimeout(function() {
    document.getElementById("d6_show").id = "d6";
  }, 22000);

  /* Replay */
  setInterval(() => {
    document.getElementById("d1").id = "d1_show";
    setTimeout(function() {
      document.getElementById("d2").id = "d2_show";
    }, 3000);
    setTimeout(function() {
      document.getElementById("d3").id = "d3_show";
    }, 6000);
    setTimeout(function() {
      document.getElementById("d4").id = "d4_show";
    }, 9000);
    setTimeout(function() {
      document.getElementById("d5").id = "d5_show";
    }, 12000);
    setTimeout(function() {
      document.getElementById("d6").id = "d6_show";
    }, 15000);
    setTimeout(function() {
      document.getElementById("d1_show").id = "d1";
    }, 7000);
    setTimeout(function() {
      document.getElementById("d2_show").id = "d2";
    }, 10000);
    setTimeout(function() {
      document.getElementById("d3_show").id = "d3";
    }, 13000);
    setTimeout(function() {
      document.getElementById("d4_show").id = "d4";
    }, 16000);
    setTimeout(function() {
      document.getElementById("d5_show").id = "d5";
    }, 19000);
    setTimeout(function() {
      document.getElementById("d6_show").id = "d6";
    }, 22000);
  }, 19000);

  /****************** Animation in the part of Our_approach ******************/
  /* First Time */
  document.getElementById("logo_1").id = "logo_1_show";
  setTimeout(function() {
    document.getElementById("logo_2").id = "logo_2_show";
  }, 1000);
  setTimeout(function() {
    document.getElementById("logo_3").id = "logo_3_show";
  }, 2000);
  setTimeout(function() {
    document.getElementById("logo_4").id = "logo_4_show";
  }, 3000);
  setTimeout(function() {
    document.getElementById("logo_1_show").id = "logo_1";
  }, 2000);
  setTimeout(function() {
    document.getElementById("logo_2_show").id = "logo_2";
  }, 3000);
  setTimeout(function() {
    document.getElementById("logo_3_show").id = "logo_3";
  }, 4000);
  setTimeout(function() {
    document.getElementById("logo_4_show").id = "logo_4";
  }, 5000);

  /* Replay */
  setInterval(() => {
    document.getElementById("logo_1").id = "logo_1_show";
    setTimeout(function() {
      document.getElementById("logo_2").id = "logo_2_show";
    }, 1000);
    setTimeout(function() {
      document.getElementById("logo_3").id = "logo_3_show";
    }, 2000);
    setTimeout(function() {
      document.getElementById("logo_4").id = "logo_4_show";
    }, 3000);
    setTimeout(function() {
      document.getElementById("logo_1_show").id = "logo_1";
    }, 2000);
    setTimeout(function() {
      document.getElementById("logo_2_show").id = "logo_2";
    }, 3000);
    setTimeout(function() {
      document.getElementById("logo_3_show").id = "logo_3";
    }, 4000);
    setTimeout(function() {
      document.getElementById("logo_4_show").id = "logo_4";
    }, 5000);
  }, 5000);
})

function on_a() {
  document.getElementById("pic_a").className = "pic_a_in";
  document.getElementById("cover_a").className = "cover_a_open";
  document.getElementById("name_a").className = "name_a_in";
  document.getElementById("intro_a").className = "intro_a_in";
}
function out_a() {
  document.getElementById("cover_a").className = "cover_a_close";
  document.getElementById("name_a").className = "name_a_out";
  document.getElementById("intro_a").className = "intro_a_out";
}
function on_b() {
  document.getElementById("pic_b").className = "pic_a_in";
  document.getElementById("cover_b").className = "cover_b_open";
  document.getElementById("name_b").className = "name_b_in";
  document.getElementById("intro_b").className = "intro_b_in";
}
function out_b() {
  document.getElementById("cover_b").className = "cover_b_close";
  document.getElementById("name_b").className = "name_b_out";
  document.getElementById("intro_b").className = "intro_b_out";
}
function on_c() {
  document.getElementById("pic_c").className = "pic_a_in";
  document.getElementById("cover_c").className = "cover_b_open";
  document.getElementById("name_c").className = "name_b_in";
  document.getElementById("intro_c").className = "intro_b_in";
}
function out_c() {
  document.getElementById("cover_c").className = "cover_b_close";
  document.getElementById("name_c").className = "name_b_out";
  document.getElementById("intro_c").className = "intro_b_out";
}
function on_d() {
  document.getElementById("pic_d").className = "pic_a_in";
  document.getElementById("cover_d").className = "cover_a_open";
  document.getElementById("name_d").className = "name_a_in";
  document.getElementById("intro_d").className = "intro_a_in";
}
function out_d() {
  document.getElementById("cover_d").className = "cover_a_close";
  document.getElementById("name_d").className = "name_a_out";
  document.getElementById("intro_d").className = "intro_a_out";
}
function on_e() {
  document.getElementById("pic_e").className = "pic_a_in";
  document.getElementById("cover_e").className = "cover_a_open";
  document.getElementById("name_e").className = "name_a_in";
  document.getElementById("intro_e").className = "intro_a_in";
}
function out_e() {
  document.getElementById("cover_e").className = "cover_a_close";
  document.getElementById("name_e").className = "name_a_out";
  document.getElementById("intro_e").className = "intro_a_out";
 }
function on_all() {
  document.getElementById("pic_a").className = "pic_a_in";
  document.getElementById("cover_a").className = "cover_a_open";
  document.getElementById("name_a").className = "name_a_in";
  document.getElementById("intro_a").className = "intro_a_in";
  document.getElementById("pic_b").className = "pic_a_in";
  document.getElementById("cover_b").className = "cover_b_open";
  document.getElementById("name_b").className = "name_b_in";
  document.getElementById("intro_b").className = "intro_b_in";
  document.getElementById("pic_c").className = "pic_a_in";
  document.getElementById("cover_c").className = "cover_b_open";
  document.getElementById("name_c").className = "name_b_in";
  document.getElementById("intro_c").className = "intro_b_in";
  document.getElementById("pic_d").className = "pic_a_in";
  document.getElementById("cover_d").className = "cover_a_open";
  document.getElementById("name_d").className = "name_a_in";
  document.getElementById("intro_d").className = "intro_a_in";
  document.getElementById("pic_e").className = "pic_a_in";
  document.getElementById("cover_e").className = "cover_a_open";
  document.getElementById("name_e").className = "name_a_in";
  document.getElementById("intro_e").className = "intro_a_in";
}
function out_all() {
  document.getElementById("pic_a").className = "pic_a_in";
  document.getElementById("cover_a").className = "cover_a_close";
  document.getElementById("name_a").className = "name_a_out";
  document.getElementById("intro_a").className = "intro_a_out";
  document.getElementById("pic_b").className = "pic_a_in";
  document.getElementById("cover_b").className = "cover_b_close";
  document.getElementById("name_b").className = "name_b_out";
  document.getElementById("intro_b").className = "intro_b_out";
  document.getElementById("pic_c").className = "pic_a_in";
  document.getElementById("cover_c").className = "cover_b_close";
  document.getElementById("name_c").className = "name_b_out";
  document.getElementById("intro_c").className = "intro_b_out";
  document.getElementById("pic_d").className = "pic_a_in";
  document.getElementById("cover_d").className = "cover_a_close";
  document.getElementById("name_d").className = "name_a_out";
  document.getElementById("intro_d").className = "intro_a_out";
  document.getElementById("pic_e").className = "pic_a_in";
  document.getElementById("cover_e").className = "cover_a_close";
  document.getElementById("name_e").className = "name_a_out";
  document.getElementById("intro_e").className = "intro_a_out";
}

//back to top
$(function () {

var $win = $(window);

var $backToTop = $('footer');
  
// 當用戶點擊按鈕時，通過動畫效果返回頭部

$backToTop.click(function () {

$('html, body').animate({scrollTop: 0}, 200);

});

});
