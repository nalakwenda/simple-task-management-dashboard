import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {useNavigate, useLocation} from 'react-router-dom';
import {purple} from '@mui/material/colors';
import {Button, Grid} from '@mui/material';
import {logout} from '../../redux/slices/AuthSlice';
import {useAppDispatch} from '../../redux/hooks';


const drawerWidth = 240;

interface Props
{
    children?: any;
    title?: string;
    window?: () => Window;
}

const drawerContent = [
    {
        icon: <DashboardIcon />,
        name: "Dashboard",
        url: "/dashboard"
    },
    {
        icon: <CalendarMonthIcon />,
        name: "Calendar",
        url: "/calendar"
    },
    {
        icon: <AssignmentIcon />,
        name: "Projects",
        url: "/projects"
    },

]



export default function AppLayout (props: Props)
{
    const {window, children, title} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const color = purple[300];
    


    const handleDrawerToggle = () =>
    {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Grid container justifyContent="center" sx={{marginBottom: "20%"}}> <Grid item><Typography variant="h4">Notesy</Typography></Grid> </Grid>
            <Divider />

            <List>
                {drawerContent.map((content, index) =>
                {

                    return (
                        <ListItem key={index} disablePadding sx={{padding: "0.5rem"}} onClick={() => {navigate(content.url)}} >
                            <ListItemButton sx={{borderRadius: "2rem", backgroundColor: `${location.pathname}` === content.url ? `${color}` : "white"}}>
                                <ListItemIcon sx={{color: `${location.pathname}` === content.url ? "white" : "black"}}>
                                    {content.icon}
                                </ListItemIcon>
                                <ListItemText sx={{color: `${location.pathname}` === content.url ? "white" : "black"}} primary={content.name} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Divider />
            <Grid container justifyContent="center" sx={{marginTop:"20%"}}> <Grid item><Button color="secondary" variant="outlined" onClick={() => {dispatch(logout())}}>Logout</Button></Grid> </Grid>
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
                color="secondary"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}, height: "100vh"}}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}, background: "#F8F8F8"}}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
