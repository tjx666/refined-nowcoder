import * as React from 'react';
import SettingRow from './SettingRow';
import './style/SettingCard.scss';

interface SettingCardProps {
    title: string;
    children?: React.ReactNode;
    showToggleBtn?: boolean;
    handToggle?: (isOpen: boolean) => void;
}

const SettingCard = ({ title, children }: SettingCardProps) => {
    return (
        <div className="setting-card">
            <div className="card-header">
                <h2 className="title">{title}</h2>
            </div>
            <ul className="card-body">{children}</ul>
        </div>
    );
};
SettingCard.SettingRow = SettingRow;

export default SettingCard;
