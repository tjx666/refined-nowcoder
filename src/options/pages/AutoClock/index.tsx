import * as React from 'react';
import { Input, Form, Switch } from 'antd';
import { onlineStorage } from 'utils/storage';
import { PageLayout } from '../../components';
import './style.scss';

const { Item: FormItem } = Form;
const { TextArea } = Input;

const AutoClock = () => {
    const [autoClock, setAutoClock] = React.useState(false);
    const [clockContent, setClockContent] = React.useState('');

    React.useEffect(() => {
        onlineStorage
            .get({ autoClock: false, clockContent: '' })
            .then(({ autoClock: onlineAutoClock, clockContent: onlineClockContent }) => {
                setAutoClock(onlineAutoClock);
                setClockContent(onlineClockContent);
            });
    }, []);

    const handleToggle = React.useCallback((checked: boolean) => {
        onlineStorage.set({ autoClock: checked }).then(() => {
            setAutoClock(checked);
        });
    }, []);

    const handleChangeContent = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = event.target.value;
        setClockContent(content);
        onlineStorage.set({ clockContent: content });
    }, []);

    return (
        <div className="auto-clock">
            <PageLayout title="设置自动打卡" backTo="/">
                <div className="switch-wrapper">
                    <span>是否开启自动打卡</span>
                    <Switch checked={autoClock} onChange={handleToggle} />
                </div>
                <FormItem className="share-content-wrapper" label="分享内容">
                    <TextArea
                        className="share-content-input"
                        rows={4}
                        value={clockContent}
                        onChange={handleChangeContent}
                    />
                </FormItem>
            </PageLayout>
        </div>
    );
};

export default AutoClock;
