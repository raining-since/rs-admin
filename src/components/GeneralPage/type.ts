import { BaseLooper } from '@/components/BasePage/type';

export interface GeneralLooper extends BaseLooper {

}

export enum GeneralEventType {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
  DELETES = 'deletes',
  SEARCH = 'search'
}
