export enum NotificationType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export const delays: { [key in NotificationType]: number } = {
  info: 2000,
  success: 2500,
  warning: 4500,
  error: 5500,
};

export interface Notification {
  uuid: string;
  type: NotificationType;
  text: string;
}
