import React from 'react';
import { useState } from 'react';

import {
  Input,
  IconButton,
} from '@material-tailwind/react';
import ConfirmDialog from '../Dialog/Confirm';
import PlaceHolderImg from '../../assets/images/Placeholderimg.webp';
import TranslatedText, { TranslateString } from '../../utils/Translation';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import PropTypes from "prop-types"
Gallery.propTypes={
  AddedImages:PropTypes.object,
   Images:PropTypes.array.isRequired,
    Addable:PropTypes.bool.isRequired,
     Deletable:PropTypes.bool.isRequired
}
export default function Gallery({ AddedImages, Images, Addable, Deletable }) {
  const LightModeState = useSelector((state) => state.lightMode);
  const [SelectedImgIndex, SetSelectedImgIndex] = useState(0);
  const [OpenDeleteDialog, SetOpenDeleteDialog] = useState(false);
  const [ProductImages, SetProductImages] = useState(
    Images != undefined
      ? Images.length == 0
        ? [PlaceHolderImg]
        : Images
      : [PlaceHolderImg],
  );
  const handleImageUpload = (e) => {
    if (ProductImages.length < 3) {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        SetProductImages(
          ProductImages.length == 1 && ProductImages[0] == PlaceHolderImg
            ? [imageUrl]
            : [...ProductImages, imageUrl],
        );
        SetSelectedImgIndex(
          ProductImages.length == 1 && ProductImages[0] == PlaceHolderImg
            ? 0
            : ProductImages.length,
        );
        AddedImages.current = [...AddedImages.current, imageUrl];
      }
    } else {
      CreateToast(
        null,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.ProductThreeImagesLimit_Error" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.ProductThreeImagesLimit_Error" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />,
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.ProductThreeImagesLimit_Error" />,
        ),
        'info',
        LightModeState == LightMode().type,
      );
    }
  };

  const handleDelete = (e) => {

    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('API Fetch is done!');

          SetProductImages(
            ProductImages.length == 1
              ? [PlaceHolderImg]
              : ProductImages.filter((a, index) => index != SelectedImgIndex),
          );
          SetSelectedImgIndex(0);
        }, 3000);
      });

      CreateToast(
        promise,
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.DeleteProductImg_Confirm" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.DeleteProductImg_Success" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Promise.Pending" />
        ),
        ReactDOMServer.renderToStaticMarkup(
          <TranslatedText TranslationPath="UCP.DialogMessages.Products.DeleteProductImg_Error" />
        ),
        'promise',
        LightModeState == LightMode().type,
      );
    } catch (e) {/*Catch code here */}

  };
  return (
    <React.Fragment>
      <div className="w-full h-full grid grid-cols-8 items-center justify-center mt-4 gap-2">
        {/*==================Here is the unselected Pictures=================== */}
        <div className=" flex justify-center items-center order-2 md:order-1 col-span-8 md:block w-full h-full UnselectedImages md:col-span-2 ">
          <div className="flex w-full h-full flex-row md:flex-col justify-center md:justify-center items-center flex-wrap">
            {ProductImages.map((imageurl, index) => {
              return (
                <div
                  key={"UnSelectedIMG"+index}
                  onClick={() => {
                    SetSelectedImgIndex(index);
                  }}
                  className={` max-h-28 max-w-[7rem] ${
                    index == SelectedImgIndex ? 'border  border-red-400' : ''
                  } Unselected bg-gray-300 rounded-md img  shadow-lg mx-1  my-1 hover:scale-110 hover:border-red-200 transition duration-300 ease-in-out cursor-pointer`}
                >
                  <img
                    className=" animate-fade aspect-square rounded-sm w-full h-full  shadow-x"
                    src={imageurl}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/*==================Here is the selected Picture=================== */}
        <div className="order-1 selectedImage flex justify-center items-center col-span-8 md:col-span-6 w-full h-full ">
          {ProductImages.map((imageurl, index) => {
            if (index == SelectedImgIndex) {
              return (
                <div key={"SelectedIMG"+index} className="relative h-full w-full max-h-60 max-w-xs   md:max-h-96 md:max-w-lg   bg-gray-300 rounded-md Selected shadow-lg hover:cursor-pointer">
                  <img
                    className=" animate-fade aspect-square w-full h-full shadow-x"
                    src={imageurl}
                  />

                  <Input
                    id="ProductImgInput"
                    type="file"
                    variant="static"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div
                    className={`${
                      (Addable == undefined && Deletable == undefined) ||
                      (Addable == false && Deletable == false)
                        ? 'hidden'
                        : ''
                    }absolute p-2 w-full bottom-[0%] flex flex-row justify-around items-center flex-wrap`}
                  >
                    {Addable != undefined && Addable == true ? (
                      <IconButton
                        className="mx-2 rounded-full"
                        onClick={() => {
                          document.getElementById('ProductImgInput').click();
                        }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </IconButton>
                    ) : null}
                    {Deletable != undefined && Deletable == true ? (
                      <IconButton
                        className="mx-2 rounded-full"
                        onClick={() => {
                          SetOpenDeleteDialog(!OpenDeleteDialog);
                        }}
                      >
                        <i className="fa-solid fa-circle-xmark"></i>
                      </IconButton>
                    ) : null}
                  </div>
                </div>
              );
            }
          })}
        </div>

        <ConfirmDialog
          color="red"
          Open={OpenDeleteDialog}
          Action={() => {
            handleDelete();
          }}
          HandleOpen={() => {
            SetOpenDeleteDialog(!OpenDeleteDialog);
          }}
          Icon={'<i className="fa-solid fa-trash h-5 w-5 mx-1"></i>'}
          Title={'Delete Product Image'}
          Content={TranslateString("UCP.DialogMessages.Products.DeleteProductImg_Confirm")}
        />
      </div>
    </React.Fragment>
  );
}
