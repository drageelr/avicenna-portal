import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, CardMedia, Grid, Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, Menu, MenuItem, IconButton, Drawer, ListItemIcon, ListItemText, Divider, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PollIcon from '@material-ui/icons/Poll';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup';
import logoPath from '../logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    media: {
        flexGrow: 1,
        height: 40,
        width: 174
    },
    login: {
        flexGrow: 1,
        fontWeight: 'bold',
        fontSize: 18,
        color: "#0d47a1"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: 'bold',
        fontSize: 24,
        color: "#cc0e0e"
    },
    roundButton: {
        padding: 18,
        margin: 10,
    },
}));

const validationSchemaLogin = yup.object({
    phone: yup
    .string('Enter your phone')
    .min(13, 'Phone must be of 13 digits')
    .max(13, 'Phone must be of 13 digits')
    .required('Phone is required'),
    password: yup
    .string("Enter your password")
    .min(8, 'Password should be of minimum 8 characters length')
    .max(30, 'Password should be of maximum 30 characters length')
    .required('Password is required')
});

const validationSchemaCPass = yup.object({
    oldPassword: yup
    .string("Enter your old password")
    .min(8, 'Old password should be of minimum 8 characters length')
    .max(30, 'Old password should be of maximum 30 characters length')
    .required('Old password is required'),
    newPassword: yup
    .string("Enter your new password")
    .min(8, 'New password should be of minimum 8 characters length')
    .max(30, 'New password should be of maximum 30 characters length')
    .required('New password is required')
});

function NavBar(props) {
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openCPass, setOpenCPass] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState(null);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [user, setUser] = React.useState(props.user);

    const classes = useStyles();

    const handleOpenLogin = () => {
        setOpenLogin(true);
    }

    const handleCloseLogin = () => {
        setOpenLogin(false);
    }

    const handleOpenCPass = () => {
        setOpenCPass(true);
    }

    const handleCloseCPass = () => {
        setOpenCPass(false);
    }

    const handleOpenDrawer = () => {
        setOpenDrawer(true);
    }

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    }

    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setOpenMenu(null);
    }

    const handleClickLogout = () => {
        console.log("handleClickLogout");
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userAdmin");
        setOpenMenu(null);
        setUser(false);
        props.handleSetUser(false);
    }

    const formikLogin = useFormik({
        initialValues: {
            phone: '',
            password: ''
        },
        validationSchema: validationSchemaLogin,
        onSubmit: (values) => {
            handleCloseLogin();
            alert(JSON.stringify(values, null, 2));
        }
    });

    const formikCPass = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: ''
        },
        validationSchema: validationSchemaCPass,
        onSubmit: (values) => {
            handleCloseCPass();
            alert(JSON.stringify(values, null, 2));
        }
    })

    function RoundLinkButton({ link, icon, title }) {
        return (
            <Grid container direction='column' alignItems='center' style={{paddingBottom: 16}}>
                <Grid item xs> 
                    <Link to={link}>
                        <IconButton color='primary' onClick={handleCloseDrawer} classes={classes.roundButton} style={{backgroundColor: 'white'}}>
                            {icon}
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item>
                    <Typography color='secondary' variant="h6">
                    <Box fontSize={18} m={1} marginTop={0.2}>
                        {title}
                    </Box>
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {
                        user &&
                        <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu" onClick={handleOpenDrawer}>
                            <MenuIcon />
                        </IconButton>
                    }
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item>
                            <CardMedia image={logoPath} className={classes.media} title="Logo"/>
                        </Grid>
                        <Grid item>
                            <Typography fontWeightBold={100} className={classes.title}>
                                Portal
                            </Typography>
                        </Grid>
                    </Grid>
                    {
                        (
                            !user &&
                            <Button className={classes.login} onClick={handleOpenLogin}>Login</Button>
                        )
                        ||
                        (
                            user &&
                            <Button className={classes.login} aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenMenu}>{user.name}</Button>
                        )
                    }
                </Toolbar>

                <Dialog open={openLogin} onClose={handleCloseLogin} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please provide your credentials below to login!
                            </DialogContentText>
                            <TextField
                            fullWidth
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={formikLogin.values.phone}
                            placeholder="+923xxxxxxxxx"
                            onChange={formikLogin.handleChange}
                            error={formikLogin.touched.phone && Boolean(formikLogin.errors.phone)}
                            helperText={formikLogin.touched.phone && formikLogin.errors.phone}
                            color="secondary"
                            />
                            <TextField
                            fullWidth
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            value={formikLogin.values.password}
                            placeholder="Password"
                            type="password"
                            onChange={formikLogin.handleChange}
                            error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                            helperText={formikLogin.touched.password && formikLogin.errors.password}
                            color="secondary"
                            />
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseLogin} color="secondary">
                            Close
                        </Button>
                        <Button onClick={formikLogin.handleSubmit} color="secondary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>

                <Menu
                id="simple-menu"
                anchorEl={openMenu}
                keepMounted
                open={Boolean(openMenu)}
                onClose={handleCloseMenu}
                >
                    <MenuItem onClick={() => {handleCloseMenu();handleOpenCPass();}}><ListItemIcon><LockIcon color="secondary"/></ListItemIcon><ListItemText>Change Password</ListItemText></MenuItem>
                    <MenuItem onClick={handleClickLogout}><ListItemIcon><ExitToAppIcon color="secondary"/></ListItemIcon><ListItemText>Logout</ListItemText></MenuItem>
                </Menu>

                <Dialog open={openCPass} onClose={handleCloseCPass} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please provide your old and new password below!
                            </DialogContentText>
                            <TextField
                            fullWidth
                            margin="dense"
                            id="oldPassword"
                            name="oldPassword"
                            label="Old Password"
                            value={formikCPass.values.oldPassword}
                            placeholder="Old Password"
                            type="password"
                            onChange={formikCPass.handleChange}
                            error={formikCPass.touched.oldPassword && Boolean(formikCPass.errors.oldPassword)}
                            helperText={formikCPass.touched.oldPassword && formikCPass.errors.oldPassword}
                            color="secondary"
                            />
                            <TextField
                            fullWidth
                            margin="dense"
                            id="newPassword"
                            name="newPassword"
                            label="New Password"
                            value={formikCPass.values.newPassword}
                            placeholder="New Password"
                            type="password"
                            onChange={formikCPass.handleChange}
                            error={formikCPass.touched.newPassword && Boolean(formikCPass.errors.newPassword)}
                            helperText={formikCPass.touched.newPassword && formikCPass.errors.newPassword}
                            color="secondary"
                            />
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseCPass} color="secondary">
                            Close
                        </Button>
                        <Button onClick={formikCPass.handleSubmit} color="secondary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Drawer anchor="left" open={openDrawer} onClose={handleCloseDrawer}>
                    <Grid container direction="column" justifyContent="flex-end">
                        <RoundLinkButton link={'/'} icon={<HomeIcon fontSize='large' color="secondary"/>} title={'Home'}/>
                        <RoundLinkButton link={'/polls'} icon={<PollIcon fontSize='large' color="secondary"/>} title={'Polls'}/>
                        {
                            (() => {
                                if (user)
                                    if (user.admin)
                                        return true;
                                    else
                                        return false;
                                else
                                    return false;
                            })() &&
                            <RoundLinkButton link={'/users'} icon={<AccountBoxIcon fontSize='large' color="secondary"/>} title={'Users'}/>
                        }
                    </Grid>
                    <Divider/>
                </Drawer>

            </AppBar>
        </div>
    );
}

export default NavBar;