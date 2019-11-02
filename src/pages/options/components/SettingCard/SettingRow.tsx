import * as React from 'react';
import './style/SettingRow.scss';

interface SettingRowProps {
    label?: string;
    subLabel?: string;
}

const SettingRow = ({ label, subLabel }: SettingRowProps) => {
    return (
        <li className="setting-row">
            <div className="label-wrapper">
                <div className="label">{label}</div>
                <div className="sub-label">{subLabel}</div>
            </div>
        </li>
    );
};

export default SettingRow;
