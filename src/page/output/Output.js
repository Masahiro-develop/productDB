import { onValue, query, ref } from "@firebase/database";
import { database } from "../../firebase"
import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Area, CartesianGrid, ComposedChart, Legend, Tooltip, XAxis, YAxis } from "recharts";


const useStykes = makeStyles((theme) => ({
    box: {
        width: "80%",
        margin: "150px auto"
    },
    input: {
        fontSize: "2rem",
        justifyContent: "center",
        display: "flex",
        margin: "40px auto"
    },
    inner: {
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        fontSize: "3rem",
        margin: "20px auto"
    },
    chart: {
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        margin: "auto",
        width: "100%",
        fontSize: "1.5rem"
    }
}));

export default function Output(props) {

    const classes = useStykes();

    const [productAdata, setProductAdata] = useState([]);
    const [productBdata, setProductBdata] = useState([]);
    const [productCdata, setProductCdata] = useState([]);

    // 月の取得
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = ("0" + (date.getMonth() + 1)).slice(-2);

    const [path, setPath] = useState(`${yyyy}/${mm}`);
    const [month, setMonth] = useState(`${yyyy}-${mm}`);
    
    function handleChangeMonth(event) {
        setMonth(event.target.value);
    }

    const gotValueRef = query(ref(database, path));

    const compareFunc = (a, b) => a - b;
    
    const reducer = (previousValue, currentValue) => Number(previousValue) + Number(currentValue);

    useEffect(() => {
        const yyyy = month.substr(0, 4);
        const mm = month.substr(5, 2);
        setPath(`${yyyy}/${mm}`);
    }, [month]);
    
    useEffect(() => {
        onValue(gotValueRef, (snapshot) => {
            const gotValues = snapshot.val();
    
            const valueA = [];
            const valueB = [];
            const valueC = [];
    
            if (gotValues != null) {
    
                var keys = Object.keys(gotValues);
                // keyの小さい順への並び替え
                keys = keys.sort(compareFunc);
                keys.forEach((key) => {
                    // データが存在しなかった場合のif文と値を入れている連想配列に日付の要素を追加している
                    if (gotValues[key].製品A) {
                        var object = {};
                        var planValue = [];
                        var productValue = [];
                        planValue = gotValues[key].製品A.計画数 ? Object.values(gotValues[key].製品A.計画数) : [0];
                        productValue = gotValues[key].製品A.生産数 ? Object.values(gotValues[key].製品A.生産数) : [0];
                        object["日付"] = key;
                        object["計画数"] = planValue.reduce(reducer);
                        object["生産数"] = productValue.reduce(reducer);
                        valueA.push(object);
                    };
                    if (gotValues[key].製品B) {
                        gotValues[key].製品B["日付"] = key
                        valueB.push(gotValues[key].製品B);
                    };
                    if (gotValues[key].製品C) {
                        gotValues[key].製品C["日付"] = key
                        valueC.push(gotValues[key].製品C);
                    };
                    
                });
            }
            setProductAdata(valueA);
            setProductBdata(valueB);
            setProductCdata(valueC);
        });
    }, [path])
    
    return (
        <Box className={classes.box}>
            <input className={classes.input} type="month" value={month} onChange={handleChangeMonth} />
            {
                productAdata.length > 0 && (
                    <div>
                        <h1 className={classes.inner}>製品A</h1>
                        <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                            width={800}
                            height={400}
                            className={classes.chart}
                            margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
                            data={productAdata} //ここにArray型のデータを指定
                        >
                            <XAxis
                                dataKey="日付"  //Array型のデータの、X軸に表示したい値のキーを指定
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid //グラフのグリッドを指定
                                stroke="#f5f5f5" //グリッド線の色を指定
                            />
                            <Area //面積を表すグラフ
                                type="monotone"  //グラフが曲線を描くように指定。default値は折れ線グラフ
                                dataKey="計画数" //Array型のデータの、Y軸に表示したい値のキーを指定
                                stroke="#F24B78" ////グラフの線の色を指定
                                fillOpacity={1}  ////グラフの中身の薄さを指定
                                fill="rgba(242,75,120,0.2)"  //グラフの色を指定
                            />
                            <Area //面積を表すグラフ
                                type="monotone"  //グラフが曲線を描くように指定。default値は折れ線グラフ
                                dataKey="生産数" //Array型のデータの、Y軸に表示したい値のキーを指定
                                stroke="#00aced" ////グラフの線の色を指定
                                fillOpacity={1}  ////グラフの中身の薄さを指定
                                fill="rgba(0, 172, 237, 0.2)"  //グラフの色を指定
                            />
                        </ComposedChart>
                        
                    </div>
                )
            }
            {
                productBdata.length > 0 && (
                    <div>
                        <h1 className={classes.inner}>製品B</h1>
                        <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                            width={800}
                            height={400}
                            className={classes.chart}
                            data={productBdata} //ここにArray型のデータを指定
                        >
                            <XAxis
                                dataKey="日付"  //Array型のデータの、X軸に表示したい値のキーを指定
                                label={{
                                    value: "日付", offset: -5, position: "insideBottomRight"
                                }}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid //グラフのグリッドを指定
                                stroke="#f5f5f5" //グリッド線の色を指定
                            />
                            <Area //面積を表すグラフ
                                type="monotone"  //グラフが曲線を描くように指定。default値は折れ線グラフ
                                dataKey="計画数" //Array型のデータの、Y軸に表示したい値のキーを指定
                                stroke="#F24B78" ////グラフの線の色を指定
                                fillOpacity={1}  ////グラフの中身の薄さを指定
                                fill="rgba(242,75,120,0.2)"  //グラフの色を指定
                            />
                            <Area //面積を表すグラフ
                                type="monotone"  //グラフが曲線を描くように指定。default値は折れ線グラフ
                                dataKey="生産数" //Array型のデータの、Y軸に表示したい値のキーを指定
                                stroke="#00aced" ////グラフの線の色を指定
                                fillOpacity={1}  ////グラフの中身の薄さを指定
                                fill="rgba(0, 172, 237, 0.2)"  //グラフの色を指定
                            />
                        </ComposedChart>
                    </div>
                )
            }
            {
                productCdata.length > 0 && (
                    <div>
                        <h1 className={classes.inner}>製品C</h1>
                        <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                            width={800}
                            height={400}
                            className={classes.chart}
                            data={productCdata} //ここにArray型のデータを指定
                        >
                            <XAxis
                                dataKey="日付"  //Array型のデータの、X軸に表示したい値のキーを指定
                                label={{
                                    value: "日付", offset: -5, position: "insideBottomRight"
                                }}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid //グラフのグリッドを指定
                                stroke="#f5f5f5" //グリッド線の色を指定
                            />
                            <Area //面積を表すグラフ
                                type="monotone"  //グラフが曲線を描くように指定。default値は折れ線グラフ
                                dataKey="計画数" //Array型のデータの、Y軸に表示したい値のキーを指定
                                stroke="#F24B78" ////グラフの線の色を指定
                                fillOpacity={1}  ////グラフの中身の薄さを指定
                                fill="rgba(242,75,120,0.2)"  //グラフの色を指定
                            />
                            <Area //面積を表すグラフ
                                type="monotone"  //グラフが曲線を描くように指定。default値は折れ線グラフ
                                dataKey="生産数" //Array型のデータの、Y軸に表示したい値のキーを指定
                                stroke="#00aced" ////グラフの線の色を指定
                                fillOpacity={1}  ////グラフの中身の薄さを指定
                                fill="rgba(0, 172, 237, 0.2)"  //グラフの色を指定
                            />
                        </ComposedChart>
                    </div>
                )
            }
        </Box>
    )
};