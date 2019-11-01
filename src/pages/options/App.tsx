import * as React from 'react';
import './App.scss';

export const App = () => {
    return (
        <div className="app">
            <div className="form-control">
                <label htmlFor="auto-check-in">自动打卡：</label>
                <input type="checkbox" id="auto-check-in" />
            </div>
        </div>
    );
};
