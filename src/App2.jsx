import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box, Stack, Typography, TextField, FormControl, Select, MenuItem } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from "@mui/material";
import SideBar from './component/SideBar/';
import { Preview } from "./component/Preview/index";
import { theme } from "./utils/theme";
import { NodesProvider } from './context/NodesContext';
import { Iframe } from "./component/Iframe";
const drawerWidth = 240;
const deviceScreens = [
  {
    label: 'Mobile',
    device: 'mobile',
    size: '350px'
  }, {
    label: 'Computer',
    device: 'pc',
    size: '100%'
  }

];
const App = () => {

  const [previewState, setPreviewState] = useState({
    label: 'Mobile',
    device: 'mobile',
    size: '350px'
  })

  const handlePreviewState = (event) => {
    const newDevice = deviceScreens.find(e => e.device == event.target.value)
    setPreviewState(newDevice)
  }

  return (

    <ThemeProvider theme={theme}>
      <NodesProvider>
        <CssBaseline />
        <Box sx={{
          display: 'flex',
          height: '100%',
          overflow: 'hidden'
        }}>
          {/* <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,

          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Preview
            </Typography>
          </Toolbar>
        </AppBar> */}
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',

              },

            }}
            variant="permanent"
            anchor="left"
          // ModalProps={{ disableScrollLock: true }}
          >
            {/* <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Pages
            </Typography>
          </Toolbar>
          <Divider /> */}
            <SideBar
              // treeData={treeData}
              setTreeData={() => { }}
            />

          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default' }}
          >
            <Toolbar sx={{
          justifyContent:'center'
            }} >
              
          
                <FormControl size="small">
                  <Select
                    value={previewState.device}
                    onChange={handlePreviewState}
                     sx={{
                      width:'8rem'
                     }}

                  >
                    {deviceScreens.map(e => {
                      return <MenuItem value={e.device}>
                        {e.label}
                      </MenuItem>

                    })}
                  </Select>
                </FormControl>
              
            </Toolbar>
            <Box sx={{
              width: previewState.size,
              marginX: 'auto',
              height: '100%',
              

            }}>


              <Iframe>
                <Preview />
              </Iframe>
            </Box>

          </Box>
        </Box>
      </NodesProvider>
    </ThemeProvider>
  );
}


export default App;
