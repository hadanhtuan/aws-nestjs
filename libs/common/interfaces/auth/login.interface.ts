import { DeviceType } from '@lib/common/enums';

export interface ILoginPayload {
  loginPayload: { username: string; password: string };
  fingerPrint: IFingerPrint;
  validateRoles: string[];
}

export interface IFingerPrint {
  ipAddress: string;
  deviceId: string;
  deviceType: DeviceType;
  userAgent: string;
  country: string;
}

export interface IUpdatePassword {
  id: string;
  fingerPrint: IFingerPrint;
  oldPassword: string;
  newPassword: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister extends ILogin {
  email?: string;
  age?: number;
}
