import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Top from "./page/top/Top";
import InputSelection from "./page/inputSelection/InputSelection";
import Results from "./page/results/Results";
import Output from "./page/output/Output";
import ProductA from "./page/input/ProductA";
import ProductB from "./page/input/ProductB";
import ProductC from "./page/input/ProductC";
import Login from "./page/login/Login";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#314259"
    }
  }
});

function Auth({ children }) {
  const { user } = useAuthContext();
  if (user) {
    return <div>{children}</div>
  } else {
    return <Redirect to="/login" />
  }
}

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <HashRouter>
        
        {/* ログイン画面 */}
          
        <AuthProvider>
          <Header />
          <Switch>

            <Route path="/login">
              <Login />
            </Route>

            {/* ログイン済みのみ表示する画面 */}

            <Auth>

            {/* ホーム画面 */}
            <Route exact path="/">
              <Top />
            </Route>
          
  
            {/* 入力選択画面 */}
            <Route exact path="/input">
              <InputSelection />
            </Route>
  
            {/* 計算結果表示画面 */}
            <Route path="/results">
              <Results />
            </Route>
  
            {/* 各種出力画面 */}
            <Route path="/output">
              <Output />
            </Route>

            {/* 各製品入力画面 */}
            <Route path="/input/productA">
              <ProductA />
            </Route>
            <Route path="/input/productB">
              <ProductB />
            </Route>
            <Route path="/input/productC">
              <ProductC />
            </Route>

            </Auth>
            
          </Switch>
          <Footer />
        </AuthProvider>
        

      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
