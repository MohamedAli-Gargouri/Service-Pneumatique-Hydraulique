import React, { Component } from 'react';
import './ErrorBoundary.css';
import logo from '../../assets/images/SPH Logo.webp';
import { Button } from '@material-tailwind/react';
const UnAuthorized = () => {
  return (
    <div className=" h-screen lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <img loading="lazy" src={logo} className=" w-80" />
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">Accès refusé</h1>
              <p className="my-2 text-gray-800">Vous n'avez pas l'autorisation pour cette page.</p>
              <Button
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={() => (window.location.href = '/')}
                className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center  text-white"
              >
                Retour Accueil
              </Button>
            </div>
          </div>
          <div>
            <img loading="lazy" src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img loading="lazy" src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};
