import { Box, Typography } from "@mui/material";
import { useState } from "react";
import VariantProducts from "./variants-products";
import { IOrders, IOrderVariantProduct } from "./orders.interface";

const ProductCard = ({
  product,
  order,
}: {
  product: IOrderVariantProduct;
  order: IOrders;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {" "}
      <Box
        sx={{
          cursor: "pointer",
        }}
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
            },
          }}
        >
          <img
            src={product.images?.[0]}
            alt=""
            style={{
              width: "100%",
              // height: '200px',
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // padding: '10px'
          }}
        >
          <Typography color={"text.secondary"}>{product.title}</Typography>
        </Box>
      </Box>
      <VariantProducts
        product={product}
        open={open}
        setOpen={setOpen}
        order={order}
      />
    </>
  );
};

export default ProductCard;
