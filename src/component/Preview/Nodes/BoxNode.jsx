import { Box } from "@mui/material";

const BoxNode = ({node,TreeNode}) => {
    return (
        <Box
          sx={{
            padding: "4px",
            margin: "4px",
            border: "1px solid purple",
            gap: "4px"
          }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </Box>
      );
}


export default BoxNode; 