import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import './style.scss';

interface PageLayoutProps {
    className?: string;
    contentClasses?: string;
    title: string;
    backTo: string;
    children: React.ReactNode;
}

const PageLayout = ({ className = '', contentClasses = '', title, backTo, children }: PageLayoutProps) => {
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
        <div className={`page-layout ${className}`}>
            <div className="top">
                {backToArrow}
                {title}
            </div>
            <div className={`page-layout-content ${contentClasses}`}>{children}</div>
        </div>
    );
};

export default PageLayout;
