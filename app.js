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
  return timeArray.reduce((a, c, i) => {
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

console.log(howLongAgo(1242523));
