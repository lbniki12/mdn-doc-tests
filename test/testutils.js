// Utility functions that execute unit tests

const ERROR = 1;
const WARNING = 2;
const INFO = 3;

const prefs = require("sdk/simple-prefs").prefs;
const testList = require("../data/tests/testlist").testList;

exports.ERROR = ERROR;
exports.WARNING = WARNING;
exports.INFO = INFO;
exports.url = "about:blank";

exports.runTests = function runTests(assert, done, name, desc, url, tests) {
  let tabs = require("sdk/tabs");
  tabs.open({
    url: url,
    onReady: tab => {
      let worker = tabs.activeTab.attach({
        contentScriptFile: [
          "./doctests.js",
          ...testList.map(test => "./tests/" + test),
          "../test/testrunner.js"],
        contentScriptOptions: {"name": name, "tests": JSON.stringify(tests),
            LONG_ARTICLE_WORD_COUNT_THRESHOLD: prefs.longArticleWordCountThreshold}
      });

      let resultCount = 0;

      worker.port.on("processTestResult", function(testObj) {
        let matches = testObj.errors;
        let expected = testObj.expected;

        assert.equal(matches.length, expected.length,
                     "Number of " + desc + " matches must be " + expected.length);

        matches.forEach((match, i) => {
          assert.equal(match.msg, expected[i].msg,
              "Error message for " + desc + " match must be correct");

          assert.equal(match.type, expected[i].type,
              "Error type for " + desc + " match must be correct");

          if (expected[i].msgParams) {
            assert.deepEqual(match.msgParams, expected[i].msgParams,
                             "Error message params for " + desc + " match must be correct");
          }
        });

        resultCount++;
        if (resultCount === tests.length) {
          tabs.activeTab.close();
          done();
        }
      });
    }
  });
}