import allReducers from 'redux/reducers';
import { ToastPosition } from 'react-toastify';
export type RootState = ReturnType<typeof allReducers>;
export type toastOptionsType = {
  position: ToastPosition;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: any;
  theme: 'light' | 'dark';
};
export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// export enum ScreenSize {
//   'xs' = 'xs',
//   'sm' = 'sm',
//   'md' = 'md',
//   'lg' = 'lg',
//   'xl' = 'xl',
// }
