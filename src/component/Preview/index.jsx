import React, { useState } from "react";
import { Box, Link } from "@mui/material";
import styles from "./styles.module.css";
import { useNodes } from "../../context/NodesContext";
import BoxNode from './Nodes/BoxNode'
import FlexLayoutNode from './Nodes/FlexLayoutNode'
import ImageNode from './Nodes/ImageNode'
import TextNode from './Nodes/TextNode'
import LinkNode from './Nodes/LinkNode'
import { convertToNestedArray } from './../../utils/nodes'
export const Preview = () => {

  const { nodes } = useNodes()
  const nestedObject = convertToNestedArray(nodes);

  return (
    <Box sx={{
      padding: '1rem',
      marginBottom: '240px'
    }}
    >
      <NestedTree data={nestedObject} />
    </Box>
  );
};

function TreeNode({ node }) {
  // if (node.children && node.children.length > 0) {

  switch (node.data.fileType) {
    case "flexlayout":
      return <FlexLayoutNode node={node} TreeNode={TreeNode} />;
    case "box":
      return <BoxNode node={node} TreeNode={TreeNode} />;
    case "link":
      return <LinkNode node={node} TreeNode={TreeNode} />;
    case "text":
      return <TextNode node={node} TreeNode={TreeNode} />;
    case "image":
      return <ImageNode node={node} TreeNode={TreeNode} />;

  }
}

function NestedTree({ data }) {
  return (
    <Box sx={{ display: "flex", gap: "4px", flexDirection: "column" }}>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </Box>
  );
}
