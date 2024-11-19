// src/components/AdminPanel.js
import React, { useContext } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Typography, Box, IconButton, useTheme, useMediaQuery, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PhoneIcon from '@mui/icons-material/Phone';
import PolicyIcon from '@mui/icons-material/Policy';
import MapIcon from '@mui/icons-material/Map';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';

import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import AboutUsAdmin from './AboutUsAdmin';
import UsersAdmin from './UsersAdmin';
import ContactUsAdmin from './ContactUsAdmin';
import PhoneDirectoryAdmin from './PhoneDirectoryAdmin';
import PolicyAdmin from './PolicyAdmin';
import PopularRouteAdmin from './PopularRouteAdmin';
import GalleryAdmin from './GalleryAdmin';
import TouristDestinationAdmin from './TouristDestinationAdmin';
import FAQAdmin from './FAQAdmin';
import TenderAdmin from './TenderAdmin';
import TermsPrivacyAdmin from './TermsPrivacyAdmin';

const drawerWidth = 240;

const AdminPanel = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext); // Get logout from context

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        logout(); // Call the logout function
        navigate('/'); // Redirect to home
    };

    const menuItems = [
        { text: 'About Us', icon: <DashboardIcon />, path: '/admin/about-us' },
        { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Contact Us', icon: <ContactMailIcon />, path: '/admin/contact-us' },
        { text: 'Phone Directory', icon: <PhoneIcon />, path: '/admin/phone-directory' },
        { text: 'Policy', icon: <PolicyIcon />, path: '/admin/policy' },
        { text: 'Popular Routes', icon: <MapIcon />, path: '/admin/popular-routes' },
        { text: 'Gallery', icon: <PhotoLibraryIcon />, path: '/admin/gallery' },
        { text: 'Tourist Destinations', icon: <LocationCityIcon />, path: '/admin/tourist-destinations' },
        { text: 'FAQs', icon: <QuestionAnswerIcon />, path: '/admin/faq' },
        { text: 'Tenders', icon: <DescriptionIcon />, path: '/admin/tenders' },
        { text: 'Terms & Privacy', icon: <GavelIcon />, path: '/admin/terms-privacy' },
    ];

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {menuItems.map((item) => (
                    <ListItem 
                        button 
                        key={item.text} 
                        component={Link} 
                        to={item.path}
                        selected={location.pathname === item.path}
                        onClick={isMobile ? handleDrawerToggle : undefined}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Admin Panel
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    <Button color="inherit" component={Link} to="/">Back to Home</Button>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant={isMobile ? 'temporary' : 'permanent'}
                    open={isMobile ? mobileOpen : true}
                    onClose={isMobile ? handleDrawerToggle : undefined}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Routes>
                    <Route path="about-us" element={<AboutUsAdmin />} />
                    <Route path="users" element={<UsersAdmin />} />
                    <Route path="contact-us" element={<ContactUsAdmin />} />
                    <Route path="phone-directory" element={<PhoneDirectoryAdmin />} />
                    <Route path="policy" element={<PolicyAdmin />} />
                    <Route path="popular-routes" element={<PopularRouteAdmin />} />
                    <Route path="gallery" element={<GalleryAdmin />} />
                    <Route path="tourist-destinations" element={<TouristDestinationAdmin />} />
                    <Route path="faq" element={<FAQAdmin />} />
                    <Route path="tenders" element={<TenderAdmin />} />
                    <Route path="terms-privacy" element={<TermsPrivacyAdmin />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default AdminPanel;