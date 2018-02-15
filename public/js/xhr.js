const request = function(url, callback) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function() {
    const self = this;
    const data = JSON.parse(this.responseText);
    return callback.call(this, data);
  });
  oReq.open('GET', url);
  oReq.onerror = function() {
    alert('page not found');
  };
  oReq.send();
  return oReq;
};

//make a string to use as thumbnail image
const sampleReddit = (string, array) => {
  return array.reduce((a, c, i) => {
    if (a.length < 200) {
      if (a.length > 0) {
        a += '<br>';
      }
      a += c.data.body;
      if (c.data.replies) {
        const nextResponse = c.data.replies.data.children;
        return sampleReddit(a, nextResponse);
      }
    }
    return a.slice(0, 200);
  }, string);
};
