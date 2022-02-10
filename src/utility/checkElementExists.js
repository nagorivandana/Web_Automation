var checkIfElementExists = require('./checkIfElementExists');

/**
 * Check if the given element exists
 * @param  {String}   isExisting Whether the element should be existing or not
 *                               (yes or no)
 * @param  {String}   elem       Element selector
 */
module.exports = (isExisting, elem) => {
    /**
     * Falsecase assertion
     * @type {Boolean}
     */
    let falseCase = true;

    if (isExisting === 'yes') {
        falseCase = false;
    }

    checkIfElementExists(elem, falseCase);
};
