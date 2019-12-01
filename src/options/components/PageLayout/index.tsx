import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import './style.scss';

interface PageLayoutProps {
    className?: string;
    contentClassName?: string;
    title: string;
    backTo: string;
    children: React.ReactNode;
}

const PageLayout = ({ className = '', contentClassName = '', title, backTo, children }: PageLayoutProps) => {
    const layoutClasses = React.useMemo(() => `page-layout ${className}`, [className]);
    const contentClasses = React.useMemo(() => `page-layout-content ${contentClassName}`, [contentClassName]);

    const backToArrow = React.useMemo(() => {
        return (
            backTo && (
                <Link className="back-to-arrow" to={backTo}>
                    <Icon type="arrow-left" />
                </Link>
            )
        );
    }, [backTo]);

    return (
        <div className={layoutClasses}>
            <div className="top">
                {backToArrow}
                {title}
            </div>
            <div className={contentClasses}>{children}</div>
        </div>
    );
};

export default PageLayout;
