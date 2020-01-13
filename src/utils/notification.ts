function defaults(title: string, message: string) {
    const defaultOptions = {
        type: 'basic',
        iconUrl: 'icons/refined-nowcoder-x48.png',
    };

    chrome.notifications.create({
        ...defaultOptions,
        title,
        message,
    });
}

const notification = Object.assign(defaults, chrome.notifications);

export default notification;
