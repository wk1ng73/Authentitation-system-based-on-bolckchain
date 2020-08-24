import React, { Component } from 'react'

class QueryBlockContainer extends Component{

    render(){       
        return(
            <div id = "auInfo"  className = "col-md-8 col-md-offset-2 text-center">
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
                                {this.props.searchBlock.map(blockItem => (
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
        )
    }
}
export default QueryBlockContainer;