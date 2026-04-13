import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Avatar,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";


export const UpdateUser=({user,close})=>{

const [form, setForm] = useState({

  });

const [roledrop, setRoledrop]= useState([]);
const [accepted,setAccepted] =useState(false);
const [errors, setErrors]   =useState({});

useEffect(()=>{
    if (!user?.data || roledrop.length === 0 ) return;

    const user_select = user.data[0]
        const matchedRole = roledrop.find(
    (item) =>
      item.label.trim() === user_select.role_name?.trim()
  );
},[]);


useEffect(()=>{
    const fetchRoledrop =async () =>{
            try {
              const res = await dropdownAPI.fetchDropRole ();
              setCatdrop(res?.data?.data || []);
            } catch (error) {
              console.log("Dropdown error:", error);
            }
          };
          fetchRoledrop();  
},[]);


    return(
        <>
        </>
    )
}