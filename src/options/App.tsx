import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { onlineStorage } from 'utils/storage.ts';
import { SettingCard } from './components';
import './App.scss';
import Settings from '@/types/Settings';

const { SettingRow } = SettingCard;

const App = () => {
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

    const header = React.useMemo(() => {
        return (
            <header>
                <h1 className="title">Refined Nowcoder 选项与帮助</h1>
            </header>
        );
    }, []);

    return (
        <div className="app">
            {header}
            <div className="main-container">
                <main>
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
            </div>
        </div>
    );
};

export default hot(App);