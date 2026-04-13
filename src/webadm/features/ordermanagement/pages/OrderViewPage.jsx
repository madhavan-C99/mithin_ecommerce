import React, { useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Chip,
  Divider
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

  import { styled } from "@mui/material/styles";
import StepConnector from "@mui/material/StepConnector";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import CustomerDetails from "../components/orderview/CustomerDetails";
import ShippingInfo from "../components/orderview/ShippingInfo";
import ProductList from "../components/orderview/ProductList";

import { useReactToPrint } from "react-to-print";

const steps = [
  "Pending",
  "Confirmed",
  "Out_for_Delivered",
  "Delivered"
];




const OrderViewPage = ({ close, select }) => {

  console.log(select.data[0])

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Order Details"
  });

  /* Dynamic order status */
  const status = select?.data?.order_info?.status || "Confirmed";

  const statusIndex = {
    Pending:1,
    Confirmed: 2,
    Out_for_Delivered:3,
    Delivered: 4
  };

  const activeStep = statusIndex[status] ?? 0;


const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "& .MuiStepConnector-line": {
    height: 20,
    width:2,
    border: 0,
    backgroundColor: "#e5e7eb",
    borderRadius: 1
  },

  "&.Mui-active .MuiStepConnector-line": {
    backgroundColor: "#6366f1"
  },

  "&.Mui-completed .MuiStepConnector-line": {
    backgroundColor: "#74b961"
  }
}));

const CustomStepIcon = styled("div")(({ ownerState }) => ({
  backgroundColor: ownerState.completed
    ? "#1cbb56"
    : ownerState.active
    ? "#6366f1"
    : "#aab6ce",

  color: "#fff",
  width: 26,
  height: 26,
  display: "flex",
  // flexDirection:"row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  fontWeight: 1000,
  // backgroundColor:"#f40000"

}));

function StepIconComponent(props) {

  const { active, completed, icon } = props;

  return (
    <CustomStepIcon ownerState={{ active, completed }}>
      {icon}
    </CustomStepIcon>
  );

}


  return (

<Box
  sx={{
    p:4,
    backgroundColor:"#f4f4f4",
    // minHeight:"100vh"
  }}
>

{/* HEADER */}

{/* <Paper
  sx={{
    // p:3,
    mb:3,
    borderRadius:4,
    // background:"linear-gradient(135deg,#b8b9f0,#8b5cf6)",
    color:"#0f0a0a"
  }}
> */}

<Box display="flex" justifyContent="space-between" 
alignItems="center" 
mb={3} 
p={2}
boxShadow={4}
borderRadius={2}

>

<Box>
<Box display={"flex"} gap={2} mt={2}>


<Typography variant="h4" fontWeight="bold"
sx={{  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "16px",
                    lg: "17px"
                  },}}>
Order #{select.data.order_info.order_number}

</Typography>
<Typography> 
                          <Chip
                            label={select.data.order_info.payment_status ? "Paid" : "UnPaid"}
                           
                            sx={{
                                fontSize: {
                                xs: "10px",
                                sm: "12px",
                                md: "16px",
                                lg: "12px"
                              },
                              height:20,
                            backgroundColor: select.data.order_info.payment_status
                                ? "#dcfce7"
                                : "#fee2e2",
                            color: select.data.order_info.payment_status
                                ? "#16a34a"
                                : "#dc2626",
                            fontWeight: 800
                            }}
                        />
</Typography>
</Box>
<Box display={"flex"} gap={2} mt={2}>
      <Typography color="#0e1373" 
      sx={{  fontSize: {
                    xs: "8px",
                    sm: "10px",
                    md: "12px",
                    lg: "12px"
                  },}}>
      Order time : {select.data.order_info.order_date_time}
      </Typography>
      <Typography color="#2e7d07"
          sx={{  fontSize: {
                    xs: "8px",
                    sm: "10px",
                    md: "12px",
                    lg: "12px"
                  },}}> 
      Update time : {select.data.order_info.update_date_time}
      </Typography>

</Box>

</Box>

<Box>

<IconButton onClick={handlePrint} sx={{color:"#705dd4"}}>
<PrintIcon />
</IconButton>

<IconButton onClick={close} sx={{color:"#d65d5d"}}>
<CloseIcon />
</IconButton>

</Box>

</Box>

{/* STATUS STEPPER */}



{/* </Paper> */}

{/* MAIN CONTENT */}
<Grid  container spacing={0}>



  <Grid container spacing={3} ref={printRef} width={"70%"}>
  
    
      <Grid container spacing={3}   > 

      {/* CUSTOMER */}

                <Grid item 
                 sx={{
                // p:3,
                width:270,
                
               
                borderRadius:4,
                // boxShadow:"0 10px 25px rgba(0,0,0,0.06)"
                
                }} 
                 >

                <CustomerDetails
                customer={select.data.customer_details}
                />

                {/* </Paper> */}

                </Grid>

      {/* SHIPPING */}

                <Grid item xs={12} lg={12} 
                sx={{
                  width:280,
                   borderRadius:4,
                }} 
                >

        

                <ShippingInfo
                shipping={select.data.shipping_address}
                />

                {/* </Paper> */}

                </Grid>

      </Grid>



    { /* PRODUCT TABLE */}

        {/* <Grid item xl={12}  lg={12} md={12}  xs={0} sm={0}> */}

                {/* <Paper
                sx={{
                // p:3,
                borderRadius:0,
                boxShadow:"0 10px 30px rgba(0,0,0,0.08)"
                }}
                > */}

                <Box display="flex" alignItems="center" gap={1} mb={0}>

                <InventoryIcon color="primary"/>

                <Typography variant="h6" fontWeight="bold" >
                Order Items
                </Typography>

                </Box>

                

                <ProductList product={select.data.product}/>

                {/* </Paper> */}

        {/* </Grid> */}




  </Grid>

            
          <Grid item xs={0} lg={3 }  width={"30%"} pl={5} 
          display={"flex"} justifyContent={"center"} flexDirection={"column"}>
             <Typography variant="h6" fontWeight="bold" fontSize={14} >
                Order Track
                </Typography>
          <Box  display={"flex"} justifyContent={"center"} 
          alignItems={"center"}
          height={250}
          // bgcolor:{"#f8f8f8"}
          p={2}>
           
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              connector={<CustomConnector />}
            >

            {steps.map((label) => (

              <Step key={label}>

                <StepLabel StepIconComponent={StepIconComponent} sx={{fontSize:13}}>
                  {label}
                </StepLabel>

              </Step>

            ))}

              </Stepper>

              </Box>
        </Grid>
</Grid>



</Box>

  );
};

export default OrderViewPage;



