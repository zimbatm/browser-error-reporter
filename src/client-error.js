/**
 * @license Copyright 2012 Jonas Pfenniger under the MIT license
 */
(function(global) {
/* Simple error reporter.
 *
 * Put this as the first loaded javascript on your website to get notified
 * when error happen in your javascript.
 *
 * Also implement POST /report_error to forward the errors whenever you want to.
 */

  /** @const */ var url = '/report_error';
  /** @const */ var XMLHttpRequest = global.XMLHttpRequest;
  /** @const */ var ActiveXObject = global.ActiveXObject;


  /**
   * Cross-platorm XHR object.
   *
   * Stolen from https://github.com/stackp/promisejs/blob/master/promise.js
   *
   * @return {XMLHttpRequest|undefined} or equivalent
   */
  function newXhr() {
    var xhr;
    try {
      if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (ActiveXObject) {
        try {
          xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
      }
    } catch(e) { }
    return xhr;
  }

  /**
   * Encodes and object as a query-string.
   *
   * @param {!Object} data
   * @return {string}
   */
  function _encode(data) {
    var result = "", e = global.encodeURIComponent;

    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        if (result.length > 0) { result += '&'; }
        result += e(k) + '=' + e(data[k]);
      }
    }

    return result;
  }

  // Send the error to our backend
  function reportError(data) {
    var method = 'POST', xhr, payload;
    data = data || {};

    xhr = newXhr();
    // Do nothing if we can't generate a XHR object
    if (!xhr) return;

    payload = _encode(data);

    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(payload);
    return true;
  }

  var oldonerror = global.onerror;
  // Send all messages to the site
  // https://developer.mozilla.org/en/DOM/window.onerror
  global.onerror = function(message, file, line) {
    var ret = reportError({message: message, file: file, line: line});
    if (oldonerror) {
      return oldonerror.apply(this, arguments) || ret;
    }
    return ret;
  };
})(this);
