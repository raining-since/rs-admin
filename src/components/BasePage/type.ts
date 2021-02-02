import { PageContainerProps } from '@ant-design/pro-layout';

export interface BaseLooper {
  looper: (type: string, params: any) => any;
}

export  type BasePageProps<T> = {
  pageConfig: PageContainerProps,
  children: any,
  tableConfig: Record<string, any>,
  looper: BaseLooper
}

