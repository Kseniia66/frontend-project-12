import React from 'react';
import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import { useRenameChannelMutation } from '../../api.js';
import { channelSchema } from '../../utils/validate.js';

const RenameModal = ({ show, onHide, channel, channels }) => {
    const { t } = useTranslation();
    const [renameChannel, { isLoading }] = useRenameChannelMutation();
    const formControlEl = useRef(null);

    const channelsNames = channels.map((channel) => channel.name);

    const formik = useFormik({
        initialValues: { name: channel.name },
        validationSchema: channelSchema(t, channelsNames),
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                await renameChannel({
                    id: channel.id,
                    name: values.name.trim()
                }).unwrap();
                toast.success(t('channels.renamedChannel'));
                onHide();
            } catch (error) {
                console.error('Ошибка при переименовании канала:', error);
            }
            formik.resetForm();
        },
    });

    useEffect(() => {
        formControlEl.current?.focus();
        formControlEl.current?.select();
    }, []);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <FormGroup controlId="name">
                        <FormControl
                            name="name"
                            className="mb-2"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            ref={formControlEl}
                            isInvalid={formik.errors.name}
                            disabled={isLoading}
                        />
                        <Form.Label className="visually-hidden">{t('channels.nameChannel')}</Form.Label>
                        {formik.errors.name &&
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.name}
                            </Form.Control.Feedback>
                        }
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={onHide}>
                                {t('channels.cancel')}
                            </Button>
                            <Button type="submit" variant="primary" disabled={isLoading}>
                                {t('channels.send')}
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RenameModal;
