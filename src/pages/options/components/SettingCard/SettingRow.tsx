import * as React from 'react';
import { Switch } from '@/lib';
import './style/SettingRow.scss';

interface SettingRowProps {
    label?: string;
    subLabel?: string;
    switchable?: boolean;
}

const SettingRow = ({ label, subLabel, switchable = false }: SettingRowProps) => {
    return (
        <li className="setting-row">
            <label>
                <div className="label-wrapper">
                    <div className="label">{label}</div>
                    <div className="sub-label">{subLabel}</div>
                </div>
                <div className="extra">{switchable && <Switch />}</div>
            </label>
        </li>
    );
};

export default SettingRow;
