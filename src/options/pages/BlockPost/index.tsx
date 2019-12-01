import * as React from 'react';
import { Input, Form, Icon, Tooltip } from 'antd';
import { onlineStorage } from 'utils/storage';
import { isValidRegexp } from 'utils/regexp';
import { PageLayout } from '../../components';
import SettingRow from '../../components/SettingCard/SettingRow';
import './style.scss';

const { TextArea } = Input;
const { Item: FormItem } = Form;

const BlockPost = () => {
    const [blockSettings, setBlockSettings] = React.useState({
        blockWish: false,
        blockMakeFriends: false,
        blockPostRegexps: '',
    });
    const [errorRegexpStr, setErrorRegexpStr] = React.useState<string>('');

    const updateErrorRegexp = (blockPostRegexps: string) => {
        const regexpStrArray = blockPostRegexps.split('\n').map(regexp => regexp.trim());
        const newErrorRegexpStr = regexpStrArray.find(regexpStr => {
            return !isValidRegexp(regexpStr);
        });
        setErrorRegexpStr(newErrorRegexpStr || '');
    };

    const syncOnlineSetting = React.useCallback(async () => {
        const onlineBlockSettings = await onlineStorage.get({
            blockWish: false,
            blockMakeFriends: false,
            blockPostRegexps: '',
        });
        setBlockSettings(onlineBlockSettings);
        updateErrorRegexp(onlineBlockSettings.blockPostRegexps);
    }, []);

    React.useEffect(() => {
        syncOnlineSetting();
    }, [syncOnlineSetting]);

    const getSettingChangeHandler = (key: keyof typeof blockSettings) => {
        return (checked: boolean) => {
            setBlockSettings({ ...blockSettings, [key]: checked });
            onlineStorage.set({ [key]: checked });
        };
    };

    const handleChangeRules = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBlockPostRegexps = event.target.value;
        updateErrorRegexp(newBlockPostRegexps);
        setBlockSettings({ ...blockSettings, blockPostRegexps: newBlockPostRegexps });
        onlineStorage.set({ blockPostRegexps: newBlockPostRegexps });
    };

    const customRulesLabel = React.useMemo(() => {
        return (
            <span>
                自定义规则：
                <Tooltip title="每一行都是一规则，每个规则就是一个正则表达式，当一个帖子标题匹配任意一个规则时将被屏蔽">
                    <Icon className="question-icon" type="question-circle" theme="filled" />
                </Tooltip>
            </span>
        );
    }, []);

    return (
        <PageLayout className="block-post" contentClassName="block-post-content" title="屏蔽帖子设置" backTo="/">
            <SettingRow
                label="屏蔽许愿贴"
                extraType="switch"
                checked={blockSettings.blockWish}
                onChange={getSettingChangeHandler('blockWish')}
            />
            <SettingRow
                label="屏蔽交友贴"
                extraType="switch"
                checked={blockSettings.blockMakeFriends}
                onChange={getSettingChangeHandler('blockMakeFriends')}
            />
            <FormItem className="custom-rules-container" label={customRulesLabel}>
                <TextArea
                    className="custom-rules-textarea"
                    rows={4}
                    value={blockSettings.blockPostRegexps}
                    onChange={handleChangeRules}
                />
                {errorRegexpStr && (
                    <p className="error-message">
                        不合法的规则：
                        {errorRegexpStr}
                    </p>
                )}
            </FormItem>
        </PageLayout>
    );
};

export default BlockPost;
