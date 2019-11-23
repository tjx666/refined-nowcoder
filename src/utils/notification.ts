const defaultOptions = {
    type: 'basic',
    iconUrl: 'icons/refined-nowcoder-x48.png',
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
