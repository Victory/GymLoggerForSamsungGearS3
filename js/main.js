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
    vq('#chooseExercise').on('click', function (evt) {
      vq("#mainBox").load('choose-exercise.html');
    });
  };

  var init = function() {
    bindDefaultKeys();
    bindHomeClick();
  };

  window.onload = init;
})();
