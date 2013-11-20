var page = require('webpage').create();
page.open('http://phantomjs.org/', function () {
    page.render('phantom.png');
    console.log('done');
    phantom.exit();
});