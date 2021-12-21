import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#314259",
    color: "#D9D6D0",
    width: "100%",
    height: "15%",
    top: 0,
    left: 0,
  },
  button: {
    fontSize: "2.5rem",
    margin: "3%",
    width: "30%"
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Box
      className={classes.header}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        className={classes.button}
        variant="contained"
        component={Link}
        to="/input"
      >
        生産数入力
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        component={Link}
        to="/results"
      >
        生産数出力
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        component={Link}
        to="/output"
      >
        月間生産数
      </Button>
    </Box>
  );
}