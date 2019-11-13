/* eslint-disable prefer-template */
import $ from 'jquery';
import { onlineStorage } from 'utils/storage';

// 屏蔽帖子
export default async function blockPosts() {
    const { blockWish, blockMakeFriends } = await onlineStorage.get({ blockWish: false, blockMakeFriends: false });

    const $postsLis = $('.nk-content .common-list li');
    let blockWishCount = 0;
    let blockMakeFriendsCount = 0;
    const blockedPostsLis: HTMLElement[] = [];
    $postsLis.each(function() {
        const links = $(this).find('.discuss-main a');
        if (links.length >= 1) {
            const title = links[0]!.textContent!;

            // 屏蔽许愿贴
            if (blockWish) {
                const blockRegexps = [/许愿/, /祈愿/];
                const excludeBlockRegexps = [/还愿/];
                const shouldBlock =
                    excludeBlockRegexps.every(reg => !reg.test(title)) && blockRegexps.some(reg => reg.test(title));

                if (shouldBlock) {
                    $(this).hide();
                    blockedPostsLis.push(this);
                    blockWishCount++;
                }
            }

            // 屏蔽交友贴
            if (blockMakeFriends) {
                const blockRegexps = [/找.{1,2}友/, /征.{1,2}友/];
                const excludeBlockRegexps: RegExp[] = [];
                const shouldBlock =
                    excludeBlockRegexps.every(reg => !reg.test(title)) && blockRegexps.some(reg => reg.test(title));

                if (shouldBlock) {
                    $(this).hide();
                    blockedPostsLis.push(this);
                    blockMakeFriendsCount++;
                }
            }
        }
    });

    if ((blockWish || blockMakeFriends) && blockWishCount + blockMakeFriendsCount > 0) {
        const blockWishInfos = blockWish && blockWishCount !== 0 ? blockWishCount + '条许愿贴&nbsp;' : '';
        const blockMakeFriendsInfos =
            blockMakeFriends && blockMakeFriendsCount !== 0 ? blockMakeFriendsCount + '条交友贴' : '';
        const blockInfosInnerHTML = `已屏蔽：${blockWishInfos}${blockMakeFriendsInfos}&nbsp;<span class="show-block-posts-switch">显示</span>`;

        const blockInfosElement = document.createElement('p');
        blockInfosElement.innerHTML = blockInfosInnerHTML;
        $('.nk-container .nk-main .nk-content').append(blockInfosElement);
        $(blockInfosElement).addClass('block-post-infos');

        let blocked = true;
        $('.show-block-posts-switch').click(function() {
            if (blocked) {
                const $postsContainer = $('.nk-content .module-body .common-list');
                blockedPostsLis.forEach(blockPostLi => {
                    $postsContainer.append(blockPostLi);
                    $(blockPostLi).show('fast');
                });
                blocked = false;
                $(this).text('屏蔽');
            } else {
                blockedPostsLis.forEach(blockPostLi => {
                    $(blockPostLi).hide('fast');
                });
                blocked = true;
                $(this).text('显示');
            }
        });
    }
}
