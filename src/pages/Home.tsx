import React from 'react';
import GeneralPage from '@/components/GeneralPage';
import {PageContainerProps} from '@ant-design/pro-layout';
import {ProColumns} from '@ant-design/pro-table';
import {Space, Tag} from 'antd';
import {createInstance} from '@/utils/utils';
import request from 'umi-request';
import {GeneralEventType, GeneralLooper} from '@/components/GeneralPage/type';

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

class MyAdapter implements GeneralLooper {
  looper(type: string, params: any): any {
    console.log(type);
    console.log(params);
    if (type == GeneralEventType.SEARCH) {
      return request<{
        data: GithubIssueItem[];
      }>('https://proapi.azurewebsites.net/github/issues', {
        params,
      });
    }
  }
}

const adapter = createInstance(MyAdapter);

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
      all: {text: '全部', status: 'Default'},
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
    renderFormItem: (_, {defaultRender}) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({name, color}) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  }
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

const HomePage: React.FC = ({children}) => {
  return <GeneralPage<GithubIssueItem>
    prefix="组件"
    pageConfig={pageConfig}
    tableConfig={tConfig}
    looper={adapter}
    isOptions={true}
  >
    {children}
  </GeneralPage>;
};


export default HomePage;
