import { onlineStorage } from 'utils/storage';
import doubleClickBackToTop from './doubleClickBackToTop';
import './style.scss';

// 存储 cookie
onlineStorage.set({ cookies: document.cookie });

onlineStorage.get({ doubleClickBackToTop: false }).then(({ doubleClickBackToTop: doubleClickBackToTopSetting }) => {
    doubleClickBackToTopSetting && doubleClickBackToTop();
});
