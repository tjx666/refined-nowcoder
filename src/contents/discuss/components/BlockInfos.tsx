/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import { Icon } from 'antd';

interface BlockInfosProps {
    blockedPostsLis: HTMLElement[];
    blockWishCount: number;
    blockMakeFriendsCount: number;
    blockByCustomRulesCount: number;
}

const BlockInfos = ({
    blockedPostsLis,
    blockWishCount,
    blockMakeFriendsCount,
    blockByCustomRulesCount,
}: BlockInfosProps) => {
    const [showBlockedLis, setShowBlockedLis] = React.useState<boolean>(false);

    const handleToggle = () => {
        if (showBlockedLis) {
            $(_.reverse(blockedPostsLis)).each(function() {
                $(this).hide('fast');
            });
        } else {
            $(blockedPostsLis).each(function() {
                $(this).show('fast');
            });
        }
        setShowBlockedLis(!showBlockedLis);
    };

    const infos = React.useMemo(() => {
        const infosElements: string[] = [];
        if (blockWishCount) {
            infosElements.push(`${blockWishCount} 条许愿贴`);
        }

        if (blockMakeFriendsCount > 0) {
            infosElements.push(`${blockMakeFriendsCount} 条交友贴`);
        }

        if (blockByCustomRulesCount > 0) {
            infosElements.push(`${blockByCustomRulesCount} 条被自定义规则屏蔽`);
        }

        return infosElements.join('，');
    }, [blockWishCount, blockMakeFriendsCount, blockByCustomRulesCount]);

    return (
        <div className="block-post-infos">
            <span>{`屏蔽了 ${infos}`}</span>
            <span className="show-block-posts-icon" onClick={handleToggle}>
                {showBlockedLis ? <Icon type="eye-invisible" /> : <Icon type="eye" />}
            </span>
        </div>
    );
};

export default BlockInfos;
