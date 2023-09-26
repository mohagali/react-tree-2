import { Link } from "@mui/material";
const LinkNode = ({node,TreeNode}) => {

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
        <Link
          href={node.data.link}
          sx={{
            all: "unset",
            padding: "2px",
            margin: "2px",
            border: "1px solid yellow",
            cursor:"pointer",
            ...customStyle()
          }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </Link>
      );
}

export default LinkNode; 