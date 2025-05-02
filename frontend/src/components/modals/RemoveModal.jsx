import React from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useRemoveChannelMutation } from '../../api.js'

const RemoveModal = ({ onHide }) => {
  const { t } = useTranslation()
  const [removeChannel] = useRemoveChannelMutation()
  const channel = useSelector(state => state.modals.channel)

  const handleRemove = async (id) => {
    try {
      if (channel?.id) {
        await removeChannel(id)
        toast.success(t('channels.deleteChannel'))
        onHide()
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal show="true" onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('channels.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channels.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2" variant="secondary" onClick={onHide}>{t('channels.cancel')}</Button>
          <Button type="submit" variant="danger" onClick={() => handleRemove(channel.id)}>{t('channels.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveModal
