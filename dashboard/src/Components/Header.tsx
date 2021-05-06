import React from "react";
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { styles } from "../Components/styling/header.css";


export default function Header() {
    const getNavLinks = [
        { title: "contact", path: "/contact"},
        { title: "donate", path: "/donate"},
    ];

    return (
        // @ts-ignore
        <AppBar position="static" style={{background: "#CF6D46"}}>
            <Toolbar>
                <a href={"/"} key={"home"} style={styles.linkText}>
                    <IconButton edge="start" color="inherit" aria-label="home">
                        <Home fontSize="medium" />
                    </IconButton>
                </a>
                <h5 style={styles.pageHeader}>Old School Runescape Progress Tracker</h5>
                <List component="nav" aria-labelledby="main navigation" style={styles.navDisplayFlex}>
                    {getNavLinks.map(({ title, path }) => (
                    <a href={path} key={title} style={styles.linkText}>
                        <ListItem button>
                            <ListItemText primary={title} />
                        </ListItem>
                    </a>
                    ))}
                </List>
            </Toolbar>
        </AppBar>
    );
}