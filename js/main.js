(function() {
  var db;
  var flavors = {
    weightReps: 1
  }

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
    var dbSize = 2 * (1 << 20);
    
    var cb = function (database) {
        console.log('created db');
    };

    db = openDatabase(dbName, version, dbDisplayName, dbSize, cb);

    db.transaction(function (tx) {

      var sql = 'CREATE TABLE IF NOT EXISTS `exercises` (' +
          '`name` STRING, ' +
          '`flavor` INTEGER ' +
          ')';
      tx.executeSql(sql);

      sql = "INSERT INTO `exercises` (`name`, `flavor`) VALUES ('bench press'," + flavors.weightReps + ")";
      tx.executeSql(sql);

    }, function (tx, err) {
      console.error('could not create table', err);
    });

  };

  var init = function() {
    bindDefaultKeys();
    bindExerciseOption();
    bindHomeClick();
    initDb();
  };

  window.onload = init;
})();
