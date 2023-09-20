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
import { useNodes, useNodesDispatch } from '../../../context/NodesContext';

const NodeProperty = () => {

  const dispatch = useNodesDispatch();
  const { selectedNodeId,nodes } = useNodes()

  const selectedNode=nodes.find(e=>e.id===selectedNodeId);
  console.log("find node",selectedNode)
  const inputRef = React.useRef(null); // creates reference (to the invisible input)
  // const [file, setFile] = React.useState(null);

  // const myRef = React.useRef(null);

  // React.useEffect(() => {
  //   if (myRef.current) {
  //     // Access the style object of the element
  //     const elementStyle = myRef.current.style;

  //     // Access and edit individual style properties
  //     elementStyle.backgroundColor = 'red';
  //     elementStyle.fontSize = '24px';

  //     // List all style attributes
  //     for (let i = 0; i < elementStyle.length; i++) {
  //       const styleAttribute = elementStyle[i];
  //       const styleValue = elementStyle[styleAttribute];
  //       console.log(`${styleAttribute}: ${styleValue}`);
  //     }
  //   }
  // }, [])


  const handleEditFile = ({ k, v }) => {

    dispatch({
      type: 'changed',
      node: {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          [k]: v
        }
      }
    });


    // if (t) {
    //   selectedNode.data.text = t;
    // }

    // if (selectedNode[k]) targetNode[k] = v;
    // if (targetNode.direction === "row") targetNode.direction = "column";
    // else targetNode.direction = "row";
    //setTreeData([...treeData]);
  };

  const handleFileChange = (e) => {
    // const files = e.target.files;
    // if (files.length > 0) {
    //   const file = files[0];
    //   setFile(file);
    //   const targetNodeIndex = treeData.findIndex((n) => n.id === node.id);
    //   const targetNode = treeData[targetNodeIndex];
    //   if (file) {
    //     targetNode.data.image = URL.createObjectURL(file);
    //   }

    //   setTreeData([...treeData]);
    // } else {
    //   setFile(null);
    // }
  };

  const handleDelete = () => {
    dispatch({
      type: 'deleted',
      id: selectedNode.id
    });
  };

  const handleEditFolder = (id, k, v) => {
    // const targetNodeIndex = treeData.findIndex((n) => n.id === id);
    // const targetNode = treeData[targetNodeIndex];
    // if (!targetNode.data[k]) return;
    // targetNode.data[k] = v;
    // // if (targetNode.direction === "row") targetNode.direction = "column";
    // // else targetNode.direction = "row";
    // setTreeData([...treeData]);
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

  const handleCopy = (id) => {
    // const lastId = getLastId(treeData);
    // const targetNode = treeData.find((n) => n.id === id);
    // const descendants = getDescendants(treeData, id);
    // const partialTree = descendants.map((node) => ({
    //   ...node,
    //   id: node.id + lastId,
    //   parent: node.parent + lastId
    // }));

    // setTreeData([
    //   ...treeData,
    //   {
    //     ...targetNode,
    //     id: targetNode.id + lastId
    //   },
    //   ...partialTree
    // ]);
  };
  if (!selectedNode)
    return null
  return (
    <Box sx={{
      padding: "1rem",
      border: "1px solid grey",
      borderLeft: "none",
      borderRight: "none",
      flex: 1


    }}>

      {selectedNode?.droppable ? (
        <Stack direction={"column"}>
          <Typography variant="subtitle1">Eelement</Typography>
          <Stack direction={"row"}>
            <div className={styles.actionButton}>
              <IconButton size="small" onClick={() => handleCopy(selectedNode.id)}>
                <FileCopy fontSize="small" />
              </IconButton>
            </div>
            <div className={styles.actionButton}>
              <IconButton
                size="small"
                onClick={() =>
                  handleNewFolder({
                    text: "new Folder",
                    parent: selectedNode.id
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
                  handleNewFile({ text: "new File", parent: selectedNode.id })
                }
              >
                <NoteAdd fontSize="small" />
              </IconButton>
            </div>
            <div className={styles.actionButton}>
              <IconButton
                size="small"
                onClick={
                  () => handleDelete()
                }
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
                onClick={() => handleEditFolder({ id: selectedNode.id })}
              >
                <Edit fontSize="small" />
              </IconButton>
            </div> */}
            <FormLabel>Direction:</FormLabel>
            <Radio
              checked={selectedNode?.data.direction === "row"}
              onChange={() => handleEditFolder(selectedNode.id, "direction", "row")}
              value="row"
              name="radio-layout-direction"
            />
            Row
            <Radio
              checked={selectedNode?.data.direction === "column"}
              onChange={() =>
                handleEditFolder(selectedNode.id, "direction", "column")
              }
              value="column"
              name="radio-layout-direction"
            />
            Column
          </Stack>
          <Stack direction={"row"} alignItems={"center"} flexWrap={"wrap"}>
            <FormLabel>Content:</FormLabel>
            <Radio
              checked={selectedNode?.data.content === "start"}
              onChange={() => handleEditFolder(selectedNode.id, "content", "start")}
              value="start"
              name="radio-layout-content"
            />
            Start
            <Radio
              checked={selectedNode?.data.content === "center"}
              onChange={() =>
                handleEditFolder(selectedNode.id, "content", "center")
              }
              value="center"
              name="radio-layout-content"
            />
            Center
            <Radio
              checked={selectedNode?.data.content === "end"}
              onChange={() => handleEditFolder(selectedNode.id, "content", "end")}
              value="end"
              name="radio-layout-content"
            />
            End
            <Radio
              checked={selectedNode?.data.content === "space-between"}
              onChange={() =>
                handleEditFolder(selectedNode.id, "content", "space-between")
              }
              value="between"
              name="radio-layout-content"
            />
            Between
            <Radio
              checked={selectedNode?.data.content === "space-around"}
              onChange={() =>
                handleEditFolder(selectedNode.id, "content", "space-around")
              }
              value="around"
              name="radio-layout-content"
            />
            Around
            <Radio
              checked={selectedNode?.data.content === "space-evenly"}
              onChange={() =>
                handleEditFolder(selectedNode.id, "content", "space-evenly")
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
              <IconButton size="small" onClick={() => handleCopy(selectedNode.id)}>
                <FileCopy fontSize="small" />
              </IconButton>
            </div>

            <div className={styles.actionButton}>
              <IconButton
                size="small"
                onClick={() => handleDelete(selectedNode.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </div>
          </Stack>

          {selectedNode?.data.fileType === "text" && (
            <Stack direction={"column"}>
              <Typography variant="subtitle1">Text</Typography>
              <TextField
                fullWidth
                value={selectedNode?.data.text || ""}
                onChange={(e) => {
                  handleEditFile({ k: "text", v: e.target.value });
                }}
              />
            </Stack>
          )}

          {selectedNode?.data.fileType === "image" && (
            <Stack direction={"column"}>
              <Typography variant="subtitle1">Image source</Typography>

              <input
                // ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />
            </Stack>
          )}

          {/* <StyleEditor /> */}

          {/* <div onClick={()=>{
               if (myRef.current) {
                // Get the computed style object
                const computedStyle = window.getComputedStyle(myRef.current);
          
                // Access and list all default style properties
                for (let i = 0; i < computedStyle.length; i++) {
                  const styleProperty = computedStyle[i];
                  const styleValue = computedStyle.getPropertyValue(styleProperty);
                  console.log(`${styleProperty}: ${styleValue}`);
                }
              }

          }} style={{ backgroundColor: 'blue', fontSize: '16px' }}>
            This is a div element with inline styles.
          </div> */}

          {/* <div className={styles.actionButton}>
            <IconButton
              size="small"
              onClick={() => handleEditFolder({ id: selectedNode.id })}
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
                    parent: selectedNode.id
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
                  handleNewFile({ text: "new File", parent: selectedNode.id })
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
                onClick={() => handleEditFolder({ id: selectedNode.id })}
              >
                <Edit fontSize="small" />
              </IconButton>
            </div>
          )} */}
      {/* </DialogContentText> */}

    </Box>
  );
};

function StyleEditor() {
  const [selectedProperty, setSelectedProperty] = React.useState('');
  const [propertyValue, setPropertyValue] = React.useState('');
  const [computedStyle, setComputedStyle] = React.useState([])
  const myRef = React.useRef(null);

  React.useEffect(() => {

    if (myRef.current) {
      // Get the computed style object
      const computedStyle = window.getComputedStyle(myRef.current);
      setComputedStyle(computedStyle)

    }

  }, [])

  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value);
  };

  const handleValueChange = (e) => {
    setPropertyValue(e.target.value);
  };

  const applyStyle = () => {
    if (myRef.current && selectedProperty && propertyValue) {
      myRef.current.style[selectedProperty] = propertyValue;
    }
  };

  return (
    <div>
      <div>
        <label>Select a style property:</label>
        <select onChange={handlePropertyChange}>
          <option value="">Select Property</option>
          {computedStyle && Object.keys(computedStyle).map(k => {
            const styleProperty = computedStyle[k];
            const styleValue = computedStyle.getPropertyValue(styleProperty);
            return <option value={styleProperty}>{styleProperty} </option>
          })

          }
          {/* <option value="backgroundColor">Background Color</option>
          <option value="color">Text Color</option>
          <option value="fontSize">Font Size</option> */}
          {/* Add more properties as needed */}
        </select>
      </div>
      <div>
        <label>Enter a new value:</label>
        <input
          type="text"
          value={propertyValue}
          onChange={handleValueChange}
          placeholder="Enter a value"
        />
      </div>
      <button onClick={applyStyle}>Apply Style</button>
      <div ref={myRef} style={{ padding: '20px' }}>
        This is an element you can style.
      </div>
    </div>
  );
}

export default NodeProperty;
