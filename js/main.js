(function() {
  var vq = window.vQuery;

  var bindDefaultKeys = function() {
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
      if (e.keyName == "back")
        try {
          tizen.application.getCurrentApplication().exit();
        } catch (ignore) {
        }
    });
  };

  var bindHomeClick = function() {
    vq('#mainBox').on('click', function (evt) {
      vq('#mainBox').load('home.html');
    });
  };

  var init = function() {
    bindDefaultKeys();
    bindHomeClick();
  };

  window.onload = init;
})();
