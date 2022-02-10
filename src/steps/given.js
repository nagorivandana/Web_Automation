import checkElementExists from '../utility/checkElementExists';
import mapper from '../pageObjects/pageMapper';
import page from '../pageObjects/page';
import { Given } from 'cucumber';

import updateJsonData from "../utility/updateJsonData";
const dataFile = require('../data/teamsData.json');
const chai = require('chai');
const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
const should = chai.should();  // Using Should style

Given(/^I open the (url|site) "([^"]*)?"$/, function (type, page) {
    browser.reloadSession();
    const url = (type === 'url') ? page : browser.options.baseUrl + page;
    browser.maximizeWindow();
    browser.url(url)

});


Given(/^I navigate to url "([^"]*)?"$/, function (value) {
    browser.reloadSession(); 
    browser.maximizeWindow();
    if (value === value.toUpperCase()) {
        value = dataFile[value];
    }
    browser.url(value)

});

Given(/^I open the email client "([^"]*)?"$/, function (url) {
    browser.newWindow(url)

});


Given(/^I am on page "([^"]*)?"$/, function (userpage) {
    browser.setTimeout({ 'implicit': 9999 })
    page.currentPage = mapper()[userpage];
    browser.pause(1000);

});


/**
 * Check if the given element is enabled
 * @param  {String}   element   Element selector
 * @param  {String}   falseCase Whether to check if the given element is enabled
 *                              or not
 */
Given(/^the element "([^"]*)?" is( not)* enabled$/, function (element, falseCase) {
    /**
 * The enabled state of the given element
 * @type {Boolean}
 */
    const isEnabled = page.currentPage[element].isEnabled();

    if (falseCase) {
        expect(isEnabled).to.not
            .equal(true, `Expected element "${element}" not to be enabled`);
    } else {
        expect(isEnabled).to
            .equal(true, `Expected element "${element}" to be enabled`);
    }
    //isEnabled
});



/**
 * Check the selected state of the given element of type checkbox or radio
 * @param  {String}   element   Element selector
 * @param  {String}   falseCase Whether to check if the element is elected or
 *                              not
 */
Given(/^the element "([^"]*)?" is( not)* selected$/, function (element, falseCase) {

    //checkSelected

    const isSelected = page.currentPage[element].isSelected();

    if (falseCase) {
        expect(isSelected).to.not
            .equal(true, `"${element}" should not be selected`);
    } else {
        expect(isSelected).to
            .equal(true, `"${element}" should be selected`);
    }
});



Given(
    /^there is (an|no) element "([^"]*)?" on the page$/,
    checkElementExists
);

Given(/^the title is( not)* "([^"]*)?"$/, function (falseCase, expectedTitle) {
    //checkTitle
    /**
    * The title of the current browser window
    * @type {String}
    */
    const title = browser.getTitle();

    if (falseCase) {
        expect(title).to.not
            .equal(
                expectedTitle,
                `Expected title not to be "${expectedTitle}"`
            );
    } else {
        expect(title).to
            .equal(
                expectedTitle,
                `Expected title to be "${expectedTitle}" but found "${title}"`
            );
    }
});

Given(/^the element "([^"]*)?" contains( not)* the same text as element "([^"]*)?"$/, function (element1, falseCase, element2) {
    //compareText
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
});

Given(/^the (button|element) "([^"]*)?"( not)* matches the text "([^"]*)?"$/, function (elementType, element, falseCase, expectedText) {

    let command = 'getValue';

    if (
        elementType === 'button' ||
        browser.getAttribute(currentPage[element], 'value') === null
    ) {
        command = 'getText';
    }

    let parsedExpectedText = expectedText;

    // Whether to check if the content equals the given text or not    
    let boolFalseCase = !!falseCase;

    // Check for empty element
    if (typeof parsedExpectedText === 'function') {
        parsedExpectedText = '';

        boolFalseCase = !boolFalseCase;
    }

    if (parsedExpectedText === undefined && falseCase === undefined) {
        parsedExpectedText = '';
        boolFalseCase = true;
    }

    const text = browser[command](currentPage[element]);

    if (boolFalseCase) {
        parsedExpectedText.should.not.equal(text);
    } else {
        parsedExpectedText.should.equal(text);
    }
});

Given(/^the (button|element) "([^"]*)?"( not)* contains the text "([^"]*)?"$/, function (elementType, element, falseCase, expectedText) {
    //checkContainsText

    let command = 'getValue';

    if (
        elementType === 'button' ||
        browser.getAttribute(currentPage[element], 'value') === null
    ) {
        command = 'getText';
    }

    let boolFalseCase;
    let stringExpectedText = expectedText;

    const text = browser[command](currentPage[element]);

    if (typeof expectedText === 'undefined') {
        stringExpectedText = falseCase;
        boolFalseCase = false;
    } else {
        boolFalseCase = (falseCase === ' not');
    }

    if (boolFalseCase) {
        expect(text).to.not.contain(stringExpectedText);
    } else {
        expect(text).to.contain(stringExpectedText);
    }
});


Given(/^the (button|element) "([^"]*)?" is( not)* empty$/, function (elementType, element, falseCase) {
    // checkIsEmpty
    let newFalseCase = true;

    if (typeof falseCase === 'function') {
        newFalseCase = false;
    } else if (falseCase === ' not') {
        newFalseCase = false;
    }
    let command = 'getValue';

    if (
        elementType === 'button' ||
        browser.getAttribute(currentPage[element], 'value') === null
    ) {
        command = 'getText';
    }

    let boolFalseCase;
    const text = browser[command](currentPage[element]);

    if (typeof newFalseCase === 'undefined') {
        boolFalseCase = false;
    } else {
        boolFalseCase = !!newFalseCase;
    }

    if (boolFalseCase) {
        expect(text).to.equal('');
    } else {
        expect(text).to.not.equal('');
    }
});




Given(/^a (alertbox|confirmbox|prompt) is( not)* opened$/, function (modalType, falseState) {
    let promptText = '';

    try {
        promptText = browser.alertText();

        if (falseState) {
            expect(promptText).to.not
                .equal(
                    null,
                    `A ${modalType} was opened when it shouldn't`
                );
        }
    } catch (e) {
        if (!falseState) {
            expect(promptText).to
                .equal(
                    null,
                    `A ${modalType} was not opened when it should have been`
                );
        }
    }


});

