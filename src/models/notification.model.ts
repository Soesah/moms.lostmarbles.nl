export enum NotificationType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}
export interface Notification {
  uuid: string;
  type: NotificationType;
  text: string;
}
