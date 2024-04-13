import { Breadcrumbs } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
BreadcrumbsWithIcon.propTypes = {
  Parent: PropTypes.object,
  Child: PropTypes.object,
  List: PropTypes.bool.isRequired,
};
//Animations Config
const Animations = {
  hidden: {
    opacity: 0,
    y: -200,
    x: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function BreadcrumbsWithIcon({ Parent, Child, List }) {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t } = useTranslation();
  var isLightMode = LightModeState === LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState === LightMode().type;
  }, [LightModeState]);
  return (
    <motion.div
      initial={'hidden'}
      variants={Animations}
      animate={'visible'}
      className={`rounded-md background-secondary shadow-sm mx-4 grid grid-cols-1  justify-center items-center gap-3 bg-cover`}
    >
      {List === true ? (
        <div className=" col-span-1 w-full flex flex-col justify-center items-center">
          <p className=" text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '35px' }}>
            {t('Products.List')}
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
            {Child === undefined ? 'Products' : Child.PageName}
          </p>
        </div>
      ) : null}

      <Breadcrumbs
        separator={<p>/</p>}
        fullWidth={true}
        className={`bg-inherit   ml-4  col-span-1 `}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <a href="/Home" className={`hover:opacity-60 `}>
          <i className="fa-solid fa-house"></i>
        </a>
        {Parent === undefined ? null : (
          <a className={`hover:opacity-60 `} href={`${Parent.PageUrl}`}>
            {Parent.PageName}
          </a>
        )}
        {Child === undefined ? null : (
          <a className={`hover:opacity-60 `} href={`${Child.PageUrl}`}>
            {Child.PageName}
          </a>
        )}
      </Breadcrumbs>
    </motion.div>
  );
}
