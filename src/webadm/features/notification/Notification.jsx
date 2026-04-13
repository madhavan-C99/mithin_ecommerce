import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
  TableRow
} from "@mui/material";

import empty_box from '../../../assets/empty_box.gif'

// import { Backdrop, CircularProgress,  } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from "@mui/icons-material/Close";

import { orderAPI } from "../ordermanagement/components/orderAPI";
import { useEffect, useState, useMemo } from "react";
import { useContext } from "react";
import { NotificationContext } from "../../context/AuthContext";




const Notification=()=>{

const { notifications, setNotifications } = useContext(NotificationContext);

const [loading, setLoading] = useState(true);

  useEffect(() => {

  // const orderSocket = createSocket(
  //   "ws://ec2-54-237-228-110.compute-1.amazonaws.com:88/ws/new_order_data/",
  //   "new_order"
  // );

  const stockSocket = createSocket(
      `${import.meta.env.VITE_WS_BASE_URL}/ws/notification_data/`,
    "notification_all"
  );

  return () => {
    // orderSocket.close();
    stockSocket.close();
  };

}, []);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 3000);

  return () => clearTimeout(timer);
}, []);


const createSocket = (url, actionName) => {

  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("url",url)
    if(actionName){   // action இருந்தா மட்டும் send
      socket.send(JSON.stringify({ action: actionName }));
    }
  };

  socket.onmessage = (event) => {

    try {

      const parsedData = JSON.parse(event.data);
      console.log('stock',parsedData)
      setNotifications((prev) => {

        const newData = parsedData.payload || [];

        const merged = [...newData, ...prev];

        const unique = merged.filter(
          (item, index, self) =>
            index === self.findIndex((t) =>t.notification_id === item.notification_id)
        );

        return unique.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

      });

    } catch (error) {
      console.error("Invalid JSON:", event.data);
    }



  };

  return socket;

};






const updateStatus = async (id, status,notification_id) => {

  try {

    await orderAPI.updatestatusApi(id, status);
    await readNotification(notification_id);

    setNotifications((prev) =>
  prev.filter((item) => item.id !== id)
    );

  } catch (err) {
    console.error("Status update error", err);
  }

};


const readNotification = async (id) => {
  try {
    await orderAPI.readnotification(id);

    // UI update (remove notification)
    setNotifications((prev) =>
      prev.filter((item) => item.notification_id !== id)
    );

  } catch (error) {
    console.error("Notification update failed", error);
  }
};

// if (loading) {
//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="80vh"
//       flexDirection="column"
//     >
//       <img
       
//   src={pageload}
//   alt="loading"
//   style={{ width:"100%"}}
// />
  
//     </Box>
//   );
// }
  return (
<Box p={3}  bgcolor={"#feffff"} >

  <Typography
    variant="h5"
    fontWeight="bold"
    mb={3}
  >
    Notifications
  </Typography>

  <Stack spacing={2}  >
  {notifications.length === 0 ? 
  (

    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // height={300}
      // width={300}
      marginLeft={50}
      sx={{
        opacity: 0.7
      }}
    >
      {/* Animation */}
       <img
        src={empty_box}
        alt="no notifications"
        width={"30%"}
        height={"100%"}
        style={{
          animation: "float 2s ease-in-out infinite"
        }}
      />

      <Typography mt={2} color="text.secondary">
        No Notifications Yet
      </Typography>

    </Box>

  ) : ( 
    
 notifications.map((n) => (
      
      <Paper
        key={n.notification_id}
        sx={{
          // width:500,
          minWidth:150,
          maxWidth:600,
          p: 2.5,
          borderRadius: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          transition: "0.2s",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
          },
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",     // IE
        scrollbarWidth: "none",  
        }}
      >

        {/* LEFT CONTENT */}

         {/* STOCK ALERT */}

          {n.title==="Low Stock" && (

              <Box display={"flex"} justifyContent={"space-evenly"} gap={30} alignItems={"center"}>

                {/* LEFT SIDE */}
                <Box display={"flex"}gap={2}  width={"100%"}>
                  <WarningIcon sx={{ color:"#d32f2f" }}/>

                  <Typography fontWeight="bold" >
                    {n.name}
                  </Typography>

                  <Typography
                    sx={{
                      height:25,
                      background:"#ffebee",
                      color:"#d32f2f",
                      px:1.5,
                      pt:0,
                      borderRadius:2,
                      fontSize:12,
                      display:"flex",
                      alignItems:"center",
                      height:40,
                      width:70
                    }}
                  >
                    {n.stock} Low stock
                  </Typography>

                </Box>

                {/* RIGHT SIDE */}
                <Box bgcolor={"#bdfcbd"}display={"flex"} justifyContent={"flex-end"} >

                
                    <IconButton
                      onClick={() => readNotification(n.notification_id)}
                      // sx={{backgroundColor:"#d6bfbf",ml:30}}
                    >
                      <CloseIcon />
                    </IconButton>
                </Box>

              </Box>

          )}

        {/* ORDER ACTIONS */}

        {n.title === "New Order" && (
          <Box display={"flex"} justifyContent={"space-evenly"} gap={8} alignItems={"center"}>
          <Box>

          <Typography fontWeight="bold">
            {n.title}
          </Typography>

          <Typography
            fontSize={14}
            color="text.secondary"
            mt={0.5}
          >
            {n.message}
          </Typography>

          <Typography
            fontSize={12}
            color="text.disabled"
            mt={1}
          >
            {n.time_ago}
          </Typography>

         </Box>

      

          <Box display="flex" gap={2}>

           <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => updateStatus(n.order_id,"Confirmed",n.notification_id)}
              sx={{
                px: 3,
                borderRadius: 2
              }}
            >
              Accept
            </Button>

            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => updateStatus(n.order_id,"Cancelled",n.notification_id)}
              sx={{
                px: 3,
                borderRadius: 2
              }}
            >
              Reject
            </Button>

          </Box>
            </Box>

        )}

      </Paper>

      ))
  )}

  </Stack>

</Box>
  );
}


export default Notification
