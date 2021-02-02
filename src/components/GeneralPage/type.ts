import {BaseLooper, BasePageProps} from '@/components/BasePage/type';

export interface GeneralLooper extends BaseLooper {

}

export interface GenralPageProps<T> extends BasePageProps<T> {
  isOptions: boolean,
  prefix: string,
  formType?: string,
  formRender?: (data?: T) => JSX.Element;
}


export enum GeneralEventType {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
  DELETES = 'deletes',
  SEARCH = 'search'
}
