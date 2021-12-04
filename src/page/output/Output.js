import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStykes = makeStyles((theme) => ({
    box: {
        width: "80%",
        margin: "150px auto"
    },
    title: {
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        fontSize: "3rem"
    }
}))

export default function Output(props) {

    const classes = useStykes()

    return (
        <Box className={classes.box}>
            <h1 className={classes.title}>テスト</h1>
        </Box>
    )
}