(function() {
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

  var init = function() {
    bindDefaultKeys();
    console.log('we init now');
    console.log(vQuery);
    console.log(vPromise);
  };

  window.onload = init;
})();
