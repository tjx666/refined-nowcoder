import axios from 'axios';

const fetchUnreadMessages = async () => {
    const URL = 'https://www.nowcoder.com/nccommon/sns/message/unread-count-v2';
    const { data } = await axios.get(URL, {
        params: {
            token: '',
            _: Date.now(),
        },
    });
    return data;
};

export default () => {};
