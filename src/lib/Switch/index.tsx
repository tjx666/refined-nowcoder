import * as React from 'react';
import classnames from 'classnames';
import './style.scss';

interface SwitchProps {
    checked?: boolean;
    checkedText?: string;
    uncheckedText?: string;
    disabled?: boolean;
    size?: 'small' | 'default';
}

const Switch = ({
    checked = false,
    checkedText = '',
    uncheckedText = '',
    disabled = false,
    size = 'default',
}: SwitchProps) => {
    const [checkState, setCheckState] = React.useState<boolean>(checked);
    const switchClassnames = classnames({
        switch: true,
        'switch-checked': checkState,
        'switch-disabled': disabled,
        'switch-small': size === 'small',
    });

    const handleClick = React.useCallback(() => {
        setCheckState(!checkState);
    }, [checkState]);

    return (
        <button type="button" className={switchClassnames} onClick={handleClick}>
            <span className="inner-text">{checkState ? checkedText : uncheckedText}</span>
        </button>
    );
};

export default Switch;
