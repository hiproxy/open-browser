var op = require('../lib/index');

'chrome safari firefox opera'.split(' ').forEach(function (browser) {
  op.detect(browser).then(function (path) {
    console.log(browser, '==>', path);
    op.open(browser, 'https://www.google.com', 'http://127.0.0.1:5525');
  }).catch(function (err) {
    console.error(browser, 'detect fail:', err);
  });
});
