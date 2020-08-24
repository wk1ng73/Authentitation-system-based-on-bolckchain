import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import AuthentitationContract from "./contracts/Authentitation.json";
// import 'bootstrap/dist/css/bootstrap.css';

class Purse extends Component{
    constructor(props){
        super(props)

        this.state = {web3: null, accounts: null, contract: null, balance: null}
    }

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
    
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = AuthentitationContract.networks[networkId];
          const instance = new web3.eth.Contract(
            AuthentitationContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
          const balance = await web3.eth.getBalance(accounts[0])
    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, accounts, contract: instance , balance: web3.utils.fromWei(balance, 'ether')});
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };
    

    render(){
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
          }
        return(
            <div id = "purInfo" className = "col-md-8 col-md-offset-2 text-center">
                <span className="pure-form-message">您的余额：{this.state.balance} ether</span>
            
                <form className="pure-form pure-form-stacked" onSubmit={(event) => {
                    event.preventDefault()
                    const from = this.state.accounts[0]
                    const to = this.address.value
                    const value = this.state.web3.utils.toWei(this.amount.value, "ether")
                    this.state.web3.eth.sendTransaction({from, to, value})
                }}>
                    <fieldset>
                        <input id="add" ref = {(input) => {this.address = input}} type="text" className = "form-control" placeholder="对方账号" required/>
                        <input id="amu" ref = {(input) => {this.amount = input}} type="text" className = "form-control" placeholder="转账金额" required/>
                        <br />
                        <button type="submit" className="pure-button pure-button-primary">确认转账</button>
                    </fieldset>
                </form>
            </div>

        );
    }
}
export default Purse;