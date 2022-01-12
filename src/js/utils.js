const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

utils.resetWrapper = function(wrapper) {
  wrapper.innerHTML = '';
};

utils.randomize = function(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return randomNumber;
};

utils.calculateMaxValue = function (obj){
  let max = 0;
  for (let value in obj){
    max = Math.max(obj[value], max);
  }
  return max;
};

export default utils;