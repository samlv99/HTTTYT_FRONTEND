import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Link, NavLink } from 'react-router-dom';
import Register from '../../feature/Auth/components/Register';
import { AccountCircle, Close } from '@material-ui/icons';
import Login from '../../feature/Auth/components/Login';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from '../../feature/Auth/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

const MODE = {
  REGISTER: 'register',
  LOGIN: 'login',
};
export default function Header() {
  const dispatch = useDispatch();
  const loggedInMember = useSelector((state) => state.auth.current);
  const isLoggedIn = !!loggedInMember?.member?._id;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /** Handle for menu avatar icon on header */
  const handleMemberClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMemberLogout = () => {
    const action = logout();
    dispatch(action);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeOutlinedIcon className={classes.menuButton} />

          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              SET HUST
            </Link>
          </Typography>

          <NavLink to="/home" className={classes.link}>
            <Button color="inherit">Home</Button>
          </NavLink>
          <NavLink to="/products" className={classes.link}>
            <Button color="inherit">Products</Button>
          </NavLink>
          <NavLink to="/about" className={classes.link}>
            <Button color="inherit">About</Button>
          </NavLink>
          <NavLink to="/help" className={classes.link}>
            <Button color="inherit">Help</Button>
          </NavLink>

          {!isLoggedIn && (
            <NavLink to="/login" className={classes.link} onClick={handleClickOpen}>
              <Button color="inherit">Login</Button>
            </NavLink>
          )}

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleMemberClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here.
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account. Register here.
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleMemberLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
