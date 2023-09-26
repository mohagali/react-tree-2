import { Box } from "@mui/material";
const ImageNode = ({ node }) => {

    const customStyle = () => {

        const style = node?.data?.style;
        let newStyle = {}
        if (!style)
            return {};

        Object.keys(style).forEach(k => {
            newStyle = { ...newStyle, ...style[k].properties }
        })
        return newStyle
    }

    return (

        <Box sx={{
            width:'100px',
            height:'100px',
            // border: "1px solid grey",
            overflow:'hidden',
            display: 'flex',
            justifyContent:'center',
            alignItems: 'center',
            ...customStyle()
        }}>
        <img width="100%" height="100%" src={node.data?.imageUrl}
            style={{
                objectFit: "cover",
            }} alt="" /></Box>

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