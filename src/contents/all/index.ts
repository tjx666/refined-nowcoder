import { onlineStorage } from 'utils/storage';
import doubleClickBackToTopFeature from './doubleClickBackToTop';
import './style.scss';

// 存储 cookie
onlineStorage.set({ cookies: document.cookie });

onlineStorage.get({ doubleClickBackToTop: false }).then(({ doubleClickBackToTop }) => {
    doubleClickBackToTop && doubleClickBackToTopFeature();
});
