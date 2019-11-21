/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import $ from 'jquery';
import _ from 'lodash';

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

    return (
        <p className="block-post-infos">
            <span>共屏蔽 {blockedPostsLis.length} 条帖子，</span>
            {blockWishCount > 0 && <span>{blockWishCount} 条许愿贴，</span>}
            {blockMakeFriendsCount > 0 && <span>{blockMakeFriendsCount}条交友贴，</span>}
            {blockByCustomRulesCount > 0 && <span>{blockByCustomRulesCount}条被自定义规则屏蔽</span>}
            &nbsp;
            <span className="show-block-posts-switch" onClick={handleToggle}>
                {showBlockedLis ? '屏蔽' : '展示'}
            </span>
        </p>
    );
};

export default BlockInfos;
