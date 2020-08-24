import React, { Component } from "react";
import AuthentitationContract from "./contracts/Authentitation.json";
import getWeb3 from "./getWeb3";
import ProfileContainer from "./ProfileContainer";

class Profile extends Component{
    constructor(props){
        super(props)

        this.state = {web3: null, accounts: null, contract: null, newName :'', newPassword :''}
        this.modify = this.modify.bind(this)
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

    modify = async (newName, newPassword) =>{
        await this.state.contract.methods.modify(newName, newPassword).send({from: this.state.accounts[0]});
    }

    render(){
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
          }
        return(
            // <div>This is Profile!</div>
            <ProfileContainer modify = {this.modify} />
        );
    }
}
export default Profile;