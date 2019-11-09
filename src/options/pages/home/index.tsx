import * as React from 'react';
import { onlineStorage } from 'utils/storage.ts';
import { SettingCard } from '../../components';

const { SettingRow } = SettingCard;

const Home = () => {
    const [settings, updateSettings] = React.useState({ blockWish: false, blockMakeFriends: false });

    const syncOnlineSettings = React.useCallback(async () => {
        const onlineSetting = await onlineStorage.get({
            blockWish: false,
            blockMakeFriends: false,
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
                    label="屏蔽许愿贴"
                    extraType="switch"
                    checked={settings.blockWish}
                    onChange={getSettingsChangeHandler('blockWish')}
                />
                <SettingRow
                    label="屏蔽交友贴"
                    extraType="switch"
                    checked={settings.blockMakeFriends}
                    onChange={getSettingsChangeHandler('blockMakeFriends')}
                />
                <SettingRow label="自动打卡" extraType="link" to="/autoClock" />
            </SettingCard>
        </div>
    );
};

export default Home;
