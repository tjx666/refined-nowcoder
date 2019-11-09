import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import './style.scss';

interface PageLayoutProps {
    title: string;
    backTo: string;
    children: React.ReactNode;
}

const PageLayout = ({ title, backTo, children }: PageLayoutProps) => {
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
        <div className="page-layout">
            <div className="top">
                {backToArrow}
                {title}
            </div>
            {children}
        </div>
    );
};

export default PageLayout;
