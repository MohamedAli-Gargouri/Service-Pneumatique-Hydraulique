
  import { useSelector } from "react-redux/es/hooks/useSelector";
import React from "react";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Alert,
    IconButton 
  } from "@material-tailwind/react";
  import TranslatedText from "../../utils/Translation"
  
  const TABLE_ROWS_OrderNotifications = [
    {
      Notification_ID: "1",
      OrderID: "1",
      NotificationType:"Normal",
      Notification_Message: "Your order is now set to Pending, this usually mean it's gonna take sometime to prepare your order, be patient..",
    },
    
    {
      Notification_ID: "2",
      OrderID: "2",
      NotificationType:"Good",
      Notification_Message: "Your order is now ready !",
    },
    
    {
      Notification_ID: "3",
      OrderID: "3",
      NotificationType:"Normal",
      Notification_Message: "Your order is now set to Pending, this usually mean it's gonna take sometime to prepare your order, be patient..",
    },
    
    
    
  ];


   
  export default function Products() {
    const LightModeState=useSelector(state=>state.lightMode)
   const [VisibleData,SetVisibleData] = React.useState(TABLE_ROWS_OrderNotifications.slice(0, Math.min(5, TABLE_ROWS_OrderNotifications.length)));

    return (
      <>
        <React.Fragment>

              {VisibleData.map(
                ({Notification_ID,NotificationType,OrderID,Notification_Message }, index) => {
                  return (
                    <div className="row">
                    <div key={index} className="flex flex-wrap  justify-center items-center"> 


                    <Alert
                    
                    icon={NotificationType === "Good"
                    ? <i class="fa-solid fa-circle-check"></i>
                    : NotificationType === "Normal"
                    ? <i class="fa-solid fa-exclamation"></i>
                    : <i class="fa-solid fa-triangle-exclamation"></i>}
                    
                    color={
                              NotificationType === "Good"
                                ? "green"
                                : NotificationType === "Normal"
                                ? "amber"
                                : "red"
                            }><TranslatedText TranslationPath="UCP.Notifications.TabHeader.Order"/>  #{OrderID} {Notification_Message}<IconButton variant="text" size="sm" className=" mx-2 rounded-full">
                            <i class="fa-solid fa-xmark  "></i>
                          </IconButton></Alert> 

                                                  
                    </div>
                    <hr  className="m-2 w-full"/>
                    </div>
                  );
                },
              )
              }

        </React.Fragment>


      </>
    );
  }