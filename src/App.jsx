import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Tree,
  MultiBackend,
  getDescendants,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { AddDialog } from "./AddDialog";
import { Preview } from "./Preview";
import { theme } from "./theme";
import styles from "./App.module.css";
//import SampleData from "./sample_data.json";
import { Placeholder } from "./Placeholder";
import { ElementSettings } from "./ElementSettings";

const previewRender = (jsx) => {
  let html = ReactDOMServer.renderToString(jsx);

  console.log(html);
};

// const SampleData = ;

function App2() {
  const [treeData, setTreeData] = useState([
    {
      id: 1,
      parent: 0,
      droppable: true,
      text: "Row 1",
      data: {
        direction: "row",
        fileType: "row"
      }
    },
    {
      id: 2,
      parent: 1,
      droppable: false,
      text: "Image 1-1",
      data: {
        fileType: "image"
      }
    },
    {
      id: 3,
      parent: 1,
      droppable: false,
      text: "Text 1-2",
      data: {
        fileType: "text"
      }
    },
    {
      id: 4,
      parent: 0,
      droppable: true,
      text: "Column 2",
      data: {
        fileType: "column",
        direction: "column"
      }
    },
    {
      id: 5,
      parent: 4,
      droppable: true,
      text: "Row 2-1",
      data: {
        fileType: "link",
        link: "https://studio.grapesjs.com/"
      }
    },
    {
      id: 6,
      parent: 5,
      droppable: false,
      text: "Text 2-1-1",
      data: {
        fileType: "text"
      }
    },
    {
      id: 7,
      parent: 5,
      droppable: false,
      text: "Text 2-1-2",
      data: {
        fileType: "text"
      }
    },
    {
      id: 8,
      parent: 10,
      droppable: false,
      text: "Image 1-1",
      data: {
        fileType: "image"
      }
    },
    {
      id: 9,
      parent: 10,
      droppable: false,
      text: "Text 1-2",
      data: {
        fileType: "text"
      }
    },
    {
      id: 10,
      parent: 1,
      droppable: true,
      text: "Box 1",
      data: {
        fileType: "box"
      }
    }
  ]);
  const handleDrop = (newTree) => setTreeData(newTree);
  const [open, setOpen] = useState(false);
  const [settingsNode, setsettingsNode] = useState(null);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const [openSettings, setOpenSettings] = React.useState(false);

  const handleClickOpenSettings = (node) => {
    setsettingsNode(node);
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setsettingsNode(null);
    setOpenSettings(false);
  };

  const handleSubmit = (newNode) => {
    const lastId = getLastId(treeData) + 1;

    setTreeData([
      ...treeData,
      {
        ...newNode,

        id: lastId
      }
    ]);

    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <div className={styles.app}>
              <div>
                <Button onClick={handleOpenDialog} startIcon={<AddIcon />}>
                  Add Node
                </Button>
                {open && (
                  <AddDialog
                    tree={treeData}
                    onClose={handleCloseDialog}
                    onSubmit={handleSubmit}
                  />
                )}
              </div>
              <Tree
                tree={treeData}
                rootId={0}
                sort={false}
                insertDroppableFirst={false}
                dropTargetOffset={5}
                canDrop={(tree, { dragSource, dropTargetId }) => {
                  if (dragSource?.parent === dropTargetId) {
                    return true;
                  }
                }}
                render={(node, options) => (
                  <CustomNode
                    tree={treeData}
                    node={node}
                    {...options}
                    onSettings={handleClickOpenSettings}
                    setsettingsNode={setsettingsNode}
                  />
                )}
                dragPreviewRender={(monitorProps) => (
                  <CustomDragPreview monitorProps={monitorProps} />
                )}
                placeholderRender={(node, { depth }) => (
                  <Placeholder node={node} depth={depth} />
                )}
                onDrop={handleDrop}
                classes={{
                  root: styles.treeRoot,
                  draggingSource: styles.draggingSource,
                  // dropTarget: styles.dropTarget,
                  placeholder: styles.placeholderContainer
                }}
              />
            </div>
          </DndProvider>
          <ElementSettings
            node={settingsNode}
            open={openSettings}
            treeData={treeData}
            setTreeData={setTreeData}
            handleClose={handleCloseSettings}
            getLastId={getLastId}
          />
        </Grid>
        <Grid item xs={6} sx={{ border: "1px solid" }}>
          <Preview tree={treeData} />
        </Grid>
      </Grid>
      <Grid sx={{ padding: "1rem" }} item xs={6} justifyContent="end">
        <Button
          variant={"outlined"}
          sx={{
            display: "block",
            marginX: "auto"
          }}
          onClick={() => {
            previewRender(<Preview tree={treeData} />);
          }}
        >
          to HTML
        </Button>
      </Grid>
    </ThemeProvider>
  );
}

export default App2;

const getLastId = (treeData) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id;
  }

  return 0;
};
// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';

// export default function CustomTextBox() {
//   const [attributes, setAttributes] = useState({
//     text: 'Hello, World!',
//     fontSize: 16,
//     fontColor: '#000000',
//     // Add more attributes as needed (e.g., fontFamily, backgroundColor, etc.)
//   });

//   const handleAttributeChange = (attributeName) => (event) => {
//     setAttributes({
//       ...attributes,
//       [attributeName]: event.target.value,
//     });
//   };

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={4}>
//         <Paper sx={{
//           display:"flex",
//           flexDirection:"column",
//           gap:"0.5rem",
//           padding:"4px"
//         }}>
//           <Typography variant="h6">Style</Typography>
//           <TextField
//             label="Text"
//             variant="outlined"
//             value={attributes.text}
//             onChange={handleAttributeChange('text')}
//           />
//           <Typography variant="h6">Sizing</Typography>
//           <TextField
//             label="Font Size"
//             variant="outlined"
//             value={attributes.fontSize}
//             onChange={handleAttributeChange('fontSize')}
//           />
//           {/* Add more sections and attributes here */}
//         </Paper>
//       </Grid>
//       <Grid item xs={8}>
//         <Paper >
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             height="100vh"
//           >
//             <Typography
//               variant="body1"
//               style={{
//                 fontSize: `${attributes.fontSize}px`,
//                 color: attributes.fontColor,
//               }}
//             >
//               {attributes.text}
//             </Typography>
//           </Box>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }
