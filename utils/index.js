export const randomBGIndex = () => {
  return Math.floor(Math.random() * 11 + 1);

  // const randomNum = Math.floor(Math.random() * (12 - 1 + 1)) + 1;

  // switch (randomNum) {
  //   case 1:
  //     return '#e06eac';
  //   case 2:
  //     return '#4db3ce';
  //   case 3:
  //     return '#3f3a95';
  //   case 4:
  //     return '#efb629';
  //   case 5:
  //     return '#e46c3f';
  //   case 6:
  //     return '#222021';
  //   case 7:
  //     return '#5a64e2';
  //   case 8:
  //     return '#fd7e65';
  //   case 9:
  //     return '#027bfc';
  //   case 10:
  //     return '#4a2928';
  //   case 11:
  //     return '#61dcad';
  //   case 12:
  //     return '#ff5860';
  // }
};

export const timeDifference = date => {
  const current = new Date().getTime();
  const previous = Date.parse(date);

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerHour * 2) {
    return Math.round(elapsed / msPerHour) + ' hour ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerDay * 2) {
    return Math.round(elapsed / msPerDay) + ' day ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerMonth * 2) {
    return Math.round(elapsed / msPerMonth) + ' month ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
};
