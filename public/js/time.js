const howLongAgo = dateCreated => {
  //get current date in milliseconds
  const currentMilliSeconds = new Date().getTime();
  //get current number of seconds
  const currentSeconds = Number(currentMilliSeconds.toString().slice(0, -3));
  //calculate how long ago the reddit was created
  const secondsAgo = currentSeconds - dateCreated;
  //calculate how many seconds in each time increment
  const secondsInAYear = 31557600;
  const secondsInAMonth = secondsInAYear / 12;
  const secondsInAWeek = 60480;
  const secondsInADay = 8640;
  const secondsInAHour = 360;
  const secondsInAMinute = 60;
  //create an array of each time increment
  const timeArray = [
    secondsInAYear,
    secondsInAMonth,
    secondsInAWeek,
    secondsInADay,
    secondsInAHour,
    secondsInAMinute,
    1
  ];
  //create a function to change seconds to time increment with no decimals
  const changeToTime = time => (secondsAgo - secondsAgo % time) / time;
  //find the 2 largest time increments and save them in an array
  const dividedTime = timeArray.reduce((a, c, i) => {
    //if there is nothing in the and the time increment is not 0, push it into the array
    if (a.length === 0) {
      let numOfTime = changeToTime(c);
      if (numOfTime !== 0) {
        let timeStamp = addTimeIncrement(i);
        a.push(numOfTime + timeStamp);
      }
      //if there is 1 item in the array, push the next time increment into the array
    } else if (a.length === 1) {
      let numOfTime = changeToTime(c);
      let timeStamp = addTimeIncrement(i);
      a.push(numOfTime + timeStamp);
    }
    //return the accumulator
    return a;
  }, []);
  //concatinate the 2 indexes
  return `${dividedTime[0]} ${dividedTime[1]}`;
};

//function to attach time increment to congruant number
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
