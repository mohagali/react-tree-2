import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import TitleIcon from "@mui/icons-material/Title";

export const TypeIcon = (props) => {
  if (props.droppable) {
    return <CheckBoxOutlineBlank />;
  }

  switch (props.fileType) {
    case "image":
      return <ImageIcon />;
    case "text":
      return <TitleIcon />;
    default:
      return null;
  }
};
