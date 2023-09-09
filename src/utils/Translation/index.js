import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types"
import React from 'react';
TranslateText.propTypes={
  TranslationPath:PropTypes.string.isRequired
}
export default function TranslateText({ TranslationPath }) {
  const { t, i18n } = useTranslation();
  const translatedText = t(TranslationPath);

  return <>{translatedText}</>;
}
TranslateString.propTypes={
  TranslationPath:PropTypes.string.isRequired
}
export function TranslateString(TranslationPath) {
  const { t, i18n } = useTranslation();
  return t(TranslationPath);
}
