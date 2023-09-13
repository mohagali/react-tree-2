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
  Edit
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
  TextField
} from "@mui/material";

import styles from "./CustomNode.module.css";

export const ElementSettings = (props) => {
  const { treeData, setTreeData, open, handleClose, getLastId, node } = props;
  const inputRef = React.useRef(null); // creates reference (to the invisible input)
  const [file, setFile] = React.useState(null);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleEditFile = (id, { k, v, t }) => {
    const targetNodeIndex = treeData.findIndex((n) => n.id === id);
    const targetNode = treeData[targetNodeIndex];

    if (t) {
      targetNode.data.text = t;
    }

    if (!targetNode[k]) return;
    targetNode[k] = v;
    // if (targetNode.direction === "row") targetNode.direction = "column";
    // else targetNode.direction = "row";
    setTreeData([...treeData]);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setFile(file);
      const targetNodeIndex = treeData.findIndex((n) => n.id === node.id);
      const targetNode = treeData[targetNodeIndex];
      if (file) {
        targetNode.data.image = URL.createObjectURL(file);
      }

      setTreeData([...treeData]);
    } else {
      setFile(null);
    }
  };

  const handleDelete = (id) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id)
    ];
    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

    setTreeData(newTree);
  };

  const handleEditFolder = (id, k, v) => {
    const targetNodeIndex = treeData.findIndex((n) => n.id === id);
    const targetNode = treeData[targetNodeIndex];
    if (!targetNode[k]) return;
    targetNode[k] = v;
    // if (targetNode.direction === "row") targetNode.direction = "column";
    // else targetNode.direction = "row";
    setTreeData([...treeData]);
  };

  const handleNewFolder = ({ text, parent }) => {
    const newNode = {
      text,
      parent,
      droppable: true,
      data: {
        direction: "row",
        content: "start"
      },
      direction: "row",
      content: "start"
    };

    const lastId = getLastId(treeData) + 1;

    setTreeData([
      ...treeData,
      {
        ...newNode,
        id: lastId
      }
    ]);
  };

  const handleNewFile = ({ text, parent }) => {
    const newNode = {
      text,
      parent,
      droppable: false,
      data: {
        fileType: "text"
      }
    };

    const lastId = getLastId(treeData) + 1;

    setTreeData([
      ...treeData,
      {
        ...newNode,
        id: lastId
      }
    ]);
  };

  const handleCopy = (id) => {
    const lastId = getLastId(treeData);
    const targetNode = treeData.find((n) => n.id === id);
    const descendants = getDescendants(treeData, id);
    const partialTree = descendants.map((node) => ({
      ...node,
      id: node.id + lastId,
      parent: node.parent + lastId
    }));

    setTreeData([
      ...treeData,
      {
        ...targetNode,
        id: targetNode.id + lastId
      },
      ...partialTree
    ]);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Settings</DialogTitle>
        <DialogContent dividers={true}>
          {node?.droppable ? (
            <Stack direction={"column"}>
              <Typography variant="subtitle1">Eelement</Typography>
              <Stack direction={"row"}>
                <div className={styles.actionButton}>
                  <IconButton size="small" onClick={() => handleCopy(node.id)}>
                    <FileCopy fontSize="small" />
                  </IconButton>
                </div>
                <div className={styles.actionButton}>
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleNewFolder({
                        text: "new Folder",
                        parent: props.node.id
                      })
                    }
                  >
                    <CreateNewFolder fontSize="small" />
                  </IconButton>
                </div>
                <div className={styles.actionButton}>
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleNewFile({ text: "new File", parent: props.node.id })
                    }
                  >
                    <NoteAdd fontSize="small" />
                  </IconButton>
                </div>
                <div className={styles.actionButton}>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(node.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </Stack>
              <Typography variant="subtitle1">Layout</Typography>
              <Stack direction={"row"} alignItems={"center"}>
                {/* <div className={styles.actionButton}>
              <IconButton
                size="small"
                onClick={() => handleEditFolder({ id: props.node.id })}
              >
                <Edit fontSize="small" />
              </IconButton>
            </div> */}
                <FormLabel>Direction:</FormLabel>
                <Radio
                  checked={node.direction === "row"}
                  onChange={() => handleEditFolder(node.id, "direction", "row")}
                  value="row"
                  name="radio-layout-direction"
                />
                Row
                <Radio
                  checked={node.direction === "column"}
                  onChange={() =>
                    handleEditFolder(node.id, "direction", "column")
                  }
                  value="column"
                  name="radio-layout-direction"
                />
                Column
              </Stack>
              <Stack direction={"row"} alignItems={"center"} flexWrap={"wrap"}>
                <FormLabel>Content:</FormLabel>
                <Radio
                  checked={node.content === "start"}
                  onChange={() => handleEditFolder(node.id, "content", "start")}
                  value="start"
                  name="radio-layout-content"
                />
                Start
                <Radio
                  checked={node.content === "center"}
                  onChange={() =>
                    handleEditFolder(node.id, "content", "center")
                  }
                  value="center"
                  name="radio-layout-content"
                />
                Center
                <Radio
                  checked={node.content === "end"}
                  onChange={() => handleEditFolder(node.id, "content", "end")}
                  value="end"
                  name="radio-layout-content"
                />
                End
                <Radio
                  checked={node.content === "space-between"}
                  onChange={() =>
                    handleEditFolder(node.id, "content", "space-between")
                  }
                  value="between"
                  name="radio-layout-content"
                />
                Between
                <Radio
                  checked={node.content === "space-around"}
                  onChange={() =>
                    handleEditFolder(node.id, "content", "space-around")
                  }
                  value="around"
                  name="radio-layout-content"
                />
                Around
                <Radio
                  checked={node.content === "space-evenly"}
                  onChange={() =>
                    handleEditFolder(node.id, "content", "space-evenly")
                  }
                  value="evenly"
                  name="radio-layout-content"
                />
                Evenly
              </Stack>
            </Stack>
          ) : (
            <Stack direction={"column"}>
              <Typography variant="subtitle1">Eelement</Typography>
              <Stack direction={"row"}>
                <div className={styles.actionButton}>
                  <IconButton size="small" onClick={() => handleCopy(node.id)}>
                    <FileCopy fontSize="small" />
                  </IconButton>
                </div>

                <div className={styles.actionButton}>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(node.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </Stack>

              {node?.data.fileType === "text" && (
                <Stack direction={"column"}>
                  <Typography variant="subtitle1">Text</Typography>
                  <TextField
                    fullWidth
                    value={node.data.text}
                    onChange={(e) => {
                      handleEditFile(node.id, { t: e.target.value });
                    }}
                  />
                </Stack>
              )}

              {node?.data.fileType === "image" && (
                <Stack direction={"column"}>
                  <Typography variant="subtitle1">Text</Typography>

                  <input
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                </Stack>
              )}

              {/* <div className={styles.actionButton}>
            <IconButton
              size="small"
              onClick={() => handleEditFolder({ id: props.node.id })}
            >
              <Edit fontSize="small" />
            </IconButton>
          </div> */}
            </Stack>
          )}

          {/* <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          > */}
          {/* <div className={styles.actionButton}>
            <IconButton size="small" onClick={() => handleDelete(node.id)}>
              <Delete fontSize="small" />
            </IconButton>
          </div>
          <div className={styles.actionButton}>
            <IconButton size="small" onClick={() => handleCopy(node.id)}>
              <FileCopy fontSize="small" />
            </IconButton>
          </div>
          {node?.droppable && (
            <div className={styles.actionButton}>
              <IconButton
                size="small"
                onClick={() =>
                  handleNewFolder({
                    text: "new Folder",
                    parent: props.node.id
                  })
                }
              >
                <CreateNewFolder fontSize="small" />
              </IconButton>
            </div>
          )}
          {node?.droppable && (
            <div className={styles.actionButton}>
              <IconButton
                size="small"
                onClick={() =>
                  handleNewFile({ text: "new File", parent: props.node.id })
                }
              >
                <NoteAdd fontSize="small" />
              </IconButton>
            </div>
          )}
          {node?.droppable && (
            <div className={styles.actionButton}>
              <IconButton
                size="small"
                onClick={() => handleEditFolder({ id: props.node.id })}
              >
                <Edit fontSize="small" />
              </IconButton>
            </div>
          )} */}
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={() => {}}>Save</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

// onDelete={handleDelete}
// onCopy={handleCopy}
// onNewFolder={handleNewFolder}
// onNewFile={handleNewFile}
// onEditFolder={handleEditFolder}
// onElementSettings={handleElementSettings}
