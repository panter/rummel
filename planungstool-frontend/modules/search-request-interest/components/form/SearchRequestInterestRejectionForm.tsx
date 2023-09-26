import React from 'react';
import { Form, Input, Modal } from 'antd';

interface Values {
  rejectionReason?: string;
}

interface SearchRequestInterestRejectionFormProps {
  open: boolean;
  onCreate: (reason: Values) => void;
  onCancel: () => void;
}

export const SearchRequestInterestRejectionForm: React.FC<
  SearchRequestInterestRejectionFormProps
> = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Ablehnung"
      okText="Ablehnen"
      cancelText="Abbrechen"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            // eslint-disable-next-line no-console
            console.info('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item name="reason" label="Ablehnungsgrund">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
