import * as React from 'react';
import { SettingCard } from './components';
import './App.scss';

const header = (
    <header>
        <h1 className="title">Refined Nowcoder 选项与帮助</h1>
    </header>
);

export const App = () => {
    return (
        <div className="app">
            {header}
            <div className="main-container">
                <main>
                    <SettingCard title="屏蔽广告" />
                </main>
            </div>
        </div>
    );
};
