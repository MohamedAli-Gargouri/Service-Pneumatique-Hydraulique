import PropTypes from 'prop-types';
import { Notify } from '../../utils/Toast/toast';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import TranslatedText from '../Translation';
export function VerifyInputs(
  TextInputsList,
  EmailInputList,
  SelectInputsList,
  NumbersList,
  PhoneNumbersList,
  PasswordList,
  ConfirmPasswordList,
  IsLightMode,
) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  try {
    //Verifying if any of the text inputs is an empty string
    if (TextInputsList.length > 0) {
      TextInputsList.map((textInputValue) => {
        if (textInputValue == '' || textInputValue == undefined) {
          throw new Error('TextInputEmpty');
        }
      });
    }

    //Verifying if any of the email inputs is follows the Email format
    if (EmailInputList.length > 0) {
      EmailInputList.map((email) => {
        if (emailPattern.test(email) == false) {
          throw new Error('WrongEmailFormat');
        }
      });
    }

    //Verifying if any of the password inputs is follows the password format
    if (PasswordList.length > 0) {
      PasswordList.map((password) => {
        if (passwordPattern.test(password) == false) {
          throw new Error('WrongPasswordFormat');
        }
      });
    }
    //Verifying if any of the Confirm password inputs is different from the password
    if (PasswordList.length > 0 && ConfirmPasswordList.length > 0) {
      PasswordList.map((password, index) => {
        if (ConfirmPasswordList[index] !== password) {
          throw new Error('ConfirmPasswordNotEqual');
        }
      });
    }
    //verifiying if any of the select inputs has no elements selected in it.
    if (SelectInputsList.length > 0) {
      SelectInputsList.map((SelectInput) => {
        let SelectedValuesCount = 0;
        SelectInput.map((Item) => {
          if (Item.selected == true) {
            SelectedValuesCount++;
          }
        });
        if (SelectedValuesCount == 0) {
          throw new Error('SelectInputEmpty');
        }
      });
    }

    ///Verifiying if any of the input numbers is 0
    if (NumbersList.length > 0) {
      NumbersList.map((numberInputValue) => {
        if (numberInputValue == 0) {
          throw new Error('NumberInputEmpty');
        }
      });
    }

    if (PhoneNumbersList.length > 0) {
      PhoneNumbersList.map((phoneNumber) => {
        if (/^\d{8}$/.test(phoneNumber) == false) {
          throw new Error('InvalidPhoneNumber');
        }
      });
    }
    return true;
  } catch (e) {
    //Handle EmptyTextInput Found exception
    if (e.message === 'TextInputEmpty') {
      Notify.displayNotification(
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Validation.textInput" />,
        ),
        'info',
        IsLightMode,
      );
      return false;
    }

    //Handle SelectInputEmpty Found exception
    if (e.message === 'SelectInputEmpty') {
      Notify.displayNotification(
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Validation.selectInput" />,
        ),
        'info',
        IsLightMode,
      );
      return false;
    }
    //Handle NumberInputEmpty Found exception
    if (e.message === 'NumberInputEmpty') {
      Notify.displayNotification(
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Validation.numberInput" />,
        ),
        'info',
        IsLightMode,
      );
      return false;
    }
    //Handle InvalidPhoneNumber Found exception
    if (e.message === 'InvalidPhoneNumber') {
      Notify.displayNotification(
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Validation.phoneNumberInput" />,
        ),
        'info',
        IsLightMode,
      );
      return false;
    }
    //Handle WrongEmailFormat  exception
    if (e.message === 'WrongEmailFormat') {
      Notify.displayNotification(
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Validation.emailInput" />,
        ),
        'info',
        IsLightMode,
      );
      return false;
    }
    //Handle WrongEmailFormat  exception
    if (e.message === 'WrongPasswordFormat') {
      Notify.displayNotification(
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Validation.passwordInput" />,
        ),
        'info',
        IsLightMode,
      );
      return false;
    }
    //Handle ConfirmPasswordNotEqual  exception
    if (e.message === 'ConfirmPasswordNotEqual') {
      Notify.displayNotification(
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Validation.confirmPasswordInput" />,
        ),
        'info',
        IsLightMode,
      );
      return false;
    }
  }
}

VerifyInputs.propTypes = {
  TextInputsList: PropTypes.arrayOf(PropTypes.string),
  SelectInputsList: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        ItemId: PropTypes.number.isRequired,
        selected: PropTypes.bool.isRequired,
      }),
    ),
  ),
  NumbersList: PropTypes.arrayOf(PropTypes.number),
  PhoneNumbersList: PropTypes.arrayOf(PropTypes.number),
  LightMode: PropTypes.bool,
};

/* ======================DOCUMENTATION:======================
TextInputsList FORMAT Should be like this ["InputValue1","InputValue2"]

SelectInputsList FORMAT Should be like this [[{ItemId:1,selected:true},{ItemId:2,selected:false}],[{ItemId:4,selected:true},{ItemId:6,selected:false}]]

EmailInputList FORMAT should be like this [a@gmail.com,a@outlook.com]

NumbersList FORMAT Should be like this [152,265,]

PhoneNumbersList FORMAT Should be like this [56705203,56705204]
===================================================================*/
