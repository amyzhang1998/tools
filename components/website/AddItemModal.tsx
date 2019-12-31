import React, { forwardRef, memo, useCallback } from 'react';
import createOpen, { ModalBaseProps } from '../../utils/modal';
import { Form, Input, message, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { addWebsiteItem } from '../../services/website';

interface AddItemModalBaseProps {
  groupId: string;
}

type AddItemModalProps = AddItemModalBaseProps & ModalBaseProps & FormComponentProps;

const AddItemModal = Form.create()(
  memo<AddItemModalProps>(
    forwardRef(function(props: AddItemModalProps, ref: any) {
      const { onClose, visible, afterClose, groupId, modal, form } = props;
      const { getFieldDecorator, validateFields } = form;

      const handleSubmit = useCallback(() => {
        validateFields(async (error, value) => {
          if (error) {
            return;
          }
          await addWebsiteItem(value, groupId);
          message.success('添加成功');
          modal.close();
        });
      }, [validateFields, groupId, modal]);

      return (
        <Modal
          ref={ref}
          title="添加网址"
          onCancel={onClose}
          onOk={handleSubmit}
          visible={visible}
          afterClose={afterClose}
        >
          <Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item label="图标地址">
              {getFieldDecorator('logo', {
                rules: [
                  { required: true, message: '请输入图标地址' },
                  { type: 'url', message: '地址不合法' }
                ]
              })(<Input placeholder="请输入图标地址" />)}
            </Form.Item>
            <Form.Item label="网站名称">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请输入网站名称' },
                  { max: 20, message: '长度不能超过20' }
                ]
              })(<Input placeholder="请输入网站名称" />)}
            </Form.Item>
            <Form.Item label="网站地址">
              {getFieldDecorator('url', {
                rules: [
                  { required: true, message: '请输入网站地址' },
                  { type: 'url', message: '地址不合法' }
                ]
              })(<Input placeholder="请输入网站地址" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    })
  )
);

export default AddItemModal;

export const open = (groupId: string) => {
  const fn = createOpen(AddItemModal as any);
  return fn({ groupId });
};
