import { onValue, query, ref } from "@firebase/database";
import { database } from "../../firebase"
import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Area, CartesianGrid, ComposedChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import TableComponent from "../../components/TableComponent";


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
    title: {
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        fontSize: "3.2rem",
        margin: "40px auto"
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

    const header1 = ["製品名", "計画累計", "生産累計", "計画差異"];

    const [data, setData] = useState([]);
    
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
            
            // 表用データセット
            const array = [];
            const products = ["製品A", "製品B", "製品C"];

            products.forEach(async (productName) => {
                        
                var totalPlanArray = [0];
                var totalArray = [0];
                        
                if (gotValues != null) {
                    const days = Object.keys(gotValues);

                    days.forEach(gotDay => {

                        const values = gotValues[gotDay];

                        if (values[productName]) {
                            const productionNumber = values[productName].生産数;
                            if (productionNumber) {
                                const array = totalArray.concat(Object.values(productionNumber));
                                totalArray = array;
                            };
                            const planNumber = values[productName].計画数;
                            if (planNumber) {
                                const array = totalPlanArray.concat(Object.values(planNumber));
                                totalPlanArray = array;
                            };
                        };
                    });

                    const plannedCountForTable = totalPlanArray.reduce(reducer);
                    const productionCountForTable = totalArray.reduce(reducer);
                    const plannedDifference = plannedCountForTable - productionCountForTable;

                    // 3桁カンマ区切りとする.
                    function comma(num) {
                        return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
                    };
                    array.push({
                        name: productName,
                        計画数: comma(plannedCountForTable),
                        生産数: comma(productionCountForTable),
                        計画差異: comma(plannedDifference),
                    });
                    setData(array);
                };
            });

                // グラフデータセット
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
                            let object = {};
                            let planValue = [];
                            let productValue = [];
                            planValue = gotValues[key].製品A.計画数 ? Object.values(gotValues[key].製品A.計画数) : [0];
                            productValue = gotValues[key].製品A.生産数 ? Object.values(gotValues[key].製品A.生産数) : [0];
                            object["日付"] = key;
                            object["計画数"] = planValue.reduce(reducer);
                            object["生産数"] = productValue.reduce(reducer);
                            valueA.push(object);
                        };
                        if (gotValues[key].製品B) {
                            let object = {};
                            let planValue = [];
                            let productValue = [];
                            planValue = gotValues[key].製品B.計画数 ? Object.values(gotValues[key].製品B.計画数) : [0];
                            productValue = gotValues[key].製品B.生産数 ? Object.values(gotValues[key].製品B.生産数) : [0];
                            object["日付"] = key;
                            object["計画数"] = planValue.reduce(reducer);
                            object["生産数"] = productValue.reduce(reducer);
                            valueB.push(object);
                        };
                        if (gotValues[key].製品C) {
                            let object = {};
                            let planValue = [];
                            let productValue = [];
                            planValue = gotValues[key].製品C.計画数 ? Object.values(gotValues[key].製品C.計画数) : [0];
                            productValue = gotValues[key].製品C.生産数 ? Object.values(gotValues[key].製品C.生産数) : [0];
                            object["日付"] = key;
                            object["計画数"] = planValue.reduce(reducer);
                            object["生産数"] = productValue.reduce(reducer);
                            valueC.push(object);
                        };
                    
                    });
                }
                setProductAdata(valueA);
                setProductBdata(valueB);
                setProductCdata(valueC);
            });
        }, [path]);
    
        return (
            <Box className={classes.box}>
                <h1 className={classes.title}>月間生産累計</h1>
                <hr />
                <input className={classes.input} type="month" value={month} onChange={handleChangeMonth} />

                <TableComponent header={header1} data={data} />
            
                <h1 className={classes.title}>生産数推移グラフ</h1>
                <hr />
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
                                margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
                                data={productBdata} //ここにArray型のデータを指定
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
                    productCdata.length > 0 && (
                        <div>
                            <h1 className={classes.inner}>製品C</h1>
                            <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                                width={800}
                                height={400}
                                className={classes.chart}
                                margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
                                data={productCdata} //ここにArray型のデータを指定
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
            </Box>
        )
    }