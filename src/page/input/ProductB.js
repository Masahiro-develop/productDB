import React, { useEffect, useState } from "react";
import Send from "../../components/Send";
import useGenelicStyle from "./genericStyle";
import Selector from "../../components/Selector";

export default function ProductB() {
  const classes = useGenelicStyle();

  const category = ["計画数", "生産数"];

  // フックの設定
  const [selectCategory, setSelectCategory] = useState("計画数");
  const [text, setText] = useState("");

  // 日時の初期値設定
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDate().toLocaleString({timeZone: "Europe/Berlin"})).slice(-2);

  const [day, setDay] = useState(yyyy + "-" + mm + "-" + dd);

  const year = day.substr(0, 4);
  const month = day.substr(5, 2);
  const days = day.substr(8, 2);

  const [path, setPath] = useState(
    `${year}/${month}/${days}/製品B/${selectCategory}`
  );

  const handleChangeDay = (event) => {
    setDay(event.target.value);
  };
  const handleChangeCategpry = (event) => {
    setSelectCategory(event.target.value);
  };
  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  // 日付、機種名の変更監視
  useEffect(() => {
    const year = day.substr(0, 4);
    const month = day.substr(5, 2);
    const days = day.substr(8, 2);
    setPath(`${year}/${month}/${days}/製品B/${selectCategory}`);
  }, [day, selectCategory]);

  return (
    <div className={classes.default}>
      <h1>製品B</h1>
      <input
        type="date"
        className={classes.inputDate}
        value={day}
        onChange={handleChangeDay}
      />
      <Selector
        items={category}
        handleChange={handleChangeCategpry}
        value={selectCategory}
      />
      <Send
        path={path}
        text={text}
        setText={setText}
        handleChangeText={handleChangeText}
      />
    </div>
  );
}
