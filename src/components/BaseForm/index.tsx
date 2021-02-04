import React from 'react';
import { BaseFormPorps } from '@/components/BaseForm/type';
import { DrawerForm, ModalForm } from '@ant-design/pro-form';
import { message } from 'antd';

function BaseForm<T>(props: BaseFormPorps<T>) {
  return (
    props.type === 'modal' ? <ModalForm<T>
      title={props.title}
      trigger={
        props.triggerRender
      }
      onFinish={async (values) => {
        let resp = await props.onFinish(values);
        console.log(resp);
        message.info('操作成功！');
        return true;
      }}
    >
      {props.children}
    </ModalForm> : <DrawerForm<T>
      title={props.title}
      trigger={
        props.triggerRender
      }
      onFinish={async (values) => {
        await props.onFinish(values);
        message.info('操作成功！');
        return true;
      }}
    >
      {props.children}
    </DrawerForm>);
}

export default BaseForm;
