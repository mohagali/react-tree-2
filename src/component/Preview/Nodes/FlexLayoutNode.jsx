import { Box } from "@mui/material";

const RowNode = ({node,TreeNode}) => {

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
        <Box
          sx={{
            // padding: "4px",
            // margin: "4px",
            // border:"1px solid green",
                
            display: "flex",
            ...customStyle()
          }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </Box>
      );
}

export default RowNode; 