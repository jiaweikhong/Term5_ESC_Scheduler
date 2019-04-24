

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from '../lists/Adminmenu';
import { Link } from 'react-router-dom';
import { Button, Divider, TextField, FormControl } from '@material-ui/core'
import { FormLabel } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

const drawerWidth = 240;

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        width: 70

    },
    coursecode: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150

    },
    coursetitle: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400
    },
    card: {
        minWidth: 275,
        padding: 30

    },
    space: {
        height: 20
    },
    pillar: {
        marginReft: theme.spacing.unit,
        width: 150
    },

    root: {
        display: 'flex',
    },
    text: {
        textAlign: 'left'
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },

    icons: {
        position: 'absolute',
        right: 15

    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,

    },
    toolbar: theme.mixins.toolbar,

    textfields: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    input: {
        width: 800,
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexdirection: 'column'
    },
    textField: {
        marginRight: theme.spacing.unit,
        width: 150

    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },

});


class AdminEvent extends React.Component {

    render() {
        const { classes } = this.props;

        const columns = [
            "Date ",
            "Event Title ",
            "Venue ",
            "Start (hr)",
            "End (hr)"


        ];

        const data = [
            ['August 18th', "Artificial Intelligence Talk", "Albert Hong", "1600", "1800"],
            ['August 18th', "ISTD Pillar Talk", "Albert Hong", "1600", "1700"],
            ['May 18th', "Global Exchange Talk", "2.403", "0800", "1700"],
            ['November 25th', "EPD Pillar Talk", " 2.412", "1600", "1800"],
            ['June 23rd', "Capstone Talk", "Albert Hong", "1400", "1600"],

        ];

        const options = {
            filter: true,
            selectableRows: false,
            filterType: 'dropdown',
            responsive: 'stacked',
            rowsPerPage: 10,

            onChangePage: (numberRows) => {
                console.log(numberRows);
            },
            onSearchChange: (searchText) => {
                console.log(searchText);
            },
        };

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar)}>

                    <Toolbar >
                        <Typography
                            variant="h6"
                            color="inherit"
                            noWrap
                        >
                            Welcome {window.user}
                        </Typography>
                        <div className={classes.icons}>
                            <IconButton
                                color="inherit"
                                component={Link} to="/adminnotifications">
                                <NotificationsIcon />
                            </IconButton>
                            <Button
                                color='inherit'
                                component={Link} to="/">
                                LOGOUT
        </Button>
                        </div>
                    </Toolbar>
                </AppBar>


                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper),
                    }}
                >
                    <div className={classes.toolbar} />

                    <List>{mainListItems}</List>


                </Drawer>
                <main className={classes.content}>
                <div className={classes.toolbar}/>
                    <Typography id='tabtitle' variant="h4" gutterBottom component="h2">
                        Event Schedules
                    </Typography>
                    <MUIDataTable data={window.eventData} columns={columns} options={options} />
                </main>
            </div>
        );
    }
}
AdminEvent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminEvent);
