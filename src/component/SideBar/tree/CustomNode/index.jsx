import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { ArrowRight } from "@mui/icons-material";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "../../../TypeIcon";
import styles from "./styles.module.css";
import { useNodes } from '../../../../context/NodesContext';

export const CustomNode = (props) => {
  // const [hover, setHover] = useState(false);

  const { id, droppable, data } = props.node;
  const { handleSelect, selectedNodeId } = useNodes()
  // const { onSettings } = props;
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  // const handleSelect = () => props.onSelect(props.node);

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <>
      <div
        className={`tree-node ${styles.root}`}
        style={{
          paddingInlineStart: indent,

        }}
        {...dragOverProps}
        // onMouseEnter={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
        onClick={() => { handleSelect(props.node.id) }}
      >
        <div
          className={`${styles.expandIconWrapper} ${props.isOpen ? styles.isOpen : ""
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
          <Typography className={styles.labelTextItem}
            sx={{
              fontWeight: props.node.id == selectedNodeId ? "bold" : "normal"
            }}
            variant="body2">{props.node.text}</Typography>
        </div>

      </div>

    </>
  );
};
