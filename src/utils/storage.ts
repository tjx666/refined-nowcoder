const chromeSyncStorage = chrome.storage.sync;
// const chromeLocalStorage = chrome.storage.local;

const onlineStorage = {
    get<T extends Object>(keys: T): Promise<T> {
        return new Promise(resolve => {
            chromeSyncStorage.get(keys, items => resolve(items as T));
        });
    },
    set(keys: Object) {
        return new Promise(resolve => {
            chromeSyncStorage.set(keys, () => resolve());
        });
    },
};

export { onlineStorage };
