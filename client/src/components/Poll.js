import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Card, CardContent, Grid, Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, IconButton, Box } from '@material-ui/core'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { FieldArray, Form, Formik, getIn } from "formik";
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
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
        backgroundColor: "#0d47a1",
        margin: theme.spacing(2),
    },
    redButton: {
        backgroundColor: "#cc0e0e",
        color: 'white',
        '&:hover': {
            backgroundColor: "#a30b0b",
            color: 'white',
        }
    },
    redButton2: {
        backgroundColor: "white",
        color: '#cc0e0e',
        '&:hover': {
            backgroundColor: "white",
            color: '#a30b0b',
        },
        // paddingTop: 30
    },
}));

const validationSchemaCreate = yup.object({
    question: yup
    .string('Enter your question')
    .min(1, 'Question must be of minimum 1 characters length')
    .max(500, 'Question must be of minimum 500 characters length')
    .required('Question is required'),
    options: yup.array().of(
        yup
        .string('Enter an option')
        .min(1, 'Option must be of minimum 1 characters length')
        .max(250, 'Option must be of minimum 250 characters length')
    )
    .required()
});

function Poll() {
    const [pollId, setPollId] = React.useState('');
    const [openCreate, setOpenCreate] = React.useState(false);

    const classes = useStyles();

    const handleChangePollId = (e) => {
        setPollId(e.target.value);
    }

    const handleOpenCreate = () => {
        setOpenCreate(true);
    }

    const handleCloseCreate = () => {
        setOpenCreate(false);
    }

    return (
        <div>
            <Paper elevation={4} className={classes.paperRoot}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item>    
                        <Card elevation={4}>
                            <CardContent>
                                <Typography className={classes.title} align='center'>Polls</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>    
                        <Card elevation={4}>
                            <CardContent>
                                <Typography className={classes.textBig} align='center'>View Poll</Typography>
                                <TextField
                                fullWidth
                                margin="dense"
                                id="pollId"
                                name="pollId"
                                label="Poll ID"
                                value={pollId}
                                onChange={handleChangePollId}
                                placeholder="Poll ID"
                                color="secondary"
                                />
                                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item>
                                        <Link to={'/polls/view?pollId=' + pollId} style={{ textDecoration: 'none' }}>
                                            <Button variant='contained' color='secondary' size='large'>
                                                View Poll
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>    
                        <Card elevation={4}>
                            <CardContent>
                                <Typography className={classes.textBig2} align='center'>Create Poll</Typography>
                                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item>
                                        <Button variant='contained' className={classes.redButton} size='large' onClick={handleOpenCreate}>
                                            Create Poll
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={openCreate} onClose={handleCloseCreate} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Poll</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please provide details below to create the poll!
                        </DialogContentText>
                        <Formik
                        initialValues={{
                            question: '',
                            options: []
                        }}
                        validationSchema={validationSchemaCreate}
                        onSubmit={(values) => {
                            handleCloseCreate();
                            alert(JSON.stringify(values, null, 2));
                        }}
                        >
                            {({values, touched, errors, handleChange, handleBlur, isValid, handleSubmit}) => {
                                return (<Form noValidate autoComplete="off">
                                    <TextField
                                    fullWidth
                                    margin="dense"
                                    id="question"
                                    name="question"
                                    label="Question"
                                    value={values.question}
                                    placeholder="Do you like the app?"
                                    onChange={handleChange}
                                    error={touched.question && Boolean(errors.question)}
                                    helperText={touched.question && errors.question}
                                    color="secondary"
                                    />
                                    <Typography className={classes.text} align='center'>Options</Typography>
                                    <FieldArray name="options">
                                        {({push, remove}) => {
                                            return (<Box>
                                                {
                                                    values.options.map((val, index) => {
                                                        const thisOption = `options[${index}]`;
                                                        const optionTouched = getIn(touched, thisOption);
                                                        const optionError = getIn(errors, thisOption);
                                                        const key = `options_${index}`;
                                                        return (
                                                            <Grid container direction="row" justifyContent="center" spacing={2}>
                                                                <Grid item>
                                                                <TextField
                                                                    fullWidth
                                                                    margin="dense"
                                                                    id={key}
                                                                    name={thisOption}
                                                                    label={"Option " + (index + 1).toString()}
                                                                    value={val}
                                                                    placeholder="Yes"
                                                                    onChange={handleChange}
                                                                    error={optionTouched && Boolean(optionError)}
                                                                    helperText={optionTouched && optionError}
                                                                    color="secondary"
                                                                    />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Box pt={3}>
                                                                        <IconButton edge="end" className={classes.redButton2} aria-label="remove" size="small" onClick={() => remove(index)}>
                                                                            <RemoveCircleIcon/>
                                                                        </IconButton>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    })
                                                }
                                                <IconButton edge="start" color="secondary" aria-label="add" onClick={() => push('')}>
                                                    <AddCircleIcon/>
                                                </IconButton>
                                            </Box>);
                                        }}
                                    </FieldArray>
                                    <DialogActions>
                                        <Button onClick={handleCloseCreate} color="secondary">
                                            Close
                                        </Button>
                                        <Button onClick={handleSubmit} color="secondary">
                                            Create
                                        </Button>
                                    </DialogActions>
                                </Form>);
                            }}
                        </Formik>
                    </DialogContent>
            </Dialog>

        </div>
    );
}

export default Poll;