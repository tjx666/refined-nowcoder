/* eslint-disable import/prefer-default-export, no-new */
export function isValidRegexp(regexpString: string): boolean {
    try {
        new RegExp(regexpString);
    } catch (err) {
        return false;
    }

    return true;
}
