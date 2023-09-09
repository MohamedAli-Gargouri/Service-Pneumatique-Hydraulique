import React, { Component } from 'react';
import "./ErrorBoundary.css"
import logo from '../../assets/images/SPH Logo.webp'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
    ListItemSuffix,
    ListItem,
    List,
    Select,
    Option,
    Drawer,
    IconButton,
  } from '@material-tailwind/react';
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render your custom error page here
      return (
        <div className=" h-screen lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                    
                    <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <img src={logo} className=' w-80'/>
                        <div className="relative">

                            <div className="absolute">
                                <div className="">
                                    
                                    <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                    On dirait que tu as trouvé le
                                        porte vers le grand rien
                                    </h1>
                                    <p className="my-2 text-gray-800">On dirait que tu as trouvé la porte du grand rien
                                    Désolé pour ça! Veuillez visiter notre page d'accueil pour vous rendre là où vous devez aller.</p>
                                    <Button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center  text-white">Retour Accueil</Button>
                                </div>
                            </div>
                            <div>
                                <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
                    </div>
                </div>
      )
    }

    // Render children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;