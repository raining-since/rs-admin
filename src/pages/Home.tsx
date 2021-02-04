import React from 'react';
import GeneralPage from '@/components/GeneralPage';
import { PageContainerProps } from '@ant-design/pro-layout';
import { ProColumns } from '@ant-design/pro-table';
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

export interface UserData extends API.GeneralData {
  name: string
  phone: string
  password: string
  account: string
}

class HomeAdapter extends GeneralLoopHandler {
  path: string = 'sysUser';
}

const adapter = createInstance(HomeAdapter);

const columns: ProColumns<UserData>[] = [
  {
    title: '名称',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    ellipsis: true,
  },
  {
    title: '账号',
    dataIndex: 'account',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    ellipsis: true,
    hideInSearch: true,
  },
];

const pageConfig: PageContainerProps = {
  title: '用户管理',
  breadcrumb: {
    routes: [
      {
        path: '',
        breadcrumbName: '系统管理',
      },
      {
        path: '',
        breadcrumbName: '用户管理',
      },
    ],
  },
  content: '用户管理页面，用来管理平台用户。我们提供了 新增,修改,查询,删除,批量删除的功能，方便您对平台用户进行管理操作。',
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
      initialValue={data ? data.name : ''}
      tooltip="最长为 24 位"
      placeholder="请输入名称"
    />
    <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>
  </ProForm.Group>;
};

const HomePage: React.FC = ({ children }) => {
  return <GeneralPage<UserData>
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
