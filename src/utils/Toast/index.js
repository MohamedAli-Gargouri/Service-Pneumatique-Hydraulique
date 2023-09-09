import { toast } from 'react-toastify';

export function CreateToast(
  promise,
  Message,
  ResolveMessage,
  PendingMessage,
  RejectMessage,
  type,
  light,
) {
  const MdScreen = 720;
  const currentWindowWidth = window.innerWidth;
  const toastOptions = {
    position: currentWindowWidth < MdScreen ? 'bottom-center' : 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: light ? 'light' : 'dark',
  };

  switch (type) {
    case 'error':
      toast.error(Message, toastOptions);
      break;
    case 'info':
      toast.info(Message, toastOptions);
      break;
    case 'success':
      toast.success(Message, toastOptions);
      break;
    case 'promise':
      toast.promise(
        promise,
        {
          pending: PendingMessage,
          success: ResolveMessage,
          error: RejectMessage,
        },
        toastOptions,
      );
      break;
  }
}
