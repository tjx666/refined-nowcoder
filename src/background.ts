chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request && request.from === 'refined-nowcoder-content-script') {
        if (request.action === 'reload-whole-extension') {
            chrome.runtime.reload();
        }
    }
});
