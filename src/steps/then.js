import mapper from "../pageObjects/pageMapper";
import page from "../pageObjects/page";
import axe from "../utility/axe";
import updateJsonData from "../utility/updateJsonData";
const chai = require('chai');

const { Then } = require("cucumber");
const dataFile = require('../data/teamsData.json');

const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
const should = chai.should();  // Using Should style



Then(/^I expect that the title is( not)* "([^"]*)?"$/, function (
    falseCase,
    expectedTitle
) {
    // checkTitle
    /**
     * The title of the current browser window
     * @type {String}
     */
    const title = browser.getTitle();

    if (falseCase) {
        expect(title).to.not.equal(
            expectedTitle,
            `Expected title not to be "${expectedTitle}"`
        );
    } else {
        expect(title).to.equal(
            expectedTitle,
            `Expected title to be "${expectedTitle}" but found "${title}"`
        );
    }
});

Then(/^I expect that the title ( not)* contains "([^"]*)?"$/, function (
    falseCase,
    expectedTitle
) {
    //checkTitleContains
    /**
     * The actual title of the current browser window
     * @type {String}
     */
    const title = browser.getTitle();

    if (falseCase) {
        expect(title).to.not.contain(
            expectedTitle,
            `Expected title not to contain "${expectedTitle}"`
        );
    } else {
        expect(title).to.contain(
            expectedTitle,
            `Expected title to contain "${expectedTitle}" 
                        but found "${title}"`
        );
    }
});

/**
 * Check if the element is (not) displayed
 * @param  {String}   element   Element selector
 * @param  {String}   falseCase Check for a visible/displayed or a hidden element
 */
Then(/^I expect that element "([^"]*)?" is( not)* visible$/, function (
    element,
    falseCase
) {
    browser.pause(1000);
    const isVisible = page.currentPage[element].isDisplayed();

    if (falseCase) {
        expect(isVisible).to.not.equal(
            true,
            `Expected element "${element}" not to be visible`
        );
    } else {
        expect(isVisible).to.equal(
            true,
            `Expected element "${element}" to be visible`
        );
    }
});

Then(/^I wait for the element "([^"]*)?" to( not)* become visible$/, function (
    element,
    falseCase
) {
    page.currentPage[element].waitForExist(10000);
});

Then(/^I wait for the element "([^"]*)?" to( not)* be clickable$/, function (
    element,
    falseCase
) {
    page.currentPage[element].waitForClickable({ timeout: 7000 });
});

Then(
    /^I expect that element "([^"]*)?" is( not)* within the viewport$/,
    function (element, falseCase) {
        const isVisible = page.currentPage[element].isVisibleWithinViewport();

        if (falseCase) {
            expect(isVisible).to.not.equal(
                true,
                `Expected element "${element}" to be outside the viewport`
            );
        } else {
            expect(isVisible).to.equal(
                true,
                `Expected element "${element}" to be inside the viewport`
            );
        }
    }
);

Then(/^I expect that element "([^"]*)?" does( not)* exist$/, function (
    element,
    falseCase
) {
    // isExisting
    /**
     * Elements found in the DOM
     * @type {Object}
     */

    const isVisible = page.currentPage[element].isExisting();
    
    if (falseCase) {
        expect(isVisible).to.not.equal(
            true,
            `Expected element "${element}" not to exist`
        );
    } else {
        expect(isVisible).to.equal(
            true,
            `Expected element "${element}" to exist`
        );
    }
});

Then(
    /^I expect that element "([^"]*)?"( not)* contains the same text as element "([^"]*)?"$/,
    function (element1, falseCase, element2) {
        /**
         * The text of the first element
         * @type {String}
         */
        const text1 = page.currentPage[element1].getText();

        /**
         * The text of the second element
         * @type {String}
         */
        const text2 = page.currentPage[element2].getText();

        if (falseCase) {
            expect(text1).to.not.equal(
                text2,
                `Expected text not to be "${text1}"`
            );
        } else {
            expect(text1).to.equal(
                text2,
                `Expected text to be "${text1}" but found "${text2}"`
            );
        }
    }
);

Then(/^I expect that element "([^"]*)?"( not)* (matches|contains) the text "([^"]*)?"$/, function (element, falseCase, type, expectedText) {
    //Get the value of a <textarea>, <select> or text <input> found by given selector.

    const text = page.currentPage[element].getValue();


    if (type === "matches") {
        if (falseCase) {
            text.should.not.equal(expectedText);
        } else {
            text.should.equal(expectedText);
        }
    } else {
        if (falseCase) {
            expect(text).to.not.contain(expectedText);
        } else {
            expect(text).to.contain(expectedText);
        }
    }
}
);

Then(/^I expect that element "([^"]*)?" is( not)* empty$/, function (element, falseCase) {
    //Get the value of a <textarea>, <select> or text <input> found by given selector.

    const text = page.currentPage[element].getValue();
   

    if (!falseCase) {
        if (text)
            expect(text).to.not.be.null;

        else
            expect(text).to.equal(false, `Expected text to be empty but found "${text}"`);

    } else
        expect(text).to.equal(true, `Expected text to be empty`);

}
);

Then(/^I expect that button "([^"]*)?"( not)* (matches|contains) the text "([^"]*)?"$/, function (element, falseCase, type, expectedText) {
    //Get the text content from a DOM-element
    const text = page.currentPage[element].getText();   

    if (type === "contains") {
        if (falseCase) {
            expect(text).to.not.contain(expectedText);
        } else {
            expect(text).to.contain(expectedText);
        }
    } else {
        if (falseCase) {
            text.should.not.equal(expectedText);
        } else {
            text.should.equal(expectedText);
        }
    }
}
);

Then(/^I expect that the url is( not)* "([^"]*)?"$/, function (
    falseCase,
    expectedUrl
) {
    const currentUrl = browser.url().value;

    if (falseCase) {
        expect(currentUrl).to.not.equal(
            expectedUrl,
            `expected url not to be "${currentUrl}"`
        );
    } else {
        expect(currentUrl).to.equal(
            expectedUrl,
            `expected url to be "${expectedUrl}" but found ` + `"${currentUrl}"`
        );
    }
});

Then(/^I expect that element "([^"]*)?" is( not)* selected$/, function (
    element,
    falseCase
) {
    const isSelected = page.currentPage[element].isSelected();

    if (falseCase) {
        expect(isSelected).to.not.equal(
            true,
            `"${element}" should not be selected`
        );
    } else {
        expect(isSelected).to.equal(true, `"${element}" should be selected`);
    }
});

Then(/^I expect that element "([^"]*)?" is( not)* enabled$/, function (
    element,
    falseCase
) {
    //isEnabled

    const isEnabled = page.currentPage[element].isEnabled();

    if (falseCase) {
        expect(isEnabled).to.not.equal(
            true,
            `Expected element "${element}" not to be enabled`
        );
    } else {
        expect(isEnabled).to.equal(
            true,
            `Expected element "${element}" to be enabled`
        );
    }
});

Then(/^I expect a new (window|tab) has( not)* been opened$/, function (
    obsolete,
    falseCase
) {
    const windowHandles = browser.windowHandles().value;

    if (falseCase) {
        expect(windowHandles.length).to.equal(
            1,
            "A new window should not have been opened"
        );
    } else {
        expect(windowHandles.length).to.not.equal(
            1,
            "A new window has been opened"
        );
    }
});

Then(/^I expect that element "([^"]*)?" is( not)* focused$/, function (
    element,
    falseCase
) {
    const hasFocus = page.currentPage[element].isFocused();

    if (falseCase) {
        expect(hasFocus).to.not.equal(
            true,
            "Expected element to not be focused, but it is"
        );
    } else {
        expect(hasFocus).to.equal(
            true,
            "Expected element to be focused, but it is not"
        );
    }
});

Then(
    /^I expect that a (alertbox|confirmbox|prompt) is( not)* opened$/,
    function (modalType, falseState) {
        let promptText = "";

        try {
            promptText = browser.alertText();

            if (falseState) {
                expect(promptText).to.not.equal(
                    null,
                    `A ${modalType} was opened when it shouldn't`
                );
            }
        } catch (e) {
            if (!falseState) {
                expect(promptText).to.equal(
                    null,
                    `A ${modalType} was not opened when it should have been`
                );
            }
        }
    }
);

Then(
    /^I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "([^"]*)?"$/,
    function (modalType, falseState, expectedText) {
        try {
            /**
             * The text of the current modal
             * @type {String}
             */
            const text = browser.alertText();

            if (falseState) {
                expect(text).to.not.equal(
                    expectedText,
                    `Expected the text of ${modalType} not to equal ` +
                    `"${expectedText}"`
                );
            } else {
                expect(text).to.equal(
                    expectedText,
                    `Expected the text of ${modalType} to equal ` +
                    `"${expectedText}", instead found "${text}"`
                );
            }
        } catch (e) {
            assert(
                e,
                `A ${modalType} was not opened when it should have been opened`
            );
        }
    }
);

Then(/^I capture text from element "([^"]*)?" $/, function (element) {
    const textvalue = page.currentPage[element].getText();
    //TODO Save the value iglobally
});

Then(/^I fetch attribute "([^"]*)?" value of element "([^"]*)?" $/, function (
    attribute,
    element
) {
    const attValue = page.currentPage[element].getAttribute(attribute);
});

Then(/^I switch window "([^"]*)?"$/, function (url) {
    browser.switchWindow(url);
});

Then(/^I validate item "([^"]*)?" is( not)* in table "([^"]*)?"$/, function (value, falseCase, element) {

    const rows = page.currentPage[element];
    let found = false;
   
    if (value === value.toUpperCase()) {
        value = dataFile[value];
    }

    for (let i = 0; i < rows.length; i++) {
        const eachCard = rows[i].getText();
        if (eachCard === value) {
            found = true;
            break;
        }
    }

    if (!found) {
        if (falseCase) {
            expect(falseCase).to.not.equal(
                true,
                `Expected value in table is not present`
            );

        } else {
            assert.fail("Expected value not found in current table");
        }
    }

});

Then(/^I click item "([^"]*)?" in table "([^"]*)?"$/, function (value, element) {

    const rows = page.currentPage[element];
   
    if (value === value.toUpperCase()) {
        value = dataFile[value];
    }

    for (let i = 0; i < rows.length; i++) {
        const eachCard = rows[i].getText();
        
        if (eachCard === value) {          
            rows[i].$("a").click();
            browser.pause(500)
            break;
        }
    }


});



Then(/^I switch to tab (\d+)$/, function (tabNo) {
    const tabId = parseInt(tabNo, 10);
    const windowHandles = browser.getWindowHandles();
    browser.switchToWindow(windowHandles[tabId - 1]);
});

Then(/^I wait for processing "([^"]*)?"$/, function (element) {
    while (page.currentPage[element].isExisting()) {
        browser.pause(5000);
    }
});

Then(/^I switch to frame "([^"]*)?"$/, function (element) {
    // Using `element` to find an iframe and providing it to `frame` method    
    browser.switchToFrame(page.currentPage[element]);

});

Then(/^I switch to parent frame$/, function () {
    // Using `element` to find an iframe and providing it to `frame` method
    browser.switchToParentFrame();

});

Then(/^I expect list "([^"]*)?" to have count of "([^"]*)?"$/, function (element, value) {

    const rows = page.currentPage[element];
    const count = rows.length;

    if (count != value) {
        expect(count).to.not.equal(
            value,
            `Expected list count to be "${value}"`
        );
    } else if (count === value) {
        expect(count).to.equal(
            value,
            `Expected list count "${value}" and found "${count}"`
        );
    }
});

Then(/^I expect search list "([^"]*)?" to have( no)* results$/, function (element, falseCase) {

    const rows = page.currentPage[element];
    const count = rows.length;

    if (!falseCase) {
        falseCase = true;
        if (count >= 1)
            expect(falseCase).to.equal(true, `Results are displayed`);
        else
            assert.fail("Expected results are not displayed");
    } else if (falseCase.trim()) {
        falseCase = false;
        if (count === 0)
            expect(falseCase).to.equal(false, `No Results to display`);
        else
            assert.fail("Results are displayed");

    }

});
