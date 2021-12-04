import React from "react";
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

const useStyles = makeStyles({
    headCell: {
        fontSize: "2rem",
        lineHeight: "normal"
    },
    bodyCell: {
        fontSize: "2rem"
    }
})

export default function TableComponent(props) {
    const classes = useStyles()
    const objectList = []

    props.data.forEach((object) => {
        objectList.push(Object.values(object));
    });
        
    
    

    return (
        <TableContainer component={Paper}>
            <Table>
                 <TableHead>
                    <TableRow>
                        {props.header.map((name, index) => ( <TableCell className={classes.headCell} key={index}>{name}</TableCell> ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {objectList.map((array, index) => (
                        <TableRow key={index}>
                            {array.map((item, index) => (<TableCell className={classes.bodyCell} key={index}>{item}</TableCell>))}
                        </TableRow>))}

                </TableBody>
            </Table>
      </TableContainer>
    );
}