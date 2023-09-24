import { Box } from "@mui/material";
const ImageNode = ({ node }) => {
    return (

        <img width="100%" height="100%" src={node.data?.image}
            style={{
                objectFit: "cover"
            }} alt="" />

    );
}

export default ImageNode;

{/* <Box
sx={{
    border: "1px solid orange",
    borderRadius: "2px",
    padding: "2px",
    width: "100px"
}}
>
<img width="100%" height="100%" src={node.data?.image}
    style={{
        objectFit: "cover"
    }} alt="" />
</Box> */}