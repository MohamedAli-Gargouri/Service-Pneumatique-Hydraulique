import { toast } from 'react-toastify';
import PropTypes from "prop-types"
export function CreateToast(
  promise,
  Message,
  ResolveMessage,
  PendingMessage,
  DefaultRejectMessage,
  RejectMessages,
  RejectMessageCodes,
  ConnectionErrors,
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
          error: {
            render({data}){
              //Handling Connection Errors//
              //Connection Lost
              if(data.code=="ERR_NETWORK")
              {
                return ConnectionErrors[0]
              }
              // Gateway Timeout, heavy load
              if(data.response.status==504)
              {
                return ConnectionErrors[1]
              }
              //Service Unavailable
              if(data.response.status==503)
              {
                return ConnectionErrors[2]
              }
              //Handling  backened Error//
              //bad request, wrong parameters
              if(data.response.status==400)
              {
                let RejectMessagesIndex=-1
                const backendErrorCode=data.response.data.errorCode
                RejectMessageCodes.map((rejectMessageCode,index)=>{
                  if(rejectMessageCode==backendErrorCode)
                  {
                    RejectMessagesIndex=index
                  }

                    })
                   if(RejectMessagesIndex!=-1)
                   {
                    return RejectMessages[RejectMessagesIndex]
                   }
              }
              //Default Error Message//
              return DefaultRejectMessage
            }
          },
        },
        toastOptions,
      );
      break;
  }
}
CreateToast.prototypes={
  promise:PropTypes.objectOf(Promise).isRequired,
  Message:PropTypes.objectOf(String).isRequired,
  ResolveMessage:PropTypes.objectOf(String).isRequired,
  PendingMessage:PropTypes.objectOf(String).isRequired,
  DefaultRejectMessage:PropTypes.objectOf(String).isRequired,
  RejectMessages:PropTypes.arrayOf(String).isRequired,
  RejectMessageCodes:PropTypes.arrayOf(String).isRequired,
  ConnectionErrors:PropTypes.arrayOf(String).isRequired,
  type:PropTypes.oneOf(["error","info","success","promise"]).isRequired,
  light:PropTypes.bool.isRequired,
}

/*==========================DOCUMENTATION============================================================================================
  promise=> Takes a Promise, if you're using a toast type Info/success/error u can set it to null, wont do anything
  Message => String, takes the message of your Info/success/error tag, you can set it to "" if you're using a promise type,
  ResolveMessage => This is teh resolve message for the promise type,
  PendingMessage => this is teh Pending message when the promise is pending,
  DefaultRejectMessage => This is a fallback error message if it wasn't possible to identify which error message the toast should send,
  RejectMessages => This contains a List with the error messages text, ["Wrong password","Wrong Email"] (The order is important with the RejectMessageCodes),
  RejectMessageCodes => This contains a List with the errors codes ["AUTH_ERROR04","AUTH_ERROR05","AUTH_ERROR06"], if AUTH_ERROR04, it will use the message with index 0 "Wrong Password"
  ConnectionErrors=>This contains a list of basic Connection errors, translated automatically from the parent,
  type =>  Type, either Info,Promise or Success,Error,
  light => if true, toast is gonna be in light mode, false in dark mode.
  =========================================================================================================================================

*/
