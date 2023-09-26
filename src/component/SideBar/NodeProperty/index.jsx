import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getDescendants } from "@minoru/react-dnd-treeview";

import {
  ArrowRight,
  Delete,
  FileCopy,
  NoteAdd,
  CreateNewFolder,
  Edit,

} from "@mui/icons-material";

import {
  IconButton,
  Stack,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  TextField,
  Box
} from "@mui/material";

import styles from "./styles.module.css";
import FlexLayoutNode from "./Nodes/FlexLayoutNode";
import BoxNode from "./Nodes/BoxNode";
import LinkNode from "./Nodes/LinkNode";
import TextNode from "./Nodes/TextNode2";
import ImageNode from "./Nodes/ImageNode";

import { useNodes, useNodesDispatch } from '../../../context/NodesContext';

const NodeProperty = () => {

  const dispatch = useNodesDispatch();
  const { selectedNodeId, nodes } = useNodes()

  const selectedNode = nodes.find(e => e.id === selectedNodeId);

  const handleDelete = () => {
    dispatch({
      type: 'deleted',
      id: selectedNode.id
    });
  };


  const handleNewFolder = ({ text, parent }) => {
    // const newNode = {
    //   text,
    //   parent,
    //   droppable: true,
    //   data: {
    //     direction: "row",
    //     content: "start"
    //   }
    // };

    // const lastId = getLastId(treeData) + 1;

    // setTreeData([
    //   ...treeData,
    //   {
    //     ...newNode,
    //     id: lastId
    //   }
    // ]);
  };

  const handleNewFile = ({ text, parent }) => {
    // const newNode = {
    //   text,
    //   parent,
    //   droppable: false,
    //   data: {
    //     fileType: "text"
    //   }
    // };

    // const lastId = getLastId(treeData) + 1;

    // setTreeData([
    //   ...treeData,
    //   {
    //     ...newNode,
    //     id: lastId
    //   }
    // ]);
  };

  const handleCopy = () => {

    dispatch({
      type: 'copy',
      id: selectedNode.id
    });

  };
  if (!selectedNode)
    return null

  return (
    <Box sx={{
      padding: "1rem",
      border: "1px solid grey",
      borderLeft: "none",
      borderRight: "none",
      flex: 1,
      overflow: 'scroll'

    }}>

      <Stack direction={"column"}>
        <Typography variant="h6">General</Typography>
        <Stack direction={"row"}>
          <div className={styles.actionButton}>
            <IconButton size="small" onClick={() => handleCopy()}>
              <FileCopy fontSize="small" />
            </IconButton>
          </div>
          <div className={styles.actionButton}>
            <IconButton
              size="small"
              onClick={() => handleDelete()}
            >
              <Delete fontSize="small" />
            </IconButton>
          </div>
          </Stack>



          <TreeNode selectedNode={selectedNode} dispatch={dispatch} />


      </Stack>


    </Box>
  );
};

function TreeNode({ selectedNode, dispatch }) {
  // if (node.children && node.children.length > 0) {

  switch (selectedNode?.data.fileType) {
    case "flexlayout":
      return <FlexLayoutNode selectedNode={selectedNode} dispatch={dispatch} />;
    case "box":
      return <BoxNode selectedNode={selectedNode} dispatch={dispatch} />;
    case "link":
      return <LinkNode selectedNode={selectedNode} dispatch={dispatch} />;
    case "text":
      return <TextNode selectedNode={selectedNode} dispatch={dispatch} />;
    case "image":
      return <ImageNode selectedNode={selectedNode} dispatch={dispatch} />;

  }
}

export default NodeProperty;
