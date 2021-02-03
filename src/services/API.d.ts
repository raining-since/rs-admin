declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
    token?: string
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
  }

  export interface GeneralData {
    id: string
    remark: string
    createDate: string
    updateDate: string
    updateBy: string
    createBy: string
    sort: string
    deleted: string
    current: string
    step: string
  }
}
