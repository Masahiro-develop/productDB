import * as React from 'react';
import {  FormControl, InputLabel, makeStyles, NativeSelect } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    width: "400px",
    height: "200px",
    margin: theme.spacing(2)
  },
  formLabel: {
    fontSize: "3rem"
    },
    formSelect: {
        fontSize: "2rem",
      paddingTop: "10%"
    },
    selectInput: {
        height: "100px"
    }
}));

export default function Selector(props) {

    const classes = useStyles();

    return (
      <div>
        <FormControl className={classes.form}>
          <InputLabel className={classes.formLabel} variant="standard" htmlFor="uncontrolled-native">
            機種選択
          </InputLabel>
          <NativeSelect
            className={classes.formSelect}
            value={props.value}
            onChange={props.handleChange}
            inputProps={{
              name: "機種選択",
                id: "uncontrolled-native",
              className: classes.selectInput
            }}
          >
            {props.items.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </div>
    );
}