import React from "react";
import { Box, makeStyles } from "@material-ui/core";

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
});

const Footer = () => {
  const classes = useStyles();
    return (
      <Box className={classes.footer} display="flex" alignItems="center" justifyContent="center">
        <Box className={classes.footerInner}>©︎ 2021 Masahiro Hayashi</Box>
      </Box>
  );
};

export default Footer;
