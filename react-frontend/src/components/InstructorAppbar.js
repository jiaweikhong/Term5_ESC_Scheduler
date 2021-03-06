import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from '../lists/instructormenu';
import { Link } from 'react-router-dom';
import { Button, } from '@material-ui/core'

const drawerWidth = 240;

const styles = theme => ({
    root: {
      display: 'flex',
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

    icons:{
      position: 'absolute',
      right: 15

    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
  });


class InstructorAppbar extends React.Component {
    render() {
        const { classes } = this.props;
        return (
<div>
            <AppBar
                position="fixed"
                className={classNames(classes.appBar)}
                style={{ backgroundColor: '#0097a7' }}>

                <Toolbar >
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                    // className ={classes.welcome}
                    >
                        Welcome {window.user}
                    </Typography>
                    <div className={classes.icons}>
                        <Button
                            id="logout"
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

            </div>



        );
    }
}

InstructorAppbar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(InstructorAppbar);
