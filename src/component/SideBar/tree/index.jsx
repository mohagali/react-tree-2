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
import { CustomNode } from "./CustomNode";
import { DragPreview } from "./DragPreview";
import { Placeholder } from "./PlaceHolder";

import styles from "./styles.module.css";
import { useNodes, useNodesDispatch } from '../../../context/NodesContext';
import { getLastId } from "../../../utils/nodes";
//import { ElementSettings } from "./ElementSettings2";

const TreeView=()=> {

    const { nodes } = useNodes()
    const dispatch = useNodesDispatch()

    const handleDrop = (newNodes) => {

        dispatch({
            type: 'drop',
            newNodes: newNodes
        });
    }

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
        flex:1,
        overflow: 'scroll'
    }}><DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.app}>
            {/* <div>
                <Button onClick={handleOpenDialog} startIcon={<AddIcon />}>
                    Add Node
                </Button>
                {open && (
                    <AddDialog
                        tree={nodes}
                        onClose={handleCloseDialog}
                        onSubmit={handleSubmit}
                    />
                )}
            </div> */}
            <Tree
                tree={nodes}
                rootId={0}
                sort={false}
                insertDroppableFirst={false}
                dropTargetOffset={5}
                canDrop={(nodes, { dragSource, dropTargetId }) => {
                    if (dragSource?.parent === dropTargetId) {
                        return true;
                    }
                }}
                render={(node, options) => (
                    <CustomNode
                        tree={nodes}
                        node={node}
                        {...options}
                    />
                )}
                dragPreviewRender={(monitorProps) => (
                    <DragPreview monitorProps={monitorProps} />
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
    </DndProvider></Box>




}

export default TreeView;