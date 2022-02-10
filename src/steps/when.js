import selectOption from "../utility/selectOption";
import page from "../pageObjects/page";
const { When } = require("cucumber");
import updateJsonData from "../utility/updateJsonData";
const dataFile = require('../data/teamsData.json');
const chai = require('chai');
const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
const should = chai.should();  // Using Should style

When(/^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/, function (action, type, element) {
    // const elem = (type === 'link') ? `=${element}` : element;
    const command = action === "click" ? "click" : "doubleClick";
    browser.pause(1000);
    page.currentPage[element].waitForExist(10000);
    page.currentPage[element].waitForClickable({ timeout: 5000 });
    if (element === 'btnActions') {
        browser.pause(2000);
    }

    page.currentPage[element][command]();    

}
);

When(/^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/, function (method, value, element) {
    const command = method === "add" ? "addValue" : "setValue";
    if (value === value.toUpperCase()) {
        value = dataFile[value];
    }
    page.currentPage[element][command](value);

});


When(/^I read from datafile "([^"]*)?" to set inputfield "([^"]*)?"$/, function (key, element) {

    const value = dataFile[key];
    page.currentPage[element].setValue(value);

});

When(/^I clear the inputfield "([^"]*)?"$/, function (element) {
    page.currentPage[element][clearValue]();
    browser.clearElement(element);
});

When(/^I drag element "([^"]*)?" to element "([^"]*)?"$/, function (
    source,
    destination
) {
    browser.dragAndDrop(source, destination);
});

When(/^I submit the form "([^"]*)?"$/, function (form) {
    browser.submitForm(form);
});

When(/^I pause for (\d+)ms$/, function (ms) {
    /**
     * Number of milliseconds
     * @type {Int}
     */
    browser.pause(ms);
});

When(/^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/, function (
    cookieName,
    cookieContent
) {
    browser.setCookie({
        name: cookieName,
        value: cookieContent
    });
});

When(/^I delete the cookie "([^"]*)?"$/, function (name) {
    browser.deleteCookie(name);
});

When(/^I press "([^"]*)?"$/, function (key) {
    browser.keys(key);
});

When(/^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/, function (
    action,
    modalType
) {
    let command = `alert${action.slice(0, 1).toUpperCase()}${action.slice(1)}`;

    if (modalType === "alertbox") {
        command = "alertAccept";
    }

    browser[command]();
});

When(/^I scroll to element "([^"]*)?"$/, function (selector) {
    browser.scroll(selector);
});

When(/^I close the last opened (window|tab)$/, function (obsolete) {
    const lastWindowHandle = browser.windowHandles().value.slice(-1)[0];

    browser.window(lastWindowHandle);

    browser.close();
});

When(/^I focus the last opened (window|tab)$/, function (obsolete) {
    const lastWindowHandle = browser.windowHandles().value.slice(-1)[0];
    browser.window(lastWindowHandle);
});

When(/^I select the (\d+) option for element "([^"]*)?"$/, function (
    index,
    element
) {
    const optionIndex = parseInt(index, 50);
    page.currentPage[element].selectByIndex();
    //  browser.selectByIndex(selectElem, optionIndex);
});

When(/^I select the option "([^"]*)?" from element "([^"]*)?"$/, function (
    option,
    element
) {
    browser.pause(1000);
    page.currentPage[element].selectByVisibleText(option);
});

When(
    /^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/,
    selectOption
);

When(/^I reload session$/, function () {
    browser.reloadSession();
});


When(/^I scroll into elements viewport "([^"]*)?"$/, function (element) {
    page.currentPage[element].scrollIntoView();

});

