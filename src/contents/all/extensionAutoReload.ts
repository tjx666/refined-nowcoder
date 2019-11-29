export default () => {
    const source = new EventSource('http://localhost:3000/__extension_auto_reload_sse__');

    source.addEventListener(
        'open',
        () => {
            console.log('Connected to extension auto reload SSE server!');
        },
        false
    );

    source.addEventListener(
        'message',
        event => {
            console.log('Received a no event name message, data:', event.data);
        },
        false
    );

    source.addEventListener(
        'pause',
        () => {
            console.log('Received pause message from server, ready to close connection');
            source.close();
        },
        false
    );

    source.addEventListener(
        'compiled',
        (event: any) => {
            if (event.data === 'reload-extension') {
                chrome.runtime.sendMessage(
                    {
                        from: 'refined-nowcoder-content-script',
                        action: 'reload-whole-extension',
                    },
                    response => {
                        if (response.from === 'background') {
                            if (response.action === 'refresh-current-page') {
                                source.close();
                                setTimeout(() => {
                                    window.location.reload();
                                }, 200);
                            }
                        }
                    }
                );
            }
        },
        false
    );

    source.addEventListener(
        'error',
        event => {
            console.error(event);
            (event.target as any).readyState === 0 && console.error('请先打开 devServer!');
        },
        false
    );
};
