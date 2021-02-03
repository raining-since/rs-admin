import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { BasePageProps } from '@/components/BasePage/type';
import ProCard from '@ant-design/pro-card';

/*
* 基础页面
*
* 页面配置信息
*   1. 所有参数自定义定制
*
* 页面逻辑处理
*   1. 添加基础 BaseLooper 处理业务逻辑
*
* */

function BasePage<T>(props: BasePageProps<T>) {
  return <PageContainer
    {...props.pageConfig}>
    <ProCard>
      <ProTable<T>
        {...props.tableConfig}
      />
      {props.children}
    </ProCard>
  </PageContainer>;
}

export default BasePage;
