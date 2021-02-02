import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { BasePageProps } from '@/components/BasePage/type';
import { GeneralEventType } from '@/components/GeneralPage/type';
import { Button, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons/lib';

/*
* 在 BasePage 基础之上添加标准的增删改查功能，标准化通用页面
*
* 页面配置信息
* 一、页面布局
*   1. 面包屑配置
*   2. 页面标题
*   3. 页面描述
* 二、页面数据表
*   1. 筛选条件
*   2. 选项操作
*   3. 表格内容
*   4. 表格分页
* 三、弹窗表单
*   1. 新增表单
*   2. 更新表单
*
* 页面逻辑配置
* 一、内容选项操作
*   1. 新增
*   2. 修改
*   3. 删除
*   4. 批量删除
*   4. 分页查询
* */


function GeneralPage<T>(props: BasePageProps<T>) {

  // const { selectRows, setSelectRows } = useState([]);

  const tConfig: Record<string, any> = {
    rowKey: 'id',
    search: {
      labelWidth: 'auto',
    },
    form: {
      syncToUrl: (values: any, type: any) => {
        if (type === 'get') {
          return {
            ...values,
            created_at: [values.startTime, values.endTime],
          };
        }
        return values;
      },
    },
    pagination: {
      pageSize: 5,
    },
    headerTitle: '',
    dateFormatter: 'string',
    toolBarRender: () => [
      <Button key="button" icon={<PlusOutlined/>} type="primary">新建</Button>,
    ],
    rowSelection: {
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
    },
    tableAlertRender: ({ selectedRowKeys, selectedRows, onCleanSelected }: any) => (
      <Space size={24}>
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
      </Space>
    ),
    tableAlertOptionRender: () => {
      return (
        <Popconfirm
          title="确定删除所选项吗？"
          okText="删除"
          onConfirm={() => props.looper.looper(GeneralEventType.DELETES, '')}
          cancelText="取消">
          <Button danger
                  style={{ marginLeft: '20px' }}
          >
            <DeleteOutlined/>
            删除选择
          </Button>
        </Popconfirm>
      );
    },
  };


  props.tableConfig.columns.push({
    title: '操作',
    valueType: 'option',
    render: (text: string, record: any, _: any, action: any) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        修改
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        删除
      </a>,
    ],
  });

  return <PageContainer
    {...props.pageConfig}>
    <ProTable<T>
      {...tConfig}
      {...props.tableConfig}
      request={async (params) => {
        return props.looper.looper(GeneralEventType.SEARCH, params);
      }}
    />
    {props.children}
  </PageContainer>;
}

export default GeneralPage;
