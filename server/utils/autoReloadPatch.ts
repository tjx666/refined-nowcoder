import logWithPrefix from './log';

const source = new EventSource('http://127.0.0.1:3000/__extension_auto_reload__');

source.addEventListener(
    'open',
    () => {
        logWithPrefix('connected');
    },
    false,
);

source.addEventListener(
    'message',
    event => {
        logWithPrefix('received a no event name message, data:');
        console.log(event.data);
    },
    false,
);

source.addEventListener(
    'pause',
    () => {
        logWithPrefix('received pause message from server, ready to close connection!');
        source.close();
    },
    false,
);

source.addEventListener(
    'compiledSuccessfully',
    (event: EventSourceEvent) => {
        const shouldReload = JSON.parse(event.data).action === 'reload extension and refresh current page';

        if (shouldReload) {
            logWithPrefix('received the signal to reload chrome extension');
            chrome.tabs.query({}, tabs => {
                tabs.forEach(tab => {
                    if (tab.id) {
                        let received = false;
                        chrome.tabs.sendMessage(
                            tab.id,
                            {
                                from: 'background',
                                action: 'refresh current page',
                            },
                            res => {
                                if (!res) return;

                                const { from, action } = res;
                                if (!received && from === 'content script' && action === 'reload extension') {
                                    received = true;
                                    source.close();
                                    logWithPrefix('reload extension');
                                    chrome.runtime.reload();
                                }
                            },
                        );
                    }
                });
            });
        }
    },
    false,
);

source.addEventListener(
    'error',
    (event: EventSourceEvent) => {
        if (event.target!.readyState === 0) {
            console.error('You need to open devServer first!');
        } else {
            console.error(event);
        }
    },
    false,
);
