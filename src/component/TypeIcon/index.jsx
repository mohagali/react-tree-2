import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import TitleIcon from "@mui/icons-material/Title";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import WebIcon from '@mui/icons-material/Web';

export const TypeIcon = (props) => {
  // if (props.droppable) {
  //   return <CheckBoxOutlineBlank />;
  // }

  switch (props.iconType) {
    case "image":
      return <ImageIcon />;
    case "text":
      return <TitleIcon />;
    case "row":
      return <ViewColumnIcon />;
    case "column":
      return <TableRowsIcon />;
    case "box":
      return <CheckBoxOutlineBlank />;
    case "link":
      return <InsertLinkIcon />;
    case "page":
      return <WebIcon />;
    default:
      return null;
  }
};
