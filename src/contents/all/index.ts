import { onlineStorage } from 'utils/storage';
import './style.scss';

// 存储 cookie
onlineStorage.set({ cookies: document.cookie });
