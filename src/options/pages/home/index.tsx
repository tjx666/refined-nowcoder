import * as React from 'react';
import { onlineStorage } from 'utils/storage.ts';
import { SettingCard } from '../../components';

const { SettingRow } = SettingCard;

const Home = () => {
    const [settings, updateSettings] = React.useState({
        blockWish: false,
        blockMakeFriends: false,
        doubleClickBackToTop: false,
    });

    const syncOnlineSettings = React.useCallback(async () => {
        const onlineSetting = await onlineStorage.get({
            blockWish: false,
            blockMakeFriends: false,
            doubleClickBackToTop: false,
        });

        updateSettings(onlineSetting);
    }, []);

    React.useEffect(() => {
        syncOnlineSettings();
    }, [syncOnlineSettings]);

    const getSettingsChangeHandler = (key: string) => {
        return (checked: boolean) => {
            const newSettings = { ...settings, [key]: checked };
            onlineStorage.set({ ...newSettings });
            updateSettings(newSettings);
        };
    };

    return (
        <div className="home">
            <SettingCard title="通用">
                <SettingRow
                    label="双击返回顶部"
                    extraType="switch"
                    checked={settings.doubleClickBackToTop}
                    onChange={getSettingsChangeHandler('doubleClickBackToTop')}
                />
                <SettingRow label="屏蔽设置" extraType="link" to="/blockPost" />
                <SettingRow label="自动打卡" extraType="link" to="/autoClock" />
            </SettingCard>
        </div>
    );
};

export default Home;
