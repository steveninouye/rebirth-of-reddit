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
const sampleReddit = (string, dataObj) => {
  if (string.length < 100) {
    if (string.length > 0) {
      string += '<br>';
    }
    string += dataObj.data.body;
    if (dataObj.data.replies) {
      const nextResponse = dataObj.data.replies.data.children[0];
      return sampleReddit(string, nextResponse);
    }
  }
  return string;
};
