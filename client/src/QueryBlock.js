import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import AuthentitationContract from "./contracts/Authentitation.json";
import QueryBlockContainer from "./QueryBlockContainer"
// import 'bootstrap/dist/css/bootstrap.css';

class QueryBlock extends Component{
    constructor(props){
        super(props)
        this.state = {web3: null, accounts: null, contract: null, blocks: [], searchBlock: []}
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
        let blockNumber = 0;
        await this.state.web3.eth.getBlockNumber().then(res => blockNumber =res).catch(e => console.error(e))
        console.log(blockNumber);
        this.getBlocks(blockNumber);
      };
    
    getBlocks = async (blockNumber) =>{
        const blocks = this.state.blocks.slice();
        let currentBlockObject;
        let currentBlockNumber = blockNumber;
        for (let i = 0; i < blockNumber; i++, currentBlockNumber--){
            await this.state.web3.eth.getBlock(currentBlockNumber).then(res => currentBlockObject = res);
            console.log(currentBlockObject);
            blocks.push(currentBlockObject);
        }
        this.setState({
            blocks: blocks,
        });
    }

    render(){
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
          }
        return(
            <div id = "purInfo" className = "col-md-8 col-md-offset-2 text-center">
                <form className="pure-form pure-form-stacked" onSubmit={async (event) => {
                    event.preventDefault()
                    let searchBlockObject;
                    searchBlockObject = this.state.web3.eth.getBlock(this.hashOrNum.value, true)
                    let searchBlockArray = []
                    searchBlockArray.push(searchBlockObject)
                    this.setState({searchBlock: searchBlockArray})
                    
                }}>
                    <fieldset >
                        {/* <label htmlFor="name">Name</label> */}
                        <input id="hashOrNum" ref = {(input) => {this.hashOrNum = input}} type="text" className = "form-control" placeholder="blockHash or blockNum" required/>
                        <span className="pure-form-message">请输入要查询的区块的哈希值或编号</span>
                        <br />
                        <button type="submit" className="pure-button pure-button-primary">确认查询</button>
                    </fieldset>
                </form>
                <QueryBlockContainer searchBlock = {this.state.searchBlock}/>
                <br/>

                <div style={{ background: '#fff', padding: 0 }}></div>
                    <div style={{position: 'relative'}}>
                        <table border="1" cellpadding="8" cellspacing="0" style={{ border: '1px solid black', margin: 30 }}>
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Hash</th>
                                    <th>Size</th>
                                    <th>TimeStamp</th>
                                    <th>GasUsed</th>
                                    <th>GasLimit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.blocks.map(blockItem => (
                                    <tr key = {blockItem.hash}>
                                        <td>{blockItem.number}</td>
                                        <td>{blockItem.hash}</td>
                                        <td>{blockItem.size}</td>
                                        <td>{blockItem.timestamp}</td>
                                        <td>{blockItem.gasUsed}</td>
                                        <td>{blockItem.gasLimit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>

        );
    }
}
export default QueryBlock;