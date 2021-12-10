import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const useStyles = makeStyles({
    wrapper: {
        height: "100vh",
    },
    items: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        fontSize: "2rem",
    },
    textfield: {
        width: "50%",
        margin: "15px",
    },
    button: {
        width: "50%",
        fontSize: "3rem",
        marginTop: "42px",
    },
})

export default function Login(props) {

    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const auth = getAuth();
    
    const history = useHistory();

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    function tryLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => { history.push("/") })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('パスワードが違います。');
                } else {
                    alert(errorMessage);
                }
            })
    };


    return (
        <div className={classes.wrapper}>
            <div className={classes.items}>
                <h1>生産管理システム</h1>
                <TextField
                    className={classes.textfield}
                    label="email"
                    value={email}
                    onChange={handleChangeEmail}
                    variant="standard"
                    inputProps={{style: {fontSize: "5rem"}}}
                    InputLabelProps={{ style: { fontSize: "2.5rem" } }}
                />
                <TextField
                    className={classes.textfield}
                    label="Password"
                    value={password}
                    onChange={handleChangePassword}
                    variant="standard"
                    type="password"
                    inputProps={{style: {fontSize: "5rem"}}}
                    InputLabelProps={{ style: { fontSize: "2.5rem" } }}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={tryLogin}
                >
                    ログイン
                </Button>
            </div>
        </div>
    )
}