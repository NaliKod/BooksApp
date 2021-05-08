const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

/*Handlebars.registerHelper('ratingWidth', function(ratingWidth) {
  return ratingWidth;
});
Handlebars.registerHelper('ratingBgc', function(ratingBgc) {
  return ratingBgc;
});*/

