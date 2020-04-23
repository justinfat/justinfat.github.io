// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
$(document).ready(function () {
  /****************** Animation in the part of What_we_do ******************/

  /* First Time */
  document.getElementById("d1").id = "d1_show";
  setTimeout(function () {
    document.getElementById("d2").id = "d2_show";
  }, 1500);
  setTimeout(function () {
    document.getElementById("d3").id = "d3_show";
  }, 3000);
  setTimeout(function () {
    document.getElementById("d4").id = "d4_show";
  }, 4500);
  setTimeout(function () {
    document.getElementById("d5").id = "d5_show";
  }, 6000);
  setTimeout(function () {
    document.getElementById("d6").id = "d6_show";
  }, 7500);
  setTimeout(function () {
    document.getElementById("d1_show").id = "d1";
  }, 3000);
  setTimeout(function () {
    document.getElementById("d2_show").id = "d2";
  }, 4500);
  setTimeout(function () {
    document.getElementById("d3_show").id = "d3";
  }, 6000);
  setTimeout(function () {
    document.getElementById("d4_show").id = "d4";
  }, 7500);
  setTimeout(function () {
    document.getElementById("d5_show").id = "d5";
  }, 9000);
  setTimeout(function () {
    document.getElementById("d6_show").id = "d6";
  }, 10500);
  /* Replay */

  setInterval(function () {
    document.getElementById("d1").id = "d1_show";
    setTimeout(function () {
      document.getElementById("d2").id = "d2_show";
    }, 1500);
    setTimeout(function () {
      document.getElementById("d3").id = "d3_show";
    }, 3000);
    setTimeout(function () {
      document.getElementById("d4").id = "d4_show";
    }, 4500);
    setTimeout(function () {
      document.getElementById("d5").id = "d5_show";
    }, 6000);
    setTimeout(function () {
      document.getElementById("d6").id = "d6_show";
    }, 7500);
    setTimeout(function () {
      document.getElementById("d1_show").id = "d1";
    }, 3000);
    setTimeout(function () {
      document.getElementById("d2_show").id = "d2";
    }, 4500);
    setTimeout(function () {
      document.getElementById("d3_show").id = "d3";
    }, 6000);
    setTimeout(function () {
      document.getElementById("d4_show").id = "d4";
    }, 7500);
    setTimeout(function () {
      document.getElementById("d5_show").id = "d5";
    }, 9000);
    setTimeout(function () {
      document.getElementById("d6_show").id = "d6";
    }, 10500);
  }, 9000);
  /****************** Animation in the part of Our_approach ******************/

  /* First Time */

  document.getElementById("logo_2").id = "logo_2_show";
  setTimeout(function () {
    document.getElementById("logo_1").id = "logo_1_show";
  }, 1000);
  setTimeout(function () {
    document.getElementById("logo_4").id = "logo_4_show";
  }, 2000);
  setTimeout(function () {
    document.getElementById("logo_3").id = "logo_3_show";
  }, 3000);
  setTimeout(function () {
    document.getElementById("logo_2_show").id = "logo_2_hide";
  }, 4000);
  setTimeout(function () {
    document.getElementById("logo_1_show").id = "logo_1_hide";
  }, 4000);
  setTimeout(function () {
    document.getElementById("logo_4_show").id = "logo_4_hide";
  }, 4000);
  setTimeout(function () {
    document.getElementById("logo_3_show").id = "logo_3_hide";
  }, 4000);
  setTimeout(function () {
    document.getElementById("logo_2_hide").id = "logo_2";
  }, 5000);
  setTimeout(function () {
    document.getElementById("logo_1_hide").id = "logo_1";
  }, 5000);
  setTimeout(function () {
    document.getElementById("logo_4_hide").id = "logo_4";
  }, 5000);
  setTimeout(function () {
    document.getElementById("logo_3_hide").id = "logo_3";
  }, 5000);
  /* Replay */

  setInterval(function () {
    document.getElementById("logo_2").id = "logo_2_show";
    setTimeout(function () {
      document.getElementById("logo_1").id = "logo_1_show";
    }, 1000);
    setTimeout(function () {
      document.getElementById("logo_4").id = "logo_4_show";
    }, 2000);
    setTimeout(function () {
      document.getElementById("logo_3").id = "logo_3_show";
    }, 3000);
    setTimeout(function () {
      document.getElementById("logo_2_show").id = "logo_2_hide";
    }, 4000);
    setTimeout(function () {
      document.getElementById("logo_1_show").id = "logo_1_hide";
    }, 4000);
    setTimeout(function () {
      document.getElementById("logo_4_show").id = "logo_4_hide";
    }, 4000);
    setTimeout(function () {
      document.getElementById("logo_3_show").id = "logo_3_hide";
    }, 4000);
    setTimeout(function () {
      document.getElementById("logo_2_hide").id = "logo_2";
    }, 5000);
    setTimeout(function () {
      document.getElementById("logo_1_hide").id = "logo_1";
    }, 5000);
    setTimeout(function () {
      document.getElementById("logo_4_hide").id = "logo_4";
    }, 5000);
    setTimeout(function () {
      document.getElementById("logo_3_hide").id = "logo_3";
    }, 5000);
  }, 5500);
});

window.on_a = function () {
  document.getElementById("pic_a").className = "pic_a_in";
  document.getElementById("cover_a").className = "cover_a_open";
  document.getElementById("name_a").className = "name_a_in";
  document.getElementById("intro_a").className = "intro_a_in";
};

window.out_a = function () {
  document.getElementById("cover_a").className = "cover_a_close";
  document.getElementById("name_a").className = "name_a_out";
  document.getElementById("intro_a").className = "intro_a_out";
};

window.on_b = function () {
  document.getElementById("pic_b").className = "pic_a_in";
  document.getElementById("cover_b").className = "cover_b_open";
  document.getElementById("name_b").className = "name_b_in";
  document.getElementById("intro_b").className = "intro_b_in";
};

window.out_b = function () {
  document.getElementById("cover_b").className = "cover_b_close";
  document.getElementById("name_b").className = "name_b_out";
  document.getElementById("intro_b").className = "intro_b_out";
};

window.on_c = function () {
  document.getElementById("pic_c").className = "pic_a_in";
  document.getElementById("cover_c").className = "cover_b_open";
  document.getElementById("name_c").className = "name_b_in";
  document.getElementById("intro_c").className = "intro_b_in";
};

window.out_c = function () {
  document.getElementById("cover_c").className = "cover_b_close";
  document.getElementById("name_c").className = "name_b_out";
  document.getElementById("intro_c").className = "intro_b_out";
};

window.on_d = function () {
  document.getElementById("pic_d").className = "pic_a_in";
  document.getElementById("cover_d").className = "cover_a_open";
  document.getElementById("name_d").className = "name_a_in";
  document.getElementById("intro_d").className = "intro_a_in";
};

window.out_d = function () {
  document.getElementById("cover_d").className = "cover_a_close";
  document.getElementById("name_d").className = "name_a_out";
  document.getElementById("intro_d").className = "intro_a_out";
};

window.on_e = function () {
  document.getElementById("pic_e").className = "pic_a_in";
  document.getElementById("cover_e").className = "cover_a_open";
  document.getElementById("name_e").className = "name_a_in";
  document.getElementById("intro_e").className = "intro_a_in";
};

window.out_e = function () {
  document.getElementById("cover_e").className = "cover_a_close";
  document.getElementById("name_e").className = "name_a_out";
  document.getElementById("intro_e").className = "intro_a_out";
};

window.on_all = function () {
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
};

window.out_all = function () {
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
};

function reset_animation() {
  var slogan = document.getElementById('slogan');
  var searchBar = document.getElementById('search_bar');
  slogan.style.animation = 'none';
  slogan.offsetHeight;
  /* trigger reflow */

  slogan.style.animation = null;
  searchBar.style.animation = 'none';
  searchBar.offsetHeight;
  /* trigger reflow */

  searchBar.style.animation = null;
} //back to top


$(function () {
  var $win = $(window); //var $backToTop = $('.back_btn');

  var $backToTop = $('footer'); // 當用戶點擊按鈕時，通過動畫效果返回頭部

  $backToTop.click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 200);
  });
});
$(window).scroll(function () {
  if ($(window).scrollTop() > $(window).height() * 1 && $(window).scrollTop() <= $(window).height() * 1.5) {
    reset_animation();
  }
});
},{}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40485" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/parcel.e31bb0bc.js.map