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

const howLongAgo = created => {
  const currentTime = new Date();
  const currentMilliSeconds = currentTime.getTime();
  const currentSeconds = Number(currentMilliSeconds.toString().slice(0, -3));
  const secondsAgo = currentSeconds - created;
  //calculating seconds in each increment
  const secondsInAYear = 31557600;
  const secondsInAMonth = secondsInAYear / 12;
  const secondsInAWeek = 604800;
  const secondsInADay = 86400;
  const secondsInAHour = 360;
  const secondsInAMinute = 60;
  const timeArray = [
    secondsInAYear,
    secondsInAMonth,
    secondsInAWeek,
    secondsInADay,
    secondsInAHour,
    secondsInAMinute,
    1
  ];
  const changeToTime = time => (secondsAgo - secondsAgo % time) / time;
  //calculating duration breakdown
  const dividedTime = timeArray.reduce((a, c, i) => {
    if (a.length === 0) {
      let numOfTime = changeToTime(c);
      if (numOfTime !== 0) {
        let timeStamp = addTimeIncrement(i);
        a.push(numOfTime + timeStamp);
      }
    } else if (a.length === 1) {
      let numOfTime = changeToTime(c);
      let timeStamp = addTimeIncrement(i);
      a.push(numOfTime + timeStamp);
    }
    return a;
  }, []);
  return `${dividedTime[0]} ${dividedTime[1]}`;
};

const addTimeIncrement = i => {
  if (i === 0) {
    return ' years';
  } else if (i === 1) {
    return ' months';
  } else if (i === 2) {
    return ' weeks';
  } else if (i === 3) {
    return ' days';
  } else if (i === 4) {
    return ' hours';
  } else if (i === 5) {
    return ' minutes';
  } else if (i === 6) {
    return ' seconds';
  }
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

const linkArray = [];

request('https://www.reddit.com/r/videos.json', function(data) {
  for (let i = 1; i < data.data.children.length; i++) {
    let img = data.data.children[i].data.preview
      ? data.data.children[i].data.preview.images[0].source.url
      : undefined;
    if (img) {
      let title = data.data.children[i].data.title;
      let link = data.data.children[i].data.permalink;
      let author = data.data.children[i].data.author;
      let id = data.data.children[i].data.name;
      let time = howLongAgo(data.data.children[i].data.created);
      let numOfComments = data.data.children[i].data.num_comments;
      link = link.slice(0, -1) + '.json';
      document.querySelector(
        'section'
      ).innerHTML += `<div id = '${id}' class = 'box'>
      <img src = '${img}' class = 'medImage'>
      <h3>${title}</h3>
      <p>By: ${author} ${time}</p>
      <p>${numOfComments} Comments</p>
      </div>`;
      request(`https://www.reddit.com${link}`, function(data) {
        //find the div with the right ID
        let redditID = document.getElementById(
          data[0].data.children[0].data.name
        );

        const preview = sampleReddit('', data[1].data.children[0]);
        redditID.innerHTML += preview;
      });
    }
  }
});
