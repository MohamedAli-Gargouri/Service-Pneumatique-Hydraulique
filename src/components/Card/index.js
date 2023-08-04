import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export default function CustomCard(props) {
    return (
      <Card className="hover:scale-105" style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}>
        <CardHeader shadow={false} floated={false} className="">
         
        </CardHeader>
        <CardBody>
              {props.children}
        </CardBody>
        <CardFooter className="pt-0">
         
        </CardFooter>
      </Card>
    );
  }