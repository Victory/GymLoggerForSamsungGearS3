(function() {
  var db;

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
    $('#chooseExercise').on('click', function (evt) {
      $("#mainBox").load('choose-exercise.html');
    });
  };
  
  var bindExerciseOption = function() {
    $('ul#exerciseOptions li').on('click', function(evt) {
      console.log(this);
    });
  };

  var initDb = function() {
   
    var version = '0.1';
    var dbName = 'gymlogger';
    var dbDisplayName = 'gymlogger_db'
    var dbSize = 2 << 20; 
    
    var cb = function (database) {
        console.log('created db');
    };

    db = openDatabase(dbName, version, dbDisplayName, dbSize, cb);
  };

  var init = function() {
    bindDefaultKeys();
    bindExerciseOption();
    bindHomeClick();
    initDb();
  };

  window.onload = init;
})();
