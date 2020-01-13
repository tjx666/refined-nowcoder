import axios from 'axios';
import isOnline from 'is-online';
import { onlineStorage } from 'utils/storage';
import notification from '@/utils/notification';

/**
 * 设置自动打卡
 *
 * !: 如果打卡失败了，下次打卡失败将不再提醒，直到打卡成功
 */
export default function autoClock() {
    let autoClockTimer: number | undefined;

    async function clock() {
        // eslint-disable-next-line no-shadow
        const { autoClock, feeling, lastClockDate, autoClockFailed, cookie } = await onlineStorage.get({
            autoClock: false,
            feeling: '',
            lastClockDate: '',
            autoClockFailed: false,
            cookie: '',
        });

        const todayDateStr = new Date().toDateString();
        // 关闭打卡功能后关闭定时器
        if (!autoClock && autoClockTimer !== undefined) {
            clearInterval(autoClockTimer);
            autoClockTimer = undefined;
            return;
        }

        // 没有开启自动打卡，今天已经打过卡，没有网络的情况下都不打卡
        const shouldClock = autoClock && lastClockDate !== todayDateStr && (await isOnline());
        if (shouldClock) {
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
                !autoClockFailed && notification('自动打卡失败！', `原因：服务器异常`);
                onlineStorage.set({ autoClockFailed: true });
                return;
            }

            const { code } = res.data;
            if (code === 0) {
                notification('自动打卡成功！', `打卡内容：${feeling || '未设置'}`);
            } else if (code === 999) {
                // 999: 未登入
                !autoClockFailed && notification('自动打卡失败！', `原因：您尚未登入牛客网！`);
                onlineStorage.set({ autoClockFailed: true });
                return;
            } else if (code === 1) {
                // 1: 已经打卡过
            }
            onlineStorage.set({ lastClockDate: todayDateStr, autoClockFailed: false });
        }
    }

    // 启动浏览器的时候打一次卡
    clock();
    // 隔 30 分钟打一次
    autoClockTimer = window.setInterval(clock, 30 * 60 * 1000);

    // 处理在选项页面开启或关闭自动打卡功能
    chrome.runtime.onMessage.addListener(({ from, action }) => {
        if (from === 'options') {
            if (action === 'enable-auto-clock') {
                // 开启自动打卡的时候打一次卡
                clock();

                // 清除原本的定时器
                if (autoClockTimer !== undefined) {
                    clearInterval(autoClockTimer);
                }

                // 隔 30 分钟打一次
                autoClockTimer = window.setInterval(clock, 30 * 60 * 1000);
            } else if (action === 'disable-auto-clock') {
                clearInterval(autoClockTimer);
                autoClockTimer = undefined;
            }
        }
    });
}
