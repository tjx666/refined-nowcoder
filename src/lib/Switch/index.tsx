import * as React from 'react';
import { useUpdateEffect } from 'react-use';
import classnames from 'classnames';
import './style.scss';

interface SwitchProps {
    checked?: boolean;
    checkedText?: string;
    uncheckedText?: string;
    disabled?: boolean;
    size?: 'small' | 'default';
    onChange?: (checked: boolean, event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
}

const Switch = ({
    checked,
    checkedText = '',
    uncheckedText = '',
    disabled = false,
    size = 'default',
    onClick,
    onChange,
}: SwitchProps) => {
    const [checkState, setCheckState] = React.useState<boolean>(checked === undefined ? false : checked);
    const computedCheckState = checked === undefined ? checkState : checked;

    useUpdateEffect(() => {
        checked && setCheckState(checked);
    });

    const switchClassnames = classnames({
        switch: true,
        'switch-checked': computedCheckState,
        'switch-disabled': disabled,
        'switch-small': size === 'small',
    });

    const handleClick = React.useCallback(
        (event: React.MouseEvent) => {
            if (checked === undefined) {
                setCheckState(!checkState);
            }

            onClick && onClick(event);
            onChange && onChange(!computedCheckState, event);
        },
        [checked, checkState]
    );

    return (
        <button type="button" className={switchClassnames} onClick={handleClick}>
            <span className="inner-text">{checkState ? checkedText : uncheckedText}</span>
        </button>
    );
};

export default Switch;
