import React, { FC } from "react";
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { styles } from "../Components/styling/header.css";


export const Header: FC = () => {
    const getNavLinks = [
        { title: "contact", path: "/contact"},
        { title: "donate", path: "/donate"},
    ];

    return (
        // @ts-ignore
        <AppBar position="static" style={styles.navBar}>
            <Toolbar>
                <a href={"/"} key={"home"} style={styles.linkText}>
                    <IconButton edge="start" color="inherit" aria-label="home">
                        <Home fontSize="medium" />
                    </IconButton>
                </a>
                <List component="nav" style={styles.navBarLinks}>
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
};