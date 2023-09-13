import React, { useState } from "react";
import { Box } from "@mui/material";
import styles from "./Preview.module.css";

export const Preview = (props) => {
  const nestedObject = convertToNestedArray(props.tree);

  return (
    <Box
      sx={{
        padding: "4px"
      }}
    >
      <NestedTree data={nestedObject} />
    </Box>
  );
};

function convertToNestedArray(flatArray) {
  const idToObjMap = {}; // Map to store objects by their id
  const result = [];

  // Create a mapping of id to objects
  for (const item of flatArray) {
    const { id, parent, ...rest } = item;
    idToObjMap[id] = { id, ...rest, children: [] };
  }

  // Build the nested structure
  for (const item of flatArray) {
    const { id, parent } = item;
    const currentObject = idToObjMap[id];

    if (parent === 0) {
      // If the item has no parent, add it to the result
      result.push(currentObject);
    } else {
      // If the item has a parent, add it as a child of the parent
      const parentObject = idToObjMap[parent];
      parentObject.children.push(currentObject);
    }
  }

  return result;
}

function TreeNode({ node }) {
  if (node.children && node.children.length > 0) {
    return (
      <Box
        sx={{
          padding: "4px",
          margin: "4px",
          border:
            node.direction === "row" ? "1px solid green" : "1px solid red",
          gap: "4px",
          display: "flex",
          flexDirection: node.direction,
          justifyContent: node.content
        }}
      >
        {node.children.map((child) => (
          <TreeNode key={child.id} node={child} />
        ))}
      </Box>
    );
  } else {
    if (node.data?.fileType === "text")
      return (
        <Box
          sx={{
            border: "1px solid grey",
            borderRadius: "2px",
            padding: "2px"
          }}
        >
          {node.data?.text}
        </Box>
      );
    if (node?.data.fileType === "image")
      return (
        <div
          style={{
            border: "1px solid orange",
            borderRadius: "2px",
            padding: "2px",
            width:"100px"
          }}
        >
          <img width="100%" height="100%" src={node.data?.image} alt="" />
        </div>
      );
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
