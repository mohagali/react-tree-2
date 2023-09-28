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
  //   if(node.id==118)
  //   return {
  // ...newStyle,"flexDirection":'column'
  // }
  let newStyle2 = {}
  Object.keys(newStyle).forEach(k => {
    newStyle2[k]={xs:newStyle[k]}
})
  
console.log(newStyle2)
    return newStyle2
}

    return (
        <Box
          sx={{
            // padding: "4px",
            // margin: "4px",
            // border:"1px solid green",
                
            display: "flex",
            ...customStyle(),
           
          }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </Box>
      );
}

export default RowNode; 