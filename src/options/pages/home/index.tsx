import * as React from 'react';
import { onlineStorage } from 'utils/storage.ts';
import { SettingCard } from '../../components';
import Settings from '@/types/Settings';
import './style.scss';

const { SettingRow } = SettingCard;

const Home = () => {
    const [settings, updateSettings] = React.useState<Settings>({ blockWish: false, blockMakeFriends: false });

    const syncOnlineSettings = React.useCallback(async () => {
        const { settings: onlineSetting } = await onlineStorage.get({
            settings: {
                blockWish: false,
                blockMakeFriends: false,
            },
        });

        updateSettings(onlineSetting);
    }, []);

    React.useEffect(() => {
        syncOnlineSettings();
    }, [syncOnlineSettings]);

    const getSettingsChangeHandler = (key: string) => {
        return (checked: boolean) => {
            const newSettings = { ...settings, [key]: checked };
            onlineStorage.set({ settings: newSettings });
            updateSettings(newSettings);
        };
    };

    return (
        <main className="home">
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
            </SettingCard>
        </main>
    );
};

export default Home;
