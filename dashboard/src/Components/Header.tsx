import React from "react";
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Home } from "@material-ui/icons";


const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: "flex",
        justifyContent: "space-between"
    },
    navDisplayFlex: {
      marginLeft: "auto !important",
      display: "flex",
      justifyContent: "space-between"
    },
    linkText: {
      textDecoration: "none",
      textTransform: "uppercase",
      color: "white"
    },
    pageHeader: {
      marginLeft: "auto !important",
      textAlign: "center",
      fontWeight: "bold"
    }
});


export default function Header() {
    const classes = useStyles();
    const getNavLinks = [
        { title: "contact", path: "/contact"},
        { title: "donate", path: "/donate"},
    ]


    return (
        // @ts-ignore
        <AppBar position="static" style={{background: "#CF6D46"}}>
            <Toolbar>
                <a href={"/"} key={"home"} className={classes.linkText}>
                    <IconButton edge="start" color="inherit" aria-label="home">
                        <Home fontSize="medium" />
                    </IconButton>
                </a>
                <h5 className={classes.pageHeader}>Old School Runescape Progress Tracker</h5>
                <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
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
    )
}