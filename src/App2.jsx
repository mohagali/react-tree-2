import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Resizable } from "re-resizable";
import { ThemeProvider } from "@mui/material";
import SideBar from './component/SideBar/';
import { Preview } from "./component/Preview/index";
import { theme } from "./utils/theme";
import { NodesProvider } from './context/NodesContext';
const drawerWidth = 240;


const App = () => {

  return (

    <ThemeProvider theme={theme}>
      <NodesProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar
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
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',

            },
            overflow: 'hidden'
          }}
          variant="permanent"
          anchor="left"
        // ModalProps={{ disableScrollLock: true }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Pages
            </Typography>
          </Toolbar>
          <Divider />
          <SideBar
            // treeData={treeData}
             setTreeData={()=>{}}
          />
          {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
          {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          
          <Preview />

        </Box>
      </Box>
      </NodesProvider>
    </ThemeProvider>
  );
}


// const App = () => {
//   const classes = useStyles();
//   const [open, setOpen] = useState(true);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className={classes.root}>
//       <Drawer
//         variant="permanent"
//         className={classes.drawer}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         {open && (
//           <Resizable
//             defaultSize={{
//               width: parseInt(drawerWidth, 10),
//               height: '100%',
//             }}
//             minWidth={parseInt(drawerWidth, 10)} // Minimum width (1/5)
//             maxWidth="20%" // Maximum width (1/4)
//             enable={{
//               right: true, // Allow resizing from the right edge
//             }}
//           >
//             <div>
//               <IconButton onClick={handleDrawerClose}>
//                 {'ltr'=== 'rtl' ? ( //theme.direction
//                   <ChevronRightIcon />
//                 ) : (
//                   <ChevronLeftIcon />
//                 )}
//               </IconButton>
//               {/* Your sidebar content goes here */}
//               Sidebar Content
//             </div>
//           </Resizable>
//         )}
//       </Drawer>
//       <main className={classes.content}>
//         <div>
//           {/* Your main content goes here */}
//           Main Content
//         </div>
//       </main>
//     </div>
//   );
// };

 export default App;
