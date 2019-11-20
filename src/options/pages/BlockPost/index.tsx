import * as React from 'react';
import { Input, Form, Icon, Tooltip } from 'antd';
import { onlineStorage } from 'utils/storage';
import { PageLayout } from '../../components';
import SettingRow from '../../components/SettingCard/SettingRow';
import './style.scss';

const { TextArea } = Input;
const { Item: FormItem } = Form;

interface BlockSetting {
    blockWish: boolean;
    blockMakeFriends: boolean;
    blockPostRegexps: string;
}

const BlockPost = () => {
    const [blockSettings, setBlockSettings] = React.useState<BlockSetting>({
        blockWish: false,
        blockMakeFriends: false,
        blockPostRegexps: '',
    });

    const syncOnlineSetting = async () => {
        const onlineBlockSettings = await onlineStorage.get({
            blockWish: false,
            blockMakeFriends: false,
            blockPostRegexps: '',
        });
        setBlockSettings(onlineBlockSettings);
    };

    React.useEffect(() => {
        syncOnlineSetting();
    }, []);

    const getSettingChangeHandler = (key: keyof BlockSetting) => {
        return (checked: boolean, event: MouseEvent) => {
            setBlockSettings({ ...blockSettings, [key]: checked });
            onlineStorage.set({ [key]: checked });
        };
    };

    const handleChangeRules = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const regexps = event.target.value.split('\n').map(regexp => regexp.trim());
        setBlockSettings({ ...blockSettings, blockPostRegexps: event.target.value });
        onlineStorage.set({ blockPostRegexps: regexps.join('\n') });
    };

    const customRulesLabel = (
        <span>
            自定义规则：
            <Tooltip title="每一行字符串表示用于匹配需要屏蔽的帖子的标题的正则表达式">
                <Icon className="question-icon" type="question-circle" theme="filled" />
            </Tooltip>
        </span>
    );

    return (
        <PageLayout className="block-post" contentClasses="block-post-content" title="屏蔽帖子设置" backTo="/">
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
            </FormItem>
        </PageLayout>
    );
};

export default BlockPost;
