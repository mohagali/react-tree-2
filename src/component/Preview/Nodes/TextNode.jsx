import { Box } from "@mui/material";
const TextNode = ({node}) => {
    return <Box
        sx={{
            border: "1px solid grey",
            borderRadius: "2px",
            padding: "2px"
        }}
    >
        {node.data?.text}
    </Box>
}

export default TextNode; 