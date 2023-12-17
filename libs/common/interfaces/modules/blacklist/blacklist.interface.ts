export interface IUpdateBlackListIp {
  listIp: string[];
}

export type IDeleteBlackListIp = IUpdateBlackListIp;

export interface IBlackListMember {
  username?: string;
  detail?: string | null;
}
