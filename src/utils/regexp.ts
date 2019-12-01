/* eslint-disable import/prefer-default-export */
export const isValidRegexp = (strToBeValidated: string): boolean => {
    try {
        // eslint-disable-next-line no-new
        new RegExp(strToBeValidated);
    } catch (err) {
        return false;
    }

    return true;
};
