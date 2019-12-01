const chromeSyncStorage = chrome.storage.sync;
const chromeLocalStorage = chrome.storage.local;

const onlineStorage = {
    get<T extends Record<string, any>>(keys: T): Promise<Record<keyof T, any>> {
        return new Promise(resolve => {
            chromeSyncStorage.get(keys, items => resolve(items as any));
        });
    },
    set(keys: Record<string, any>) {
        return new Promise(resolve => {
            chromeSyncStorage.set(keys, () => resolve());
        });
    },
};

const localStorage = {
    get<T extends Record<string, any>>(keys: T): Promise<Record<keyof T, any>> {
        return new Promise(resolve => {
            chromeLocalStorage.get(keys, items => resolve(items as any));
        });
    },
    set(keys: Record<string, any>) {
        return new Promise(resolve => {
            chromeLocalStorage.set(keys, () => resolve());
        });
    },
};

export { onlineStorage, localStorage };
