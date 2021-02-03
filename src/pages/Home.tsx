import React from 'react';
import GeneralPage from '@/components/GeneralPage';
import { PageContainerProps } from '@ant-design/pro-layout';
import { ProColumns } from '@ant-design/pro-table';
import { Space, Tag } from 'antd';
import { createInstance } from '@/utils/utils';
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form';
import GeneralLoopHandler from '@/services/general_loop_handler';


/*
* 标准的通用页面
* 1. 数据类型
* 2. Looper 处理器
* 3. table 列配置
* 4. 页面信息配置
* 5. 表单组件配置
* */

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

class HomeAdapter extends GeneralLoopHandler {
  path: string = '';
}

const adapter = createInstance(HomeAdapter);

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
];

const pageConfig: PageContainerProps = {
  title: '标准页面',
  breadcrumb: {
    routes: [
      {
        path: '',
        breadcrumbName: '一级页面',
      },
      {
        path: '',
        breadcrumbName: '二级页面',
      },
      {
        path: '',
        breadcrumbName: '当前页面',
      },
    ],
  },
  content: '欢迎使用 ProLayout 组件',
};

const tConfig: Record<string, any> = {
  columns: columns,
};

const renderForm = (data: any) => {
  return <ProForm.Group>
    <ProFormText
      width="md"
      name="name"
      label="签约客户名称"
      initialValue={data ? data.id : ''}
      tooltip="最长为 24 位"
      placeholder="请输入名称"
    />
    <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>
  </ProForm.Group>;
};

const HomePage: React.FC = ({ children }) => {
  return <GeneralPage<GithubIssueItem>
    prefix="组件"
    pageConfig={pageConfig}
    tableConfig={tConfig}
    looper={adapter}
    isOptions={true}
    formRender={renderForm}
  >
    {children}
  </GeneralPage>;
};


export default HomePage;
