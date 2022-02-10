import LoginPage from './login.page';
import CommonPage from './common.page';

/**
 * Maps CurrentPage object to the page set
 */
module.exports = () => {
    const pagesMap = {
        LoginPage,
        CommonPage
    };

    return pagesMap;
};
