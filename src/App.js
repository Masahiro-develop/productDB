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


function App() {
  return (
    <HashRouter>
      <Header />
      <Switch>
        {/* ホーム画面 */}
        <Route exact path="/">
          <Top />
        </Route>

        {/* 入力選択画面 */}
        <Route exact path="/input">
          <InputSelection />
        </Route>

        {/* 計算結果表示画面 */}
        <Route exact path="/results">
          <Results />
        </Route>

        {/* 各種出力画面 */}
        <Route exact path="/output">
          <Output />
        </Route>

        {/* 各製品入力画面 */}
        <Route exact path="/input/productA">
          <ProductA />
        </Route>
        <Route exact path="/input/productB">
          <ProductB />
        </Route>
        <Route exact path="/input/productC">
          <ProductC />
        </Route>

      </Switch>
      <Footer />
    </HashRouter>
  );
}

export default App;
