import * as React from 'react';
import classnames from 'classnames';
import { Switch } from '@/lib';
import './style/SettingRow.scss';

interface SettingRowProps {
    label?: string;
    subLabel?: string;
    extraType?: 'none' | 'switch' | 'link' | '__blank';
    checked?: boolean;
    onChange?: (checked: boolean, event: React.MouseEvent) => void;
}

const SettingRow = ({ label, subLabel, extraType = 'none', checked, onChange }: SettingRowProps) => {
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
        (isChecked: boolean, event: React.MouseEvent) => {
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
                                <Switch checked={checked} onChange={handleChange} />
                            </label>
                        );
                    default:
                        return labels;
                }
            })()}
        </li>
    );
};

export default SettingRow;
