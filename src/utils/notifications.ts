const defaultOptions = {
    type: 'basic',
    iconUrl: 'icons/refined-nowcoder-x48.png',
};

type NotificationUtils = typeof chrome.notifications & {
    (title: string, message: string): void;
};

function defaults(title: string, message: string) {
    chrome.notifications.create({
        ...defaultOptions,
        title,
        message,
    });
}

const notifications: NotificationUtils = Object.assign(defaults, chrome.notifications);
export default notifications;
