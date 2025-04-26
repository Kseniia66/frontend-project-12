import React from 'react';
import { Nav, Button, Dropdown, Modal } from 'react-bootstrap';
import { useGetChannelsQuery, useRemoveChannelMutation } from '../api';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { selectActiveTab, activeChannelSelector, defaultChannelSelector } from '../store/channelsSlice.js';
import AddModal from './AddModal.jsx';
import RenameModal from './RenameModal.jsx';
import RemoveModal from './RemoveModal.jsx';
import { closeModal, openModal } from '../store/modalSlices.js';

const Channels = () => {
    const { t } = useTranslation();
    const { data: channels = [] } = useGetChannelsQuery();
    const dispatch = useDispatch();
    const channelRef = useRef(null);
    const activeChannel = useSelector(activeChannelSelector);
    const defaultChannel = useSelector(defaultChannelSelector);
    const modals = useSelector((state) => state.modals) || {};

    const variant = (channel) => (channel.id === activeChannel.id ? 'secondary' : '');

    const hideModal = () => dispatch(closeModal());
    const showModal = (type, channel) => dispatch(openModal({ type, channel }));

    const [removeChannel] = useRemoveChannelMutation();
    const handleRemove = async (channel) => {
        try {
            await removeChannel(channel.id).unwrap();
            if (activeChannel?.id === channel.id) {
                dispatch(selectActiveTab(defaultChannel));
            }
        } catch (error) {
            console.error('Ошибка при удалении канала:', error);
        }
    };
    useEffect(() => {
        if (channels.length > 0 && !activeChannel?.id) {
            const generalChannel = channels.find(c => c.name === 'general');
            dispatch(selectActiveTab(generalChannel || channels[0]));
        }
    }, [channels, activeChannel, dispatch]);

    useEffect(() => {
        if (channelRef.current && activeChannel?.id) {
            channelRef.current.scrollTo({
                top: activeChannel.id === defaultChannel.id ? 0 : channelRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [activeChannel, defaultChannel]);

    const removableChannel = (channel) => (
        <Dropdown role='group' className='d-flex dropdown btn-group'>
            <Button className='w-100 rounded-0 text-start text-truncate'
                variant={variant(channel)}
                onClick={() => dispatch(selectActiveTab(channel))}
            >
                <span className='me-1'># </span>
                {filter.clean(channel.name)}
            </Button>
            <Dropdown.Toggle className='flex-grow-0 dropdown-toggle-split' variant={variant(channel)}>
                <span className='visually-hidden'>Управление каналом</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item role='button' onClick={() => showModal('removing', channel)}>{t('channels.remove')}</Dropdown.Item>
                <Dropdown.Item role='button' onClick={() => showModal('renaming', channel)}>{t('channels.rename')}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );

    const notRemovableChannel = (channel) => (
        <Button
            type='button'
            className='w-100 rounded-0 text-start text-truncate'
            variant={variant(channel)}
            onClick={() => dispatch(selectActiveTab(channel))}
        >
            <span className='me-1'># </span>
            {channel.name}
        </Button>
    )

    return (
        <div className='d-flex flex-column h-100'>
            <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                <b>Каналы</b>
                <Button
                    type='button'
                    className='p-0 text-primary btn btn-group-vertical'
                    onClick={() => showModal('adding', null)}
                    variant="link"
                >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width={20} height={20} fill='currentColor'>
                        <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z' />
                        <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4' />
                    </svg>
                    <span className='visually-hidden'>+</span>
                </Button>
            </div>
            <Nav
                as='ul'
                id='channels-box'
                className='flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
                ref={channelRef}
            >
                {channels.map((channel) => {
                    return (
                        <Nav.Item as='li' key={`channel-${channel.id}`} className='w-100'>
                            {channel.removable ? removableChannel(channel) : notRemovableChannel(channel)}
                        </Nav.Item>
                    )
                })}
            </Nav>
            {modals.type === 'adding' && <AddModal show={modals.type === 'adding'} onHide={hideModal} />}
            {modals.type === 'renaming' && <RenameModal show onHide={hideModal} channel={modals.channel} channels={channels} />}
            {modals.type === 'removing' && <RemoveModal show onHide={hideModal} channel={modals.channel} onRemove={handleRemove} />}
        </div>
    );
};

export default Channels;
