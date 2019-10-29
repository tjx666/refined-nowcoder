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

            const configItemKeys: (keyof ShadowConfigItem)[] = [
                'blacklistKeywords',
                'whitelistKeywords',
                'passPatterns',
                'blockPatterns',
            ];

            const [allBlacklistKeywords, allWhitelistKeywords, allPassPatterns, allBlockPatterns] = configItemKeys.map(
                key =>
                    Object.values(shadowConfigs).reduce((all: (string | RegExp)[], config) => {
                        if (key === 'blacklistKeywords') {
                            return [...all, ...config.blacklistKeywords];
                        }
                        return config[key] ? [...all, ...config[key]!] : all;
                    }, [])
            ) as [string[], string[], RegExp[], RegExp[]];

            const inWhitelist =
                allWhitelistKeywords.some(keyword => title.includes(keyword)) ||
                allPassPatterns.some(pattern => pattern.test(title));

            const shouldShadow =
                !inWhitelist &&
                (allBlacklistKeywords.some(keyword => title.includes(keyword)) ||
                    allBlockPatterns.some(pattern => pattern.test(title)));

            shouldShadow && $(this).remove();
        }
    });
})();
