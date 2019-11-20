import * as React from 'react';
import { Input, Form, Switch } from 'antd';
import { onlineStorage } from 'utils/storage';
import { PageLayout } from '../../components';
import './style.scss';

const { Item: FormItem } = Form;
const { TextArea } = Input;

const AutoClock = () => {
    const [autoClock, setAutoClock] = React.useState(false);
    const [feeling, setFeeling] = React.useState('');

    React.useEffect(() => {
        onlineStorage
            .get({ autoClock: false, feeling: '' })
            .then(({ autoClock: onlineAutoClock, feeling: onlineFeeling }) => {
                setAutoClock(onlineAutoClock);
                setFeeling(onlineFeeling);
            });
    }, []);

    const handleToggle = React.useCallback((checked: boolean) => {
        onlineStorage.set({ autoClock: checked }).then(() => {
            setAutoClock(checked);
            chrome.runtime.sendMessage({ from: 'options', action: `${checked ? 'enable' : 'disable'}-auto-clock` });
        });
    }, []);

    const handleChangeContent = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = event.target.value;
        setFeeling(content);
        onlineStorage.set({ feeling: content });
    }, []);

    return (
        <PageLayout className="auto-clock" title="设置自动打卡" backTo="/">
            <div className="switch-wrapper">
                <span>是否开启自动打卡</span>
                <Switch checked={autoClock} onChange={handleToggle} />
            </div>
            <FormItem className="share-content-wrapper" label="分享内容">
                <TextArea className="share-content-input" rows={4} value={feeling} onChange={handleChangeContent} />
            </FormItem>
        </PageLayout>
    );
};

export default AutoClock;
