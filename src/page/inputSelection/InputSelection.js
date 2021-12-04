import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  outer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "80%",
    width: "95%",
    margin: "10% auto 10%",
  },
  button: {
    fontSize: "2.5rem",
    width: "500px",
    height: "150px",
    margin: theme.spacing(4),
  },
}));

export default function InputSelection() {
  const classes = useStyles();
  return (
          <Box className={classes.outer} m={2}>
            <Button
              className={classes.button}
              variant="contained"
              component={Link}
              to="/input/productA"
            >
              製品A
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              component={Link}
              to="/input/productB"
            >
              製品B
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              component={Link}
              to="/input/productC"
            >
              製品C
            </Button>
          </Box>
  );
}
