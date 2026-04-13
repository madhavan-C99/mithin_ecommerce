import { Box, Typography } from "@mui/material";
import DataBoxes from "./DataBoxes.jsx";
import CategoryQtyChat from "./Categoryqtychart.jsx";
import CategoryPieChart from "./CategoryPieChart.jsx";
import SubCategoryChart from "./SubcategoryChart.jsx";


const pageheading={
    fontSize: {
      xs: "16px",
      sm: "20px",
      md: "22px",
      lg: "22px"
    },
    fontWeight:"bold",
    minWidth:7,
    mb:2
}


export default function DashboradView (){
    return(
        <>
        <Typography variant="h4" sx={pageheading} >Dashboard</Typography>
        <DataBoxes/>
        <Box sx={{display:"flex", justifyContent:"space-evenly",marginBottom:"50px",}}>  
            <CategoryQtyChat/>
            <CategoryPieChart/> 
        </Box>
        {/* <SubCategoryChart/>  */}
        
        </>
    );
}
