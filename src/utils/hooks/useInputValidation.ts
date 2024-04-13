import React from 'react';
import { SelectInputValidation } from 'types/components/input-validation';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
import { useSelector } from 'react-redux';
import { LightMode } from 'redux/actions/light-actions';
import { useNotify } from 'utils/hooks/useNotify';
export function useInputValidation() {
  const { displayNotification, displayPromiseNotification } = useNotify();
  const { t } = useTranslation();
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const isLightMode = LightModeState === LightMode().type;

  /**
   * This function throws confirmation messages related to data validation.
   * @param {Array<string>} TextInputsList List of the TextInputs to Validate
   * @param {Array<string>} EmailInputList List of the EmailInputs to Validate
   * @param {Array<SelectInputValidation>} SelectInputsList List of the SelectInputs to Validate
   * @param {Array<number>} NumbersList List of the NumberInputs to Validate
   * @param {Array<string>} PhoneNumbersList List of the PhoneNumbers to Validate
   * @param {Array<string>} PasswordList List of the Passwords to Validate
   * @param {Array<string>} ConfirmPasswordList List of the ConfirmPasswords to Validate
   * @returns
   */
  const validateInputs = (
    TextInputsList: Array<string>,
    EmailInputList: Array<string>,
    SelectInputsList: Array<Array<SelectInputValidation>>,
    NumbersList: Array<number | string>,
    PhoneNumbersList: Array<string>,
    PasswordList: Array<string>,
    ConfirmPasswordList: Array<string>,
  ) => {
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
        PhoneNumbersList.map((phoneNumber: string) => {
          if (/^\d{8}$/.test(phoneNumber) == false) {
            throw new Error('InvalidPhoneNumber');
          }
        });
      }
      return true;
    } catch (e: any) {
      //Handle EmptyTextInput Found exception
      if (e.message === 'TextInputEmpty') {
        displayNotification(t('UCP.DialogMessages.Validation.textInput'), 'info');
        return false;
      }

      //Handle SelectInputEmpty Found exception
      if (e.message === 'SelectInputEmpty') {
        displayNotification('UCP.DialogMessages.Validation.selectInput', 'info');
        return false;
      }
      //Handle NumberInputEmpty Found exception
      if (e.message === 'NumberInputEmpty') {
        displayNotification(t('UCP.DialogMessages.Validation.numberInput'), 'info');
        return false;
      }
      //Handle InvalidPhoneNumber Found exception
      if (e.message === 'InvalidPhoneNumber') {
        displayNotification(t('UCP.DialogMessages.Validation.phoneNumberInput'), 'info');
        return false;
      }
      //Handle WrongEmailFormat  exception
      if (e.message === 'WrongEmailFormat') {
        displayNotification(t('UCP.DialogMessages.Validation.emailInput'), 'info');
        return false;
      }
      //Handle WrongEmailFormat  exception
      if (e.message === 'WrongPasswordFormat') {
        displayNotification(t('UCP.DialogMessages.Validation.passwordInput'), 'info');
        return false;
      }
      //Handle ConfirmPasswordNotEqual  exception
      if (e.message === 'ConfirmPasswordNotEqual') {
        displayNotification(t('UCP.DialogMessages.Validation.confirmPasswordInput'), 'info');
        return false;
      }
    }
  };
  return { validateInputs };
}
