import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { ElementSettings } from "../../propertyNode";

import {
  ArrowRight,
  Delete,
  FileCopy,
  NoteAdd,
  CreateNewFolder,
  Edit
} from "@mui/icons-material";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "../../../TypeIcon";
import styles from "./CustomNode.module.css";

export const CustomNode = (props) => {
  const [hover, setHover] = useState(false);

  const { id, droppable, data } = props.node;
  const { onSettings } = props;
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleSelect = () => props.onSelect(props.node);

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <>
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleSelect}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRight />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable} fileType={data?.fileType} />
      </div>
      <div className={styles.labelGridItem}>
        <Typography className={styles.labelTextItem}  variant="body2">{props.node.text}</Typography>
      </div>
      {/* {hover && (
        <>
          <div className={styles.actionButton}>
            <IconButton size="small" onClick={() => onSettings(props.node)}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </div>
        </>
      )} */}
    </div>
    {/* {props.isSelected && <p>selected</p>} */}
    {props.isSelected && <ElementSettings 
                            
                            node={props.node}
                            getLastId={props.getLastId}
                            setTreeData={props.setTreeData}
                            treeData={props.treeData}

      />}
    </>
  );
};
