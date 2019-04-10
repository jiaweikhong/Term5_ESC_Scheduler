import React from 'react'
import { Typography, Paper, Avatar, Button} from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'; 
import sutdlogo from "./images/sutdlogo.jpeg"

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', 
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    // avatar: {
    //     margin: theme.spacing.unit,
    //     backgroundColor: theme.palette.primary.main,
    // },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    logo:{
        width:100,
        height:50
    }
})


function Home(props) {

    const { classes } = props

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                {/* <Avatar className={classes.avatar}> */}
                <img 
                className ={classes.logo}
                src={sutdlogo} 
                alt="SUTDlogo"
                
                 />
                {/* </Avatar> */}
                <Typography component="h1" variant="h5">
                    SUTD Timetable Scheduler
                </Typography>
                <Button 
                    component = {Link} to = "/instructorlogin"
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.submit}
                    id = "instructorlogin">
                    Instructor
                </Button>
                <Button
                    component = {Link} to = "/adminlogin"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    id = "adminlogin">
                    Administrator
                </Button>
                <Button
                    component = {Link} to = "/plannerlogin"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    id = "plannerlogin">
                    Planner
                </Button>
            </Paper>
        </main>
    )
}


export default withStyles(styles)(Home);