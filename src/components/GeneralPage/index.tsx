import React, {useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {GeneralEventType, GenralPageProps} from '@/components/GeneralPage/type';
import {Button, Popconfirm, Space} from 'antd';
import {PlusOutlined,} from '@ant-design/icons/lib';
import {
  ModalForm, DrawerForm
} from '@ant-design/pro-form';

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


function GeneralPage<T>(props: GenralPageProps<T>) {

  const [selectRows, setSelectRows] = useState([]);


  const tConfig: Record<string, any> = {
    rowKey: 'id',
    search: {
      labelWidth: 'auto',
    },
    pagination: {
      pageSize: 5,
    },
    headerTitle: '',
    dateFormatter: 'string',
    toolBarRender: () => {
      return props.formType === 'Model' ? <ModalForm<T>
        title={`新建${props.prefix}`}
        trigger={
          <Button type="primary">
            <PlusOutlined/>
            新建
          </Button>
        }
        onFinish={async (values) => {
          await props.looper.looper(GeneralEventType.ADD, values)
          return true;
        }}
      >
        {props.formRender ? props.formRender() : ""}
      </ModalForm> : <DrawerForm<T>
        title={`新建${props.prefix}`}
        trigger={
          <Button type="primary">
            <PlusOutlined/>
            新建
          </Button>
        }
        onFinish={async (values) => {
          await props.looper.looper(GeneralEventType.ADD, values)
          return true;
        }}
      >
        {props.formRender ? props.formRender() : ""}

      </DrawerForm>
    },
    rowSelection: {
      onChange: (selectedRowKeys: any) => {
        setSelectRows(selectedRowKeys)
      },
    },
    tableAlertRender: ({selectedRowKeys, selectedRows, onCleanSelected}: any) => {
      return <Space size={24}>
                <span>已选{selectedRowKeys.length}项
                  <a style={{marginLeft: 8}}
                     onClick={onCleanSelected}>
                    取消选择
                  </a>
                </span>
      </Space>
    },
    tableAlertOptionRender: () => {
      return (
        <Popconfirm
          title="确定删除所选项吗？"
          okText="删除"
          onConfirm={() => props.looper.looper(GeneralEventType.DELETES, selectRows)}
          cancelText="取消">
          <Button danger
                  type="link"
                  style={{marginLeft: '20px'}}
          >
            删除选择
          </Button>
        </Popconfirm>
      );
    },
    request: async (params: any) => {
      return props.looper.looper(GeneralEventType.SEARCH, params);
    }
  };


  return <PageContainer
    {...props.pageConfig}>
    <ProTable<T>
      {...tConfig}
      {...props.tableConfig}
    />
    {props.children}
  </PageContainer>;
}

export default GeneralPage;
