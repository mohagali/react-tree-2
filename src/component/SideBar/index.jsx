import React, { useState } from "react";
import TreeView from "./Tree";
import NodeProperty from "./NodeProperty";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import styles from "./styles.module.css";

function SideBar() {

    return <Box height={1} sx={{
        overflow:"hidden"
    }}  >
        <Stack height={1} direction={'column'}>
            <TreeView  />
            <NodeProperty 
            />
        </Stack>
    </Box>


}

export default SideBar;