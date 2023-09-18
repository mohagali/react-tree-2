import React, { useState } from "react";
import { Box, Link } from "@mui/material";
import styles from "./styles.module.css";

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
    if (node.data.fileType === "row" || node.data.fileType === "column")
      return (
        <Box
          sx={{
            padding: "4px",
            margin: "4px",
            border:
              node.data.direction === "row"
                ? "1px solid green"
                : "1px solid red",
            gap: "4px",
            display: "flex",
            flexDirection: node?.data.direction,
            justifyContent: node?.data.content
          }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </Box>
      );
    if (node.data.fileType === "box")
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
    if (node.data.fileType === "link")
      return (
        <Link
          href={node.data.link}
          sx={{
            padding: "2px",
            margin: "2px",
            border: "1px solid yellow"
          }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </Link>
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
            width: "100px"
          }}
        >
          <img width="100%" height="100%" src={node.data?.image} alt="" />
        </div>
      );
    // if (node?.data.fileType === "box")
    //   return (
    //     <div
    //       style={{
    //         border: "1px solid purple",
    //         borderRadius: "2px",
    //         padding: "2px",
    //         width: "100px"
    //       }}
    //     ></div>
    //   );
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
