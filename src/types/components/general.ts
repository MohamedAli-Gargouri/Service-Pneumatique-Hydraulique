import allReducers from '#/redux/reducers';
import { ToastPosition } from 'react-toastify';

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

export type RootState = ReturnType<typeof allReducers>;
