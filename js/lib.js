(function() {
  // tic +
  var Promise = window.vPromise;

  var vQuery = function(selector) {
    this.elms = qs(selector);
    var vq = this;

    /** query select all */
    function qs(selector) {
      if (typeof selector !== 'string') {
        throw 'Selector: ' + selector + ' is not a string';
      }
      return document.querySelectorAll(selector);
    };

    /** query select first */
    var qsf = function(selector) {
      return new vQuery(document.querySelector(selector));
    };

    var html = function(text) {
      var size = vq.elms.length;
      for (var ii = 0; ii < size; ii++) {
        vq.elms[ii].innerHTML = text;
      }
    };

    var getHTML = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url , true);
        var vp = new Promise(function (res, rej) {
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              // Gear returns status 0 on success
              if (xhr.status === 0) {
                res(xhr);
              } else {
                rej(xhr);
              }
            }
          };
        });
        xhr.send();
      return vp;
    };

    /**
     * Load data into elms 
     * @param {string} method - GET or POST, defaults to GET
     * @return {vPromise}
     */
    var load = function(url, method) {

      method = (typeof method !== 'undefined') ? method : 'GET';

      if (method === 'GET') {
        var vp = getHTML(url);
      } else {
        throw 'method: \'' + method + '\' not implemented';
      }

      var elm = vq.elms[0];

      var ok = function (xhr) {
        html(xhr.responseText);
      };

      var notOk = function (err) {
        console.error(err);
      };

      return vp.then(ok, notOk);
    };

    var on = function (event, cb) {
      console.log('on', event);
      for (var ii = 0; ii < vq.elms.length; ii++) {
        console.log(vq.elms[ii]);
        vq.elms[ii].addEventListener(event, cb);
      }
    };

    return {
      load: load,
      html: html,
      on: on,
    }
  };

  window['vQuery'] = vQuery;
})();