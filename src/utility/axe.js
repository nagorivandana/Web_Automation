const axeSource = require('axe-core').source;
const assert = require('assert');
const AxeReports = require('axe-reports');

module.exports = (element) => {

  browser.pause(1000);
  // inject the script
  browser.execute(axeSource);

  // run inside browser and get results
  const results = browser.executeAsync((element, done) => {
    // run axe on our site      
    axe.run(element, (err, results) => {
      if (err) done(err);
      done(results);
    });

  }, element);

  //Make sure ally-report file exists with header row in it   
  AxeReports.processResults(results, 'csv', 'ally-report', false);
  // assert there are no violations
  // assert.equal(results.violations.length, 0, 'Expected no a11y violations');
};
