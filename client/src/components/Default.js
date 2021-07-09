import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Card, CardContent, Grid, Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(2),
            height: theme.spacing(100)
        }
    },
    textBig: {
        flexGrow: 1,
        fontWeight: 'bold',
        fontSize: 26,
        color: "#0d47a1"
    },
    textBig2: {
        flexGrow: 1,
        fontWeight: 'bold',
        fontSize: 26,
        color: "#cc0e0e"
    },
    text: {
        flexGrow: 1,
        fontSize: 20,
        color: "#0d47a1"
    },
    text2: {
        flexGrow: 1,
        fontSize: 20,
        color: "#cc0e0e"
    },
    title: {
        flexGrow: 1,
        fontWeight: 'bold',
        fontSize: 36,
        color: "#cc0e0e"
    },
    cardRoot: {
        maxWidth: 345,
        maxHeight: 100,
    },
    paperRoot: {
        backgroundColor: "#0d47a1"
    },
    redButton: {
        backgroundColor: "#cc0e0e",
        color: 'white',
        '&:hover': {
            backgroundColor: "#a30b0b",
            color: 'white',
        }
    }
}));

const validationSchemaRegister = yup.object({
    name: yup
    .string('Enter your name')
    .min(3, 'Name should be of minimum 3 characters length')
    .max(30, 'Name should be of maximum 30 characters length')
    .required('Name is required'),
    phone: yup
    .string('Enter your phone')
    .min(13, 'Phone must be of 13 digits')
    .max(13, 'Phone must be of 13 digits')
    .required('Phone is required'),
    password: yup
    .string("Enter your password")
    .min(8, 'Password should be of minimum 8 characters length')
    .max(30, 'Password should be of maximum 30 characters length')
    .required('Password is required'),
    apiKey: yup
    .string("Enter your API Key")
    .min(6, 'API Key should be of minimum 6 characters length')
    .max(6, 'API Key should be of maximum 6 characters length')
    .required('API Key is required'),
});

const validationSchemaActivate = yup.object({
    phone: yup
    .string('Enter your phone')
    .min(13, 'Phone must be of 13 digits')
    .max(13, 'Phone must be of 13 digits')
    .required('Phone is required'),
    otp: yup
    .string("Enter your OTP")
    .min(5, 'OTP should be of minimum 5 characters length')
    .max(5, 'OTP should be of maximum 5 characters length')
    .required('OTP is required')
});

const validationSchemaForgot = yup.object({
    phone: yup
    .string('Enter your phone')
    .min(13, 'Phone must be of 13 digits')
    .max(13, 'Phone must be of 13 digits')
    .required('Phone is required')
});

function Default() {
    const [openRegister, setOpenRegister] = React.useState(false);
    const [openActivate, setOpenActivate] = React.useState(false);
    const [openForgot, setOpenForgot] = React.useState(false);

    const classes = useStyles();

    const handleOpenRegister = () => {
        setOpenRegister(true);
    }

    const handleCloseRegister = () => {
        setOpenRegister(false);
    }

    const handleOpenActivate = () => {
        setOpenActivate(true);
    }

    const handleCloseActivate = () => {
        setOpenActivate(false);
    }

    const handleOpenForgot = () => {
        setOpenForgot(true);
    }

    const handleCloseForgot = () => {
        setOpenForgot(false);
    }

    const formikRegister = useFormik({
        initialValues: {
            name: '',
            phone: '',
            password: '',
            apiKey: ''
        },
        validationSchema: validationSchemaRegister,
        onSubmit: (values) => {
            handleCloseRegister();
            alert(JSON.stringify(values, null, 4));
        }
    });

    const formikActivate = useFormik({
        initialValues: {
            phone: '',
            otp: ''
        },
        validationSchema: validationSchemaActivate,
        onSubmit: (values) => {
            handleCloseActivate();
            alert(JSON.stringify(values, null, 2));
        }
    });

    const formikForgot = useFormik({
        initialValues: {
            phone: ''
        },
        validationSchema: validationSchemaForgot,
        onSubmit: (values) => {
            handleCloseForgot();
            alert(JSON.stringify(values, null, 1));
        }
    });

    return (
        <div className={classes.root}>
            <Paper elevation={4} fullWidth className={classes.paperRoot}>
                <br/>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item>
                        <Card elevation={4}>
                            <CardContent>
                                <Typography className={classes.title} align='center'>Welcome to Avicenna Portal</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card elevation={4}>
                            <CardContent>
                                <Typography className={classes.textBig} align='center'>Register</Typography>
                                <Typography className={classes.text} align='center'>
                                    1. Save the number <b>+34 698 28 89 73</b> in your cellphone with the name "<b>CallMeBot</b>".
                                    <br/>
                                    2. Open Whatsapp and send this message "<b>I allow callmebot to send me messages</b>" to "<b>CallMeBot</b>".
                                    <br/>
                                    3. You will get a <b>6-digit apikey</b>, using which you will register on this portal.
                                    <br/>
                                    4. Press the <b>Register</b> button below to create an account.
                                </Typography>
                                <Grid container direction="row" justifyContent="center" alignItems="center">
                                    <Grid item>
                                        <Button variant='contained' color='secondary' size='large' onClick={handleOpenRegister}>
                                            Register
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card elevation={4}>
                            <CardContent>
                                <Typography className={classes.textBig2} align='center'>Activate Account</Typography>
                                <Typography className={classes.text2} align='center'>
                                    1. After registration, you would recieve a <b>5-digit OTP</b> from "<b>CallMeBot</b>" on Whatsapp.
                                    <br/>
                                    2. Press the <b>Activate</b> button below and use the OTP to activate your account.
                                </Typography>
                                <Grid container direction="row" justifyContent="center" alignItems="center">
                                    <Grid item>
                                        <Button variant='contained' className={classes.redButton} size='large' onClick={handleOpenActivate}>
                                            Activate
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card elevation={4}>
                            <CardContent>
                                <Typography className={classes.textBig} align='center'>Forgot Password</Typography>
                                <Typography className={classes.text} align='center'>
                                    If you forgot your password, click on the button below to retrieve it.
                                </Typography>
                                <Grid container direction="row" justifyContent="center" alignItems="center">
                                    <Grid item>
                                        <Button variant='contained' color='secondary' size='large' onClick={handleOpenForgot}>
                                            Forgot Password
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={openRegister} onClose={handleCloseRegister} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please provide your details below to register!
                        </DialogContentText>
                        <TextField
                        fullWidth
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        value={formikRegister.values.name}
                        placeholder="Abdullah Khan"
                        onChange={formikRegister.handleChange}
                        error={formikRegister.touched.name && Boolean(formikRegister.errors.name)}
                        helperText={formikRegister.touched.name && formikRegister.errors.name}
                        color="secondary"
                        />
                        <TextField
                        fullWidth
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={formikRegister.values.phone}
                        placeholder="+923xxxxxxxxx"
                        onChange={formikRegister.handleChange}
                        error={formikRegister.touched.phone && Boolean(formikRegister.errors.phone)}
                        helperText={formikRegister.touched.phone && formikRegister.errors.phone}
                        color="secondary"
                        />
                        <TextField
                        fullWidth
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        value={formikRegister.values.password}
                        placeholder="Password"
                        type="password"
                        onChange={formikRegister.handleChange}
                        error={formikRegister.touched.password && Boolean(formikRegister.errors.password)}
                        helperText={formikRegister.touched.password && formikRegister.errors.password}
                        color="secondary"
                        />
                        <TextField
                        fullWidth
                        margin="dense"
                        id="apiKey"
                        name="apiKey"
                        label="API Key"
                        value={formikRegister.values.apiKey}
                        placeholder="123456"
                        onChange={formikRegister.handleChange}
                        error={formikRegister.touched.apiKey && Boolean(formikRegister.errors.apiKey)}
                        helperText={formikRegister.touched.apiKey && formikRegister.errors.apiKey}
                        color="secondary"
                        />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRegister} color="secondary">
                        Close
                    </Button>
                    <Button onClick={formikRegister.handleSubmit} color="secondary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openActivate} onClose={handleCloseActivate} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Activate</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please provide your details below to activate account!
                        </DialogContentText>
                        <TextField
                        fullWidth
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={formikActivate.values.phone}
                        placeholder="+923xxxxxxxxx"
                        onChange={formikActivate.handleChange}
                        error={formikActivate.touched.phone && Boolean(formikActivate.errors.phone)}
                        helperText={formikActivate.touched.phone && formikActivate.errors.phone}
                        color="secondary"
                        />
                        <TextField
                        fullWidth
                        margin="dense"
                        id="otp"
                        name="otp"
                        label="OTP"
                        value={formikActivate.values.otp}
                        placeholder="12345"
                        onChange={formikActivate.handleChange}
                        error={formikActivate.touched.otp && Boolean(formikActivate.errors.otp)}
                        helperText={formikActivate.touched.otp && formikActivate.errors.otp}
                        color="secondary"
                        />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseActivate} color="secondary">
                        Close
                    </Button>
                    <Button onClick={formikActivate.handleSubmit} color="secondary">
                        Activate
                    </Button>
                </DialogActions>
            </Dialog>
        
            <Dialog open={openForgot} onClose={handleCloseForgot} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please provide your details below to if you forgot your password!
                        </DialogContentText>
                        <TextField
                        fullWidth
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={formikForgot.values.phone}
                        placeholder="+923xxxxxxxxx"
                        onChange={formikForgot.handleChange}
                        error={formikForgot.touched.phone && Boolean(formikForgot.errors.phone)}
                        helperText={formikForgot.touched.phone && formikForgot.errors.phone}
                        color="secondary"
                        />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForgot} color="secondary">
                        Close
                    </Button>
                    <Button onClick={formikForgot.handleSubmit} color="secondary">
                        Forgot
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default Default;