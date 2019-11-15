const defaultOptions = {
    type: 'basic',
    iconUrl: 'icons/get_started48.png',
};

const notification = (title: string, message: string) => {
    chrome.notifications.create({
        ...defaultOptions,
        title,
        message,
    });
};

notification.create = chrome.notifications.create;

export default notification;
