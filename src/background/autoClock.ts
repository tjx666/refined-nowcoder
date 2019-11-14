import axios from 'axios';
import { onlineStorage } from 'utils/storage';

// 自动打卡
// !: 打卡出错只弹一次通知
export default function() {
    let autoClockTimer: number | undefined;

    const clock = async () => {
        const { autoClock, feeling, lastClockDate, autoClockFailed, cookie } = await onlineStorage.get({
            autoClock: false,
            feeling: '',
            lastClockDate: '',
            autoClockFailed: false,
            cookie: '',
        });

        const todayDateString = new Date().toDateString();
        // 关闭打卡功能后关闭定时器
        if (!autoClock && autoClockTimer !== undefined) {
            clearInterval(autoClockTimer);
            autoClockTimer = undefined;
            return;
        }

        if (autoClock && lastClockDate !== todayDateString) {
            const clockURL = 'https://www.nowcoder.com/clock/new';
            let res: any;
            try {
                // feeling 表示的是打卡分的享内容, circle 是分享到哪些圈子，-1 表示不分享到圈子
                res = await axios.post(
                    clockURL,
                    { feeling, circle: -1 },
                    {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie },
                        params: { token: '' },
                    }
                );
            } catch (err) {
                !autoClockFailed &&
                    chrome.notifications.create({
                        type: 'basic',
                        title: '牛客网自动打卡失败！',
                        iconUrl: 'icons/get_started48.png',
                        message: `可能是网络出错或者牛客服务器异常`,
                    });
                onlineStorage.set({ autoClockFailed: true });
                return;
            }

            const { code } = res.data;
            if (code === 0) {
                chrome.notifications.create({
                    type: 'basic',
                    title: '牛客网自动打卡成功！',
                    iconUrl: 'icons/get_started48.png',
                    message: `打卡内容：${feeling}！`,
                });
            } else if (code === 999) {
                // 999: 未登入
                !autoClockFailed &&
                    chrome.notifications.create({
                        type: 'basic',
                        title: '牛客网自动打卡失败！',
                        iconUrl: 'icons/get_started48.png',
                        message: `您尚未登入牛客！`,
                    });
                onlineStorage.set({ autoClockFailed: true });
                return;
            } else if (code === 1) {
                // 1: 已经打卡过
            }
            onlineStorage.set({ lastClockDate: todayDateString, autoClockFailed: false });
        }
    };

    // 启动浏览器的时候打一次卡
    clock();
    // 隔十分钟打一次
    autoClockTimer = window.setInterval(clock, 10 * 60 * 1000);

    // 处理开启或关闭自动打卡功能
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request && request.from === 'options') {
            if (request.action === 'enable-auto-clock') {
                // 开启自动打卡的时候打一次卡
                clock();
                // 隔十分钟再打一次
                if (autoClockTimer !== undefined) {
                    clearInterval(autoClockTimer);
                }
                autoClockTimer = window.setInterval(clock, 10 * 60 * 1000);
            } else if (request.action === 'disable-auto-clock') {
                clearInterval(autoClockTimer);
                autoClockTimer = undefined;
            }
        }
    });
}
