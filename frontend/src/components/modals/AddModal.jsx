import React from 'react'
import { useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAddChannelMutation, useGetChannelsQuery } from '../../api.js'
import { channelSchema } from '../../utils/validate.js'
import { selectActiveTab } from '../../store/channelsSlice.js'

const AddModal = ({ show, onHide }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [addChannel] = useAddChannelMutation()
  const { data: channels = [] } = useGetChannelsQuery()
  const formControlEl = useRef(null)

  const channelsNames = channels.map(channel => channel.name)

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelSchema(t, channelsNames),
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await addChannel({ name: values.name.trim() }).unwrap()
        const createdChannel = response.data || response

        dispatch(selectActiveTab({
          id: createdChannel.id,
          name: createdChannel.name,
          removable: createdChannel.removable,
        }))
        toast.success(t('channels.createChannel'))
        resetForm()
        onHide()
      }
      catch (error) {
        console.error('Ошибка при создании канала:', error)
      }
    },
  })

  useEffect(() => {
    if (show) {
      formControlEl.current?.focus()
    }
  }, [show])

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              name="name"
              id="name"
              className="mb-2"
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={formControlEl}
              isInvalid={formik.errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('channels.nameChannel')}</Form.Label>
            {formik.errors.name
              && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2" variant="secondary" onClick={onHide}>{t('channels.cancel')}</Button>
              <Button type="submit" variant="primary">{t('channels.send')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddModal
