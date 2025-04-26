import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import { useRenameChannelMutation } from '../api.js';
import { channelSchema } from '../utils/validate.js';

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
                    <FormGroup>
                        <FormControl
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onKeyDown={(e) => e.key === 'Enter' && formik.handleSubmit()}
                            ref={formControlEl}
                            isInvalid={formik.errors.name}
                            disabled={isLoading}
                        />
                        {formik.errors.name && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.name}
                            </Form.Control.Feedback>
                        )}
                        <div className="d-flex justify-content-end mt-3">
                            <Button variant="secondary" className="me-2" onClick={onHide}>
                                {t('channels.cancel')}
                            </Button>
                            <Button type="submit" variant="primary" disabled={isLoading}>
                                {isLoading ? 'Сохранение...' : t('channels.send')}
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RenameModal;
