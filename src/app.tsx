import {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {history} from 'umi';
import {queryCurrentByLocal} from './services/user';
import defaultSettings from '../config/default.settings';

/*
* 配置初始化状态 当前用户
* */
export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  permissions?: any;
  settings?: LayoutSettings;
}> {
  if (history.location.pathname !== '/user/login') {
    try {
      const currentUser = queryCurrentByLocal();
      return {
        currentUser,
        permissions: '',
        settings: defaultSettings,
      };
    } catch (error) {
      history.push('/user/login');
    }
  }
  return {
    settings: defaultSettings,
  };
}
