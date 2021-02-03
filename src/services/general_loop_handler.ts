import { BaseLooper } from '@/components/BasePage/type';
import { GeneralEventType } from '@/components/GeneralPage/type';
import request from '@/utils/request';

abstract class GeneralLoopHandler implements BaseLooper {

  abstract path: string;

  looper(type: string, params: any): any {
    switch (type) {
      case GeneralEventType.ADD:
        return this.addData(params);
      case GeneralEventType.UPDATE:
        return this.updataData(params);
      case GeneralEventType.DELETE:
        return this.deleteData(params);
      case GeneralEventType.DELETES:
        return this.deleteDataWithSelect(params);
      case GeneralEventType.SEARCH:
        return this.loadDataWithPage(params);
    }
  }

  async loadDataWithPage(params: any) {
    return request.get(`/api/v1/${this.path}`, { params: params });
  }

  async addData(params: any) {
    return request.post(`/api/v1/${this.path}`, { data: params });
  }

  async deleteData(params: any) {
    return request.delete(`/api/v1/${this.path}/${params}`);
  }

  async updataData(params: any) {
    return request.put(`/api/v1/${this.path}`, { data: params });
  }

  async deleteDataWithSelect(params: any) {
    return request.delete(`/api/v1/${this.path}`, { data: params });
  }

}

export default GeneralLoopHandler;
