/* eslint-disable prefer-template */
import * as React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import { onlineStorage } from 'utils/storage';
import { isValidRegexp } from 'utils/regexp';
import { BlockInfos } from './components';

// 屏蔽帖子
export default async function blockPosts() {
    const { blockWish, blockMakeFriends, blockPostRegexps } = await onlineStorage.get({
        blockWish: false,
        blockMakeFriends: false,
        blockPostRegexps: '',
    });
    if (!blockWish && !blockMakeFriends && blockPostRegexps.trim() === '') return;

    const $postsLis = $('.nk-content .common-list li');
    let blockWishCount = 0;
    let blockMakeFriendsCount = 0;
    let blockByCustomRulesCount = 0;
    const blockedPostsLis: HTMLElement[] = [];
    $postsLis.each(function() {
        const $links = $(this).find('.discuss-main a');
        if ($links.length >= 1) {
            const title = $links[0]!.textContent!;
            const tags = [...$links.slice(1)].map(tagLink => {
                return tagLink.textContent!.trim();
            });

            // 屏蔽许愿贴
            if (blockWish) {
                const blockRegexps = [/许愿/, /祈愿/];
                const excludeBlockRegexps = [/还愿/];
                const shouldBlock =
                    excludeBlockRegexps.every(reg => !reg.test(title)) &&
                    (tags.includes('许愿') || blockRegexps.some(reg => reg.test(title)));

                if (shouldBlock) {
                    $(this).hide();
                    blockedPostsLis.push(this);
                    blockWishCount++;
                    return;
                }
            }

            // 屏蔽交友贴
            if (blockMakeFriends) {
                const blockRegexps = [/(找|征).*?(男|女)朋?友/, /相亲/];
                const excludeBlockRegexps: RegExp[] = [];
                const shouldBlock =
                    excludeBlockRegexps.every(reg => !reg.test(title)) &&
                    (tags.includes('交友') || blockRegexps.some(reg => reg.test(title)));

                if (shouldBlock) {
                    $(this).hide();
                    blockedPostsLis.push(this);
                    blockMakeFriendsCount++;
                    return;
                }
            }

            // 自定义屏蔽
            if (typeof blockPostRegexps === 'string' && blockPostRegexps.trim() !== '') {
                const blockRegexps = blockPostRegexps.split('\n');
                const shouldBlock = blockRegexps.some(regStr => {
                    return isValidRegexp(regStr) && new RegExp(regStr).test(title);
                });

                if (shouldBlock) {
                    $(this).hide();
                    blockedPostsLis.push(this);
                    blockByCustomRulesCount++;
                }
            }
        }
    });

    if (blockedPostsLis.length > 0) {
        const $postsContainer = $('.nk-content .module-body .common-list');
        $(blockedPostsLis).each(function() {
            $postsContainer.append(this);
        });

        const infosRoot = document.createElement('div');
        $('.nk-container .nk-main .nk-content').append(infosRoot);
        ReactDOM.render(
            <BlockInfos
                blockedPostsLis={blockedPostsLis}
                blockWishCount={blockWishCount}
                blockMakeFriendsCount={blockMakeFriendsCount}
                blockByCustomRulesCount={blockByCustomRulesCount}
            />,
            infosRoot
        );
    }
}
