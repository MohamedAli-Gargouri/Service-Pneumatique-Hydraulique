
 import { Spinner } from "@material-tailwind/react";
import SPHLOGO from "../../assets/images/SPH Logo.png"
export default function LoginCard() {
    return (

      <div className=" h-screen w-screen flex flex-col justify-center items-center gap-11">
        {/*<div className=" flex-row flex justify-center items-center  w-[90%] m-4 rounded-lg">
        <hr className=" border-red-600 rounded-lg w-[40%] h-[0.35rem] bg-red-600 m-4"/>
        <img src={SPHLOGO} className="mx-auto w-[30vw] h-[10vh] md:w-[20vw] md:h-[20vh]"/>
        <hr className=" border-red-600 rounded-lg w-[40%] h-[0.35rem] bg-red-600 m-4"/>
    </div>*/}

        
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>

    );
  }