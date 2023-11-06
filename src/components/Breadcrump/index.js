import { Breadcrumbs } from '@material-tailwind/react';
import TranslatedText from '../../utils/Translation';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import React from 'react';
import PropTypes from 'prop-types';
BreadcrumbsWithIcon.propTypes = {
  Parent: PropTypes.object,
  Child: PropTypes.object,
  List: PropTypes.bool.isRequired,
};

/*
=========This is an example of how the data should beformated=======

 Parent={{PageUrl:"/Home",PageName:"Home"}}
  Child={{
  PageUrl: '/Products',
  PageName: <TranslatedText TranslationPath="Products.Shop" />,
        }}
  List={true}      
*/
export default function BreadcrumbsWithIcon({ Parent, Child, List }) {
  const LightModeState = useSelector((state) => state.lightMode);
  return (
    <div
      className={` animate-QuickTopToBottom rounded-md shadow-sm mx-4 grid grid-cols-1  justify-center items-center gap-3 bg-cover ${
        LightModeState == LightMode().type
          ? 'bg-whiteTheme_T2 tc-whiteTheme_T1'
          : 'bg-darkTheme_T2 tc-darkTheme_T1'
      }`}
    >
      {List == true ? (
        <div className=" col-span-1 w-full flex flex-col justify-center items-center">
          <p
            className=" text-center"
            style={{ fontFamily: 'Roboto, sans-serif', fontSize: '35px' }}
          >
          <TranslatedText TranslationPath="Products.List" />
          </p>
          <p
            className=" text-center"
            style={{
              fontStyle: 'italic',
              color: '#bf360c',
              fontFamily: 'serif',
              fontSize: '25px',
            }}
          >
            {Child == undefined ? 'Products' : Child.PageName}
          </p>
        </div>
      ) : null}

      <Breadcrumbs
        separator={
          <p
            className={`${
              LightModeState == LightMode().type
                ? 'tc-whiteTheme_T1'
                : 'tc-darkTheme_T1'
            }`}
          >
            /
          </p>
        }
        fullWidth={true}
        className={`bg-inherit   ml-4  col-span-1  ${
          LightModeState == LightMode().type
            ? 'tc-whiteTheme_T1'
            : 'tc-darkTheme_T1'
        }`}
      >
        <a
          href="/Home"
          className={`hover:opacity-60 ${
            LightModeState == LightMode().type
              ? 'tc-whiteTheme_T1'
              : 'tc-darkTheme_T1'
          }`}
        >
          <i className="fa-solid fa-house"></i>
        </a>
        {Parent == undefined ? null : (
          <a
            className={`hover:opacity-60 ${
              LightModeState == LightMode().type
                ? 'tc-whiteTheme_T1'
                : 'tc-darkTheme_T1'
            }`}
            href={`${Parent.PageUrl}`}
          >
            {Parent.PageName}
          </a>
        )}
        {Child == undefined ? null : (
          <a
            className={`hover:opacity-60 ${
              LightModeState == LightMode().type
                ? 'tc-whiteTheme_T1'
                : 'tc-darkTheme_T1'
            }`}
            href={`${Child.PageUrl}`}
          >
            {Child.PageName}
          </a>
        )}
      </Breadcrumbs>
    </div>
  );
}
