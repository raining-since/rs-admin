import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import BaseTable from '@/components/BaseTable';

const HomePage: React.FC = ({ children }) => {

  return <div>
    <PageContainer
      title="标准页面"
      breadcrumb={{
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
      }}
      content="欢迎使用 ProLayout 组件"
    >
      <BaseTable/>
      {children}
    </PageContainer>
  </div>;
};

export default HomePage;
