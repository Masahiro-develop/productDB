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
    marginTop: "150px",
    marginBottom: "230px",
  },
  button: {
    fontSize: "2.5rem",
    width: "45%",
    height: "10%",
    margin: theme.spacing(4),
  },
}));

export default function Top() {
  const classes = useStyles();
  return (
    <Box className={classes.outer} m={2}>
      <Button className={classes.button} variant="contained" component={Link} to="/input">
        生産入力
      </Button>
      <Button className={classes.button} variant="contained" component={Link} to="/results">
        計算結果表示
      </Button>
      <Button className={classes.button} variant="contained" component={Link} to="/output">
        各種出力
      </Button>
      <Button className={classes.button} variant="contained">
        その他設定
      </Button>
    </Box>
  );
}
