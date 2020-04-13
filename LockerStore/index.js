$(document).ready(() => { 
  /****************** First Time ******************/
  document.getElementById("d1").id = "d1_show";
  setTimeout(function() {
    document.getElementById("d2").id = "d2_show";
  }, 2000);
  setTimeout(function() {
    document.getElementById("d3").id = "d3_show";
  }, 4000);
  setTimeout(function() {
    document.getElementById("d4").id = "d4_show";
  }, 6000);
  setTimeout(function() {
    document.getElementById("d5").id = "d5_show";
  }, 8000);
  setTimeout(function() {
    document.getElementById("d6").id = "d6_show";
  }, 10000);
  setTimeout(function() {
    document.getElementById("d1_show").id = "d1";
  }, 5000);
  setTimeout(function() {
    document.getElementById("d2_show").id = "d2";
  }, 7000);
  setTimeout(function() {
    document.getElementById("d3_show").id = "d3";
  }, 9000);
  setTimeout(function() {
    document.getElementById("d4_show").id = "d4";
  }, 11000);
  setTimeout(function() {
    document.getElementById("d5_show").id = "d5";
  }, 13000);
  setTimeout(function() {
    document.getElementById("d6_show").id = "d6";
  }, 15000);

  /****************** Repeat ******************/
  setInterval(() => {
    document.getElementById("d1").id = "d1_show";
    setTimeout(function() {
      document.getElementById("d2").id = "d2_show";
    }, 2000);
    setTimeout(function() {
      document.getElementById("d3").id = "d3_show";
    }, 4000);
    setTimeout(function() {
      document.getElementById("d4").id = "d4_show";
    }, 6000);
    setTimeout(function() {
      document.getElementById("d5").id = "d5_show";
    }, 8000);
    setTimeout(function() {
      document.getElementById("d6").id = "d6_show";
    }, 10000);
    setTimeout(function() {
      document.getElementById("d1_show").id = "d1";
    }, 5000);
    setTimeout(function() {
      document.getElementById("d2_show").id = "d2";
    }, 7000);
    setTimeout(function() {
      document.getElementById("d3_show").id = "d3";
    }, 9000);
    setTimeout(function() {
      document.getElementById("d4_show").id = "d4";
    }, 11000);
    setTimeout(function() {
      document.getElementById("d5_show").id = "d5";
    }, 13000);
    setTimeout(function() {
      document.getElementById("d6_show").id = "d6";
    }, 15000);
  }, 14000);
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