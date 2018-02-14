const request = function(url, callback) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function() {
    const data = JSON.parse(this.responseText);
    return callback.call(this, data);
  });
  oReq.open('GET', url);
  oReq.send();
  return oReq;
};
