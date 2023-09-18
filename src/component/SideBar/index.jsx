import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

import {
    Tree,
    MultiBackend,
    getBackendOptions
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./tree/Node/CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { AddDialog } from "../NewElement/AddDialog";
import styles from "./SideBar.module.css";
import { Placeholder } from "./tree/PlaceHolder/Placeholder";
//import { ElementSettings } from "./ElementSettings2";

function SideBar({ treeData, setTreeData }) {

    const handleDrop = (newTree) => setTreeData(newTree);
    const [open, setOpen] = useState(false);
    const [settingsNode, setsettingsNode] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const handleSelect = (node) => {
         if(selectedNode && node.id==selectedNode.id)
         setSelectedNode(null)
        else
        setSelectedNode(node)
    };

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

    return <Box sx={{
        // backgroundColor:'green'
        // overflow:'scroll',
        // height: '100%',
       //  paddingRight:'2rem',
      //  marginRight: '1rem',
        // maxWidth: '200px'

    }}><DndProvider backend={MultiBackend} options={getBackendOptions()}>
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
                            isSelected={node.id === selectedNode?.id}
                            onSelect={handleSelect}
                            getLastId={getLastId}
                            setTreeData={setTreeData}
                            treeData={treeData}
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
        {/* <ElementSettings
            node={settingsNode}
            // open={openSettings}
            treeData={treeData}
            setTreeData={setTreeData}
            // handleClose={handleCloseSettings}
            getLastId={getLastId}
        /> */}
    </Box>


}

export default SideBar;

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
