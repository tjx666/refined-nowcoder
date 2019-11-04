import * as React from 'react';
import { onlineStorage } from 'utils/storage.ts';
import { SettingCard } from './components';
import './App.scss';

const { SettingRow } = SettingCard;

interface Settings {
    blockWish?: boolean;
    blockMakeFriends?: boolean;
}

const App = () => {
    const [settings, updateSettings] = React.useState<Settings>({ blockWish: false, blockMakeFriends: false });

    const syncOnlineSettings = React.useCallback(async () => {
        const { settings: onlineSetting } = await onlineStorage.get({
            settings: {
                blockWish: false,
                blockMakeFriends: false,
            },
        });

        console.log('online settings:', onlineSetting);
        updateSettings(onlineSetting);
    }, []);

    React.useEffect(() => {
        syncOnlineSettings();
    }, []);

    const getSettingsChangeHandler = (key: string) => {
        console.log('generate handler key:', key, 'settings:', settings);
        return (checked: boolean) => {
            console.log('current setting:', settings);
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

export default App;
