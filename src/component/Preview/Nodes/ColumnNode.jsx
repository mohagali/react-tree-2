
import { Box } from "@mui/material";

const ColumnNode = ({node,TreeNode}) => {
    return (
        <Box
          sx={{
            padding: "4px",
            margin: "4px",
            border:
              node.data?.direction === "row"
                ? "1px solid green"
                : "1px solid red",
            gap: "4px",
            display: "flex",
            flexDirection: node.data?.direction,
            justifyContent: node.data?.content
          }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </Box>
      );
}

export default ColumnNode; 