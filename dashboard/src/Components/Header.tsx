import React, { FC } from "react";
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    navBar: {
        background: theme.palette.secondary.main,
    },
    navBarLinks: {
        marginLeft: "auto",
        display: "flex",
        justifyContent: "space-between"
    },
    linkText: {
        textDecoration: "none",
        textTransform: "uppercase",
        color: theme.palette.primary.main,
    },
}));

export const Header: FC = () => {
    const classes = useStyles();
    const getNavLinks = [
        { title: "users", path: "/users"},
        { title: "contact", path: "/contact"},
        { title: "donate", path: "/donate"},
    ];

    return (
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <a href={"/"} key={"home"} className={classes.linkText}>
            <IconButton edge="start" color="inherit" aria-label="home">
                <Home fontSize="medium" />
            </IconButton>
          </a>
          <List component="nav" className={classes.navBarLinks}>
            {getNavLinks.map(({ title, path }) => (
                <a href={path} key={title} className={classes.linkText}>
                    <ListItem button>
                        <ListItemText primary={title} />
                    </ListItem>
                </a>
            ))}
          </List>
        </Toolbar>
      </AppBar>
    );
};