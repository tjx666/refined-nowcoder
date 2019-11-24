import { onlineStorage } from 'utils/storage';
import extensionAutoReload from './extensionAutoReload';
import doubleClickBackToTop from './doubleClickBackToTop';
import './style.scss';

// 存储 cookie
onlineStorage.set({ cookies: document.cookie });

// SSE client
process.env.NODE_ENV === 'development' && extensionAutoReload();

onlineStorage.get({ doubleClickBackToTop: false }).then(({ doubleClickBackToTop: doubleClickBackToTopSetting }) => {
    doubleClickBackToTopSetting && doubleClickBackToTop();
});
