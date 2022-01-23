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

utils.serializeFormToObject = function(form){
  let output = {};
  if (typeof form == 'object' && form.nodeName == 'FORM') {
    for (let field of form.elements) {
      if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
        if (field.type == 'select-multiple') {
          for (let option of field.options) {
            if(option.selected) {
              utils.createPropIfUndefined(output, field.name);
              output[field.name].push(option.value);
            }
          }
        } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
          utils.createPropIfUndefined(output, field.name);
          output[field.name].push(field.value);
        } else if(!output[field.name]) output[field.name] = [];
      }
    }
  }
  return output;
};

export default utils;