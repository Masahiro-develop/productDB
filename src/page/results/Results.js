import { Box, makeStyles } from "@material-ui/core";
import { limitToLast, onValue, query, ref } from "@firebase/database";
import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import { database } from "../../firebase"

const useStyles = makeStyles({
    default: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "95%",
        marginTop: "150px",
        marginBottom: "230px",
        margin: "auto",
    },
    inputDate: {
        fontSize: "2rem",
        backgroundColor: "#D9D6D0",
        width: "300px",
    },
});


export default function Results() {
    const classes = useStyles();
    
    const header1 = ["製品名", "計画数", "計画累計", "生産数", "生産累計", "計画差異"];
    
    const [data1, setData1] = useState([]);
    
    // 日時の初期値設定
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = ("0" + (date.getMonth() + 1)).slice(-2);
    const dd = ("0" + date.getDate()).slice(-2);
    
    const [day, setDay] = useState(yyyy + "-" + mm + "-" + dd);
    
    const year = day.substr(0, 4);
    const month = day.substr(5, 2);
    const days = day.substr(8, 2);
    
    const [path, setPath] = useState(
        `${year}/${month}/${days}`
    );
    
    const [totalPath, setTotalPath] = useState(
        `${year}/${month}`
    )
        
    // 日付、機種名の変更監視
    useEffect(() => {
        const year = day.substr(0, 4);
        const month = day.substr(5, 2);
        const days = day.substr(8, 2);
        setPath(
          `${year}/${month}/${days}`  
        );
        setTotalPath(
            `${year}/${month}`
        );
    }, [day]);
    
    const handleChangeDay = (event) => {
      setDay(event.target.value);
    };

    const reducer = (previousValue, currentValue) => Number(previousValue) + Number(currentValue);
    

    
    useEffect(() => {

        const messageRef = query(ref(database, path), limitToLast(10));
        
        // 生産累計の取得
        const gotTotalValuesRef = query(ref(database, totalPath));
        onValue(gotTotalValuesRef, (snapshot) => {
            const gotTotalValues = snapshot.val()
            
            // 生産数の取得
            onValue(messageRef, (snapshot) => {
                const gotValues = snapshot.val()
                
                if (gotValues) {
                    const array = [];
                    const keys = Object.keys(gotValues);
                    
                    keys.forEach(async (key) => {
                        
                        var totalArray = [0];
                        var totalPlanArray = [0];
                        
                        if (gotTotalValues != null) {
                            const days = Object.keys(gotTotalValues);
                            days.forEach(gotDay => {
                                const days = day.substr(8, 2);
                                if (days >= gotDay) {
                                    const values = gotTotalValues[gotDay];
                                    if (values[key]) {
                                        const productionNumber = values[key].生産数;
                                        if (productionNumber) {
                                            const array = totalArray.concat(Object.values(productionNumber));
                                            totalArray = array;
                                        }
                                        const planNumber = values[key].計画数;
                                        if (planNumber) {
                                            const array = totalPlanArray.concat(Object.values(planNumber));
                                            totalPlanArray = array;
                                        }
                                    }
                                }
                            });   
                        }
                        
                        const planCount = gotValues[key].計画数 ? Object.values(gotValues[key].計画数) : [0];
                        const productionCount = gotValues[key].生産数 ? Object.values(gotValues[key].生産数) : [0];
                        
                        const keikakusu = planCount.reduce(reducer);
                        const seisansu = productionCount.reduce(reducer);
                        const seisanruikei = totalArray.reduce(reducer);
                        const keikakuruikei = totalPlanArray.reduce(reducer);
                        const keikakusai = seisanruikei - keikakuruikei;

                        // 3桁カンマ区切りとする.
                        function comma(num) {
                            return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');   
                        }
                        
                        array.push({
                            name: key,
                            計画数: comma(keikakusu),
                            計画累計: comma(keikakuruikei),
                            生産数: comma(seisansu),
                            生産累計: comma(seisanruikei),
                            計画差異: comma(keikakusai),
                        });
                    });
                    setData1(array);
                }
            })
        })
    }, [path]);

    return (
        <Box className={classes.default}>
            <input
                type="date"
                className={classes.inputDate}
                value={day}
                onChange={handleChangeDay}
            />
            <hr />
            <TableComponent header={header1} data={data1} />
        </Box>
    );
};
