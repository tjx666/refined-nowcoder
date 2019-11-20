export const isValidRegexp = (strToBeValidated: string): boolean => {
    try {
        // eslint-disable-next-line
        new RegExp(strToBeValidated);
    } catch (err) {
        return false;
    }

    return true;
};
