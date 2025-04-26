import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { activeChannelSelector } from '../store/channelsSlice.js';
import MessageForm from './MessageForm.jsx';
import useAuth from '../store/useAuth.jsx';
import { useGetMessagesQuery, useAddMessageMutation } from '../api.js';

const MessageBox = () => {
    const { t } = useTranslation();
    const { data: messages = [] } = useGetMessagesQuery();
    const [addMessage] = useAddMessageMutation();
    const activeChannel = useSelector(activeChannelSelector);
    const messagesEl = useRef(null);
    const { username } = useAuth();

    const messagesOfChannel = messages.filter((message) => message.channelId === activeChannel.id);
    const countMessages = messagesOfChannel?.length || 0;

    useEffect(() => {
        messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
    }, [messagesOfChannel]);

    return (
        <div className='col p-0 h-100'>
            <div className='d-flex flex-column h-100'>
                <div className='bg-light mb-4 p-3 shadow-sm small'>
                    <p className='m-0'>
                        <b>
                            {'# '}
                            {filter.clean(activeChannel.name)}
                        </b>
                    </p>
                    <span className='text-muted'>
                        {t('countMessage.messages', { count: countMessages })}
                    </span>
                </div>
                <div id='messages-box' className='flex-grow-1 overflow-auto px-5 bg-white' ref={messagesEl}>
                    {messagesOfChannel?.map((message) => (
                        <div key={message.id} className='text-break mb-2'>
                            <b>{message.username}</b>
                            {`: ${message.body}`}
                        </div>
                    ))}
                </div>
                <MessageForm
                    activeChannelId={activeChannel.id}
                    username={username}
                    addMessage={addMessage}
                />
            </div>
        </div>
    )
};

export default MessageBox;
