const marked = require('marked');

function convertMarkdownToHtml(markdown) {
  return marked(markdown);
}

module.exports = { convertMarkdownToHtml };
