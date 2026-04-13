import {
    Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"

import { motion, AnimatePresence } from "framer-motion"

const tabledata={
       color: "#84868a",
      fontSize: {
        xs: "10px",
        sm: "12px",
        md: "13px",
          lg: "13px"
          },
        fontWeight:600  
}

const tablehead={
      color: "#4B5563",
      fontSize: {
      xs: "11px",
      sm: "12px",
      md: "13px",
      lg: "13px"
      },
      fontWeight: 700
}


const MotionRow = motion(TableRow)

export const ProductList = ({ product }) => {

  const processedProduct = product || []
const total_amount = processedProduct[0]?.total_amount;
  console.log(processedProduct)
// const totalAmount = processedProduct.reduce(
//   (sum, item) => sum + item.total_price,
//   0
// )

// const deliveryCharges = 40
// const gst = totalAmount * 0.05

// const grandTotal = totalAmount + deliveryCharges + gst
  return (
    <TableContainer
      sx={{
    "& .MuiTableCell-root": {
      borderBottom: "none"
    }
        // background: "#ffffff",
        // boxShadow: "0 8px 30px rgba(45, 43, 43, 0.3)"
  }}>

      <Table stickyHeader>

        <TableHead >
          <TableRow >
            <TableCell sx={{...tablehead,fontWeight:"bold", backgroundColor:"#dbdfe0"}}>S.No</TableCell>
            <TableCell sx={{...tablehead,fontWeight:"bold", backgroundColor:"#dbdfe0"}}>Product Name</TableCell>
            <TableCell sx={{...tablehead,fontWeight:"bold", backgroundColor:"#dbdfe0"}}>Unit Price (₹)</TableCell>
            <TableCell sx={{...tablehead,fontWeight:"bold", backgroundColor:"#dbdfe0"}}>Weight</TableCell>
            <TableCell sx={{...tablehead,fontWeight:"bold", backgroundColor:"#dbdfe0"}}>Quantity</TableCell>
            <TableCell sx={{...tablehead,fontWeight:"bold", backgroundColor:"#dbdfe0"}}>Total Price (₹)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          <AnimatePresence>

            {processedProduct.length > 0 ? (

              processedProduct.map((pro_data, index) => (

                <MotionRow
                  key={pro_data.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >

                  <TableCell  sx={tabledata}>{index + 1}</TableCell>

                  <TableCell>
                    <Typography sx={tabledata}>
                      {pro_data.name}
                    </Typography>
                  </TableCell>

                  <TableCell  sx={tabledata}>
                    ₹ {pro_data.unit_price}
                  </TableCell>

                  <TableCell  sx={tabledata}>
                    {pro_data.weight} {"kg"}
                  </TableCell>

                  <TableCell  sx={tabledata}>
                    {pro_data.quantity}
                  </TableCell>

                  <TableCell  sx={tabledata}>
                   ₹ {pro_data.total_price}
                  </TableCell>
                
                </MotionRow>
              
                

              ))

            ) : (

              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Products Found
                </TableCell>
              </TableRow>

            )}

          </AnimatePresence>
            {processedProduct.length > 0 && (
    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
      <TableCell colSpan={5} align="right">
        <Typography fontWeight="bold">
          Total Amount
        </Typography>
      </TableCell>

      <TableCell>
        <Typography fontWeight="bold" color="green">
          ₹ {total_amount}
        </Typography>
      </TableCell>
    </TableRow>
  )}

        </TableBody>

      </Table>

    </TableContainer>
  )
}

export default ProductList



