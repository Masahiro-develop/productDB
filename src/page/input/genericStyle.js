import { makeStyles } from "@material-ui/core"


export default makeStyles((theme) => ({
    default: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        fontSize: "2rem",
        height: "80%",
        width: "95%",
        marginTop: "10%",
        marginBottom: "10%"
    },
    textField: {
        fontSize: "2rem",
        width: "400px",
        margin: theme.spacing(3),
    },
    input: {
        height: "200px",
        fontSize: "2rem",
    },
    inputLabel: {
        fontSize: "2rem",
    },
    button: {
        height: "80px",
        width: "auto",
        fontSize: "2rem",
        marginTop: theme.spacing(2),
        padding: "25px"
    },
    inputDate: {
        fontSize: "2rem",
        backgroundColor: "#D9D6D0"
    },
    checkBox: {
        margin: "20px",
    },
    checkBoxLabel: {
        fontSize: "2rem",
    },
}))

// #253140 青色 D9D6D0 ベージュ