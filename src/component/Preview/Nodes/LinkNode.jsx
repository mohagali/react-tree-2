import { Link } from "@mui/material";
const LinkNode = ({node,TreeNode}) => {
    return (
        <Link
          href={node.data.link}
          sx={{
            padding: "2px",
            margin: "2px",
            border: "1px solid yellow",
            all: "unset",
            cursor:"pointer"
          }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </Link>
      );
}

export default LinkNode; 