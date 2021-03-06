import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Avatar,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import navLogo from "../../images/navLogo.png";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import SearchBar from "../../pages/Main/Search/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { UserContext } from "../../context/userContext";

const Tabs = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const logo = <img src={navLogo} alt="navLogo" />;

  //menu state and handlers
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //mobile menu state and handlers
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/profile");
        }}
      >
        <IconButton size="small" color="inherit">
          <AccountCircle />
        </IconButton>
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/settings");
        }}
      >
        <IconButton size="small" color="inherit">
          <Settings />
        </IconButton>
        Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          userContext.logout();
          navigate("/login");
        }}
      >
        <IconButton size="small" color="inherit">
          <Logout />
        </IconButton>
        Logout
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        key="likedPosts"
        onClick={() => {
          navigate("/liked");
        }}
      >
        <FavoriteBorderIcon /> Liked posts
      </MenuItem>
      <MenuItem
        key="createPost"
        onClick={() => {
          navigate("/create");
        }}
      >
        <AddIcon /> New post
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="small" color="inherit">
          <AccountCircle />
        </IconButton>
        <Typography>Profile</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography
            noWrap
            component="div"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              display: {
                xs: "none",
                sm: "block",
                ":hover": { cursor: "pointer" },
              },
            }}
          >
            {logo}
          </Typography>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <MenuItem
              key="likedPosts"
              onClick={() => {
                navigate("/liked");
              }}
            >
              <FavoriteBorderIcon /> Liked posts
            </MenuItem>
            <MenuItem
              key="createPost"
              onClick={() => {
                navigate("/create");
              }}
            >
              <AddIcon /> New post
            </MenuItem>
            <IconButton size="large" edge="end" onClick={handleProfileMenuOpen}>
              <Avatar src={userContext.user.avatar} alt="avatar" />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/*rendering second Toolbar component to fix a visual bug when using position='fixed' on AppBar (check Material UI docs)*/}
      <Toolbar />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Tabs;
