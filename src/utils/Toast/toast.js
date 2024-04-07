import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import TranslatedText from '../../utils/Translation';

export class Notify {
  /**
   *  Creates a promise Toast message.
   * @param {Promise} promise  The Promise
   * @param {Array<String>} RejectMessages Array of Custom Promise Reject Messages
   * @param {Array<String>} RejectMessageCodes Array of Custom Message Response Code (THIS CODE IS COMING FROM THE BACKENED)
   * @param {Boolean} light Toggles the dark or light mode for the toast
   */
  static displayPromiseNotification(
    promise,
    RejectMessages,
    RejectMessageCodes,
    light,
  ) {
    const ConnectionErrors = [
      ReactDOMServer.renderToStaticMarkup(
        <TranslatedText TranslationPath="UCP.DialogMessages.Connection.ConnectionLost" />,
      ),
      ReactDOMServer.renderToStaticMarkup(
        <TranslatedText TranslationPath="UCP.DialogMessages.Connection.ServerLoaded" />,
      ),
      ReactDOMServer.renderToStaticMarkup(
        <TranslatedText TranslationPath="UCP.DialogMessages.Connection.ServiceUnavaiable" />,
      ),
    ];
    const DefaultRejectMessage = ReactDOMServer.renderToStaticMarkup(
      <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Reject" />,
    );
    const DefaultPendingMessage = ReactDOMServer.renderToStaticMarkup(
      <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
    );
    const DefaultResolveMessage = ReactDOMServer.renderToStaticMarkup(
      <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Resolve" />,
    );
    const MdScreen = 720;
    const currentWindowWidth = window.innerWidth;
    const toastOptions = {
      position:
        currentWindowWidth < MdScreen ? 'bottom-center' : 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: light ? 'light' : 'dark',
    };

    toast.promise(
      promise,
      {
        pending: DefaultPendingMessage,
        success: DefaultResolveMessage,
        error: {
          render({ data }) {
            //Handling Connection Errors//
            //Connection Lost
            if (data.code == 'ERR_NETWORK') {
              return ConnectionErrors[0];
            }
            // Gateway Timeout, heavy load
            if (data.response.status == 504) {
              return ConnectionErrors[1];
            }
            //Service Unavailable
            if (data.response.status == 503) {
              return ConnectionErrors[2];
            }
            //Handling  backened Error//
            //bad request, wrong parameters
            if (data.response.status == 400) {
              let RejectMessagesIndex = -1;
              const backendErrorCode = data.response.data.errorCode;
              RejectMessageCodes.map((rejectMessageCode, index) => {
                if (rejectMessageCode == backendErrorCode) {
                  RejectMessagesIndex = index;
                }
              });
              if (RejectMessagesIndex != -1) {
                return RejectMessages[RejectMessagesIndex];
              }
            }
            //Default Error Message//
            return DefaultRejectMessage;
          },
        },
      },
      toastOptions,
    );
  }
  /**
   * Creates a simple message toast
   * @param {String} Message Message of the toast
   * @param {error | info | success} type  Specifies the type of the toast
   * @param {*} light Toggles the dark or light mode for the toast
   */
  static displayNotification(Message, type, light) {
    const MdScreen = 720;
    const currentWindowWidth = window.innerWidth;
    const toastOptions = {
      position:
        currentWindowWidth < MdScreen ? 'bottom-center' : 'bottom-right',
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
    }
  }
  // displayPromiseNotification.prototypes = {
  //   promise: PropTypes.objectOf(Promise).isRequired,
  //   RejectMessages: PropTypes.arrayOf(String).isRequired,
  //   RejectMessageCodes: PropTypes.arrayOf(String).isRequired,
  //   light: PropTypes.bool.isRequired,
  // };

  // displayNotification.prototypes = {
  //   Message: PropTypes.objectOf(String).isRequired,
  //   type: PropTypes.oneOf(['error', 'info', 'success']).isRequired,
  //   light: PropTypes.bool.isRequired,
  // };
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
