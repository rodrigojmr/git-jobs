export const randomBGIndex = char => {
  const charCode = char.toLowerCase().charCodeAt(0);
  // Equals 25
  // We have 13 colors, getting an index from 0 to 12 based on the charcode from a to z
  return Math.floor((charCode - 'a'.charCodeAt(0)) / 2);
};

export const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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
