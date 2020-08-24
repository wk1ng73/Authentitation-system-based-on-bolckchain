import React, { Component } from "react";

import Log from "./Log";
import Profile from "./Profile";
import QueryBlock from "./QueryBlock";
import Purse from "./Purse";

import {Route, NavLink, HashRouter} from "react-router-dom";

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  render() {
    return (    
      <HashRouter>
        <div>
          <h1>基于区块链的身份认证系统</h1>
          <div className="App">          
            <nav className="navbar pure-menu pure-menu-horizontal">
              <ul className="pure-menu-list navbar-right">
                <span>
                <li className="pure-menu-item"><NavLink to = "/Home" className="pure-menu-link">注册登录</NavLink></li>
                <li className="pure-menu-item"><NavLink to = "/Profile" className="pure-menu-link">信息修改</NavLink></li>
                <li className="pure-menu-item"><NavLink to = "/QueryBlock" className="pure-menu-link">区块查询</NavLink></li>
                <li className="pure-menu-item"><NavLink to = "/Purse" className="pure-menu-link">钱包</NavLink></li>
                </span>
              </ul>
            </nav>
            <br/>
            <br/>
            <br/>
          </div>
          
          <div>
            <Route exact path = "/Home" component = {Log}/>
            <Route path = "/Profile" component = {Profile}/>
            <Route path = "/QueryBlock" component = {QueryBlock}/>
            <Route path = "/Purse" component = {Purse}/>
          </div>
          
        </div>
      </HashRouter>
    );
  }
}

export default App;
