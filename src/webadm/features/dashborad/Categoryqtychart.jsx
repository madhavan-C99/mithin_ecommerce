import { Box, Typography, Stack, Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const colors = [
  "#e53935",
  "#fb8c00",
  "#fbc02d",
  "#3f51b5",
  "#00acc1",
  "#43a047",
];

const CategoryQtyChat = () => {
  const [data, setData] = useState([]);
  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(
      `${import.meta.env.VITE_WS_BASE_URL}/ws/stock_category_chart/`
    );

    ws.onopen = () => {
      console.log("WebSocket Connected");
      ws.send(JSON.stringify({ action: "stock_category_chart" }));
    };

    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        console.log("WS Response:", response);

        const payload = response.payload || [];

        setData(payload);

        // Calculate total quantity
        const total = payload.reduce(
          (sum, item) => sum + item.total_quantity,
          0
        );

        setTotalQty(total);
      } catch (err) {
        console.error("INVALID JSON:", event.data);
      }
    };

    ws.onerror = (error) => {
      console.log("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
    };
    return () => {
      ws.close();
    };
  }, []);

  const DarkTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#5fbe2f",
        color: "#fff",
        fontSize: "13px",
        padding: "8px 12px",
        borderRadius: "8px",
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: "#1e1e1e",
    },
    }));


    
  return (
    <Box
      sx={{
        background: "#fff",
        p: 3,
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        width:"40%"
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Category Stock Quantity
        </Typography>


      </Box>

      {/* Bars */}
      <Stack spacing={5} sx={{marginTop:"10px",}}>
    {data.map((item, index) => {
        const percentage = totalQty
        ? (item.total_quantity / totalQty) * 100
        : 0;

        return (
        <Box
            key={item.name}
            sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            }}
        >
            <Typography
            sx={{
                width: "160px",
                fontSize: "14px",
                color: "#666",
            }}
            >
            {item.name}
            </Typography>

            {/* <Tooltip */}
            <DarkTooltip
            title={`Quantity: ${item.total_quantity}`}
            arrow
            color="danger"
            sx={{fontSize:"20px"}}
            // varient="h5"
            placement="top"
            >
            <Box
                sx={{
                flex: 1,
                background: "#f3f3f3",
                borderRadius: "20px",
                height: "28px",
                cursor: "pointer",
                }}
            >
                <Box
                sx={{
                    width: `${percentage}%`,
                    height: "100%",
                    background: colors[index % colors.length],
                    borderRadius: "20px",
                    transition: "width 0.6s ease",
                }}
                />
            </Box>
            </DarkTooltip>
            {/* </Tooltip> */}
        </Box>
        );
    })}
    </Stack>
    </Box>
  );
};

export default CategoryQtyChat;