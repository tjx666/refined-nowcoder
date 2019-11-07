import $ from 'jquery';
import { onlineStorage } from 'utils/storage';
import './style.scss';

// 屏蔽帖子
(function blockPosts() {
    onlineStorage.get({ settings: { blockWish: false, blockMakeFriends: false } }).then(data => {
        const {
            settings: { blockWish, blockMakeFriends },
        } = data;

        const $postLis = $('.nk-content .common-list li');
        $postLis.each(function() {
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
                        console.log(title);
                        $(this).remove();
                    }
                }

                // 屏蔽交友贴
                if (blockMakeFriends) {
                    const blockRegexps = [/交友/, /征女友/];
                    const excludeBlockRegexps: RegExp[] = [];
                    const shouldBlock =
                        excludeBlockRegexps.every(reg => !reg.test(title)) && blockRegexps.some(reg => reg.test(title));

                    if (shouldBlock) {
                        console.log(title);
                        $(this).remove();
                    }
                }
            }
        });
    });
})();
