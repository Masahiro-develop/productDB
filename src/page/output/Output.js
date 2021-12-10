import { getAuth, signOut } from "@firebase/auth";
import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";


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

    const history = useHistory();
    function logOut() {
        const auth = getAuth();
        signOut(auth);
        history.push("/login");
    }

    return (
        <Box className={classes.box}>
            <h1 className={classes.title}>テスト</h1>
            <button onClick={logOut}>ログアウト</button>
        </Box>
    )
}