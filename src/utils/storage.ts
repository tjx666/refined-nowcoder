/* eslint-disable import/prefer-default-export */
const chromeSyncStorage = chrome.storage.sync;

const onlineStorage = {
    get<T extends Record<string, any>>(keys: T): Promise<Record<keyof T, any>> {
        return new Promise(resolve => {
            chromeSyncStorage.get(keys, items => resolve(items as Record<keyof T, any>));
        });
    },
    set(keys: Record<string, any>) {
        return new Promise(resolve => {
            chromeSyncStorage.set(keys, () => resolve());
        });
    },
};

export { onlineStorage };
