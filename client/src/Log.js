import React, { Component } from "react";
import AuthentitationContract from "./contracts/Authentitation.json";
import getWeb3 from "./getWeb3";
import LogContainer from "./LogContainer"

class Log extends Component{
    constructor(props){
        super(props)

        this.state = {web3: null, accounts: null, contract: null, name :'', password :''}
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
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
    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, accounts, contract: instance });
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };

    register = async (name, password) =>{
        await this.state.contract.methods.register(name, password).send({from: this.state.accounts[0]});
    }

    login = async (name, password) =>{
        await this.state.contract.methods.login(name, password).send({from: this.state.accounts[0]});
    }
    
    runExample = async () => {
        const { accounts, contract } = this.state;
        await contract.methods.login("test", "123").send({ from: accounts[0] });
    
      };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
          }
        return(
            <LogContainer register = {this.register} login = {this.login} />
        )
    }
    
}
export default Log;