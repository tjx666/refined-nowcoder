import * as React from 'react';
import { Switch } from 'antd';
import classnames from 'classnames';
import './style/SettingRow.scss';

interface SettingRowProps {
    label?: string;
    subLabel?: string;
    children?: React.ReactNode;
    extraType?: 'none' | 'switch' | 'link' | '__blank';
    checked?: boolean;
    onChange?: (checked: boolean, event: MouseEvent) => void;
}

const SettingRow = ({ label, subLabel, children, extraType = 'none', checked, onChange }: SettingRowProps) => {
    const settingRowClasses = classnames({ 'setting-row': true, 'setting-row-switch-type': extraType === 'switch' });

    const labels = React.useMemo(() => {
        return (
            <div className="label-wrapper">
                <div className="label">{label}</div>
                <div className="sub-label">{subLabel}</div>
            </div>
        );
    }, [label, subLabel]);

    const handleChange = React.useCallback(
        (isChecked: boolean, event: MouseEvent) => {
            onChange && onChange(isChecked, event);
        },
        [onChange]
    );

    return (
        <li className={settingRowClasses}>
            {(function renderContent() {
                switch (extraType) {
                    case 'switch':
                        return (
                            <label>
                                {labels}
                                <Switch size="small" checked={checked} onChange={handleChange} />
                            </label>
                        );
                    default:
                        return [labels, children];
                }
            })()}
        </li>
    );
};

export default SettingRow;
