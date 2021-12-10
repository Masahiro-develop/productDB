import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { push, ref, set } from "@firebase/database";
import useComponentStyles from "./componentscStyle";
import Inputed from "./Inputed";
import { database } from "../firebase";

export default function Send(props) {
  const classes = useComponentStyles();

  const [checkBoxBool, setCheckBoxBool] = useState(false);

  const handleChangeCheckBox = () => {
    setCheckBoxBool(!checkBoxBool);
  };

  function dataPush() {
    console.log(props.path);
    const res = props.text.replace(/[^0-9]/g, "");
    push(ref(database, props.path), res);
    props.setText("");
  }

  function dataReset() {
    set(ref(database, props.path), null);
    setCheckBoxBool(false);
  }

  return (
    <div className={classes.default}>
      <h3 style={{ margin: "0" }}>入力済み</h3>
      <Inputed path={props.path} />
      <TextField
        className={classes.textField}
        id="outlined-basic"
        inputProps={{ className: classes.input }}
        InputLabelProps={{ className: classes.inputLabel }}
        label="入力"
        maxRows="3"
        autoComplete="off"
        type="tel"
        variant="outlined"
        onChange={props.handleChangeText}
        value={props.text}
      />
      <Button
        className={classes.button}
        disabled={props.text === ""}
        onClick={dataPush}
        variant="contained"
        color="primary"
      >
        送信
      </Button>
      <FormControlLabel
        className={classes.checkBox}
        control={
          <Checkbox checked={checkBoxBool} onChange={handleChangeCheckBox} />
        }
        label={<div className={classes.checkBoxLabel}>リセットボタン使用</div>}
      />
      <Button
        className={classes.button}
        disabled={!checkBoxBool}
        onClick={dataReset}
        variant="contained"
        color="primary"
      >
        生産数リセット
      </Button>
    </div>
  );
}
