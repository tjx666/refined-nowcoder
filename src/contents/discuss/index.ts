import './style.scss';
import $ from 'jquery';

// 屏蔽贴子
(function shadowPosts() {
    interface ShadowConfigItem {
        readonly blacklistKeywords: ReadonlyArray<string>;
        readonly whitelistKeywords?: ReadonlyArray<string>;
        readonly passPatterns?: ReadonlyArray<RegExp>; // 匹配成功就进白名单
        readonly blockPatterns?: ReadonlyArray<RegExp>; // 匹配成功就进黑名单
    }

    interface ShadowConfig {
        [key: string]: ShadowConfigItem;
    }

    const shadowConfigs: ShadowConfig = {
        common: {
            blacklistKeywords: [],
            whitelistKeywords: ['置顶', '烫'],
        },
        wish: {
            blacklistKeywords: ['许愿'],
            whitelistKeywords: ['许愿集合', '还愿'],
        },
        makeFriend: {
            blacklistKeywords: ['交友', '征男友'],
        },
    };

    const $postLis = $('.nk-content .common-list li');
    $postLis.each(function() {
        const links = $(this).find('.discuss-main a');
        if (links.length >= 1) {
            const title = links[0].textContent!;
            const allBlacklistKeywords = Object.values(shadowConfigs).reduce(
                (all: string[], config) => [...all, ...config.blacklistKeywords],
                []
            );
            const allWhitelistKeywords = Object.values(shadowConfigs).reduce(
                (all: string[], config) => (config.whitelistKeywords ? [...all, ...config.whitelistKeywords] : all),
                []
            );
            const allPassPatterns = Object.values(shadowConfigs).reduce(
                (all: RegExp[], config) => (config.passPatterns ? [...all, ...config.passPatterns] : all),
                []
            );
            const allBlockPatterns = Object.values(shadowConfigs).reduce(
                (all: RegExp[], config) => (config.blockPatterns ? [...all, ...config.blockPatterns] : all),
                []
            );

            const inWhitelist =
                allWhitelistKeywords.some(keyword => title.includes(keyword)) ||
                allPassPatterns.some(pattern => pattern.test(title));

            const shouldShadow =
                !inWhitelist &&
                (allBlacklistKeywords.some(keyword => title.includes(keyword)) ||
                    allBlockPatterns.some(pattern => pattern.test(title)));

            if (shouldShadow) {
                console.log(title);
                $(this).remove();
            }
        }
    });
})();
