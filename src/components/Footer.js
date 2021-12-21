import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { getAuth, signOut } from "@firebase/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  footer: {
    backgroundColor: "#314259",
    color: "#D9D6D0",
    width: "100%",
    height: "80px",
    bottom: 0,
    left: 0,
    padding: "30px 0",
    position: "absolute",
  },
  footerInner: {
    fontSize: "1.5rem"
  },
  button: {
    marginLeft: "10px",
    fontSize: "1.5rem"
  }
});

const Footer = () => {
  const classes = useStyles();

  const history = useHistory();
  function logOut() {
    const auth = getAuth();
    signOut(auth);
    history.push("/login");
}

    return (
      <Box className={classes.footer} display="flex" alignItems="center" justifyContent="center">
        <Box className={classes.footerInner}>©︎ 2021 Masahiro Hayashi</Box>
        <button className={classes.button} onClick={logOut}>ログアウト</button>
      </Box>
  );
};

export default Footer;
