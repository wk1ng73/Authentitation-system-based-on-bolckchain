import React, { Component } from 'react'

class LogContainer extends Component{
    render(){       
        return(
            <div id = "auInfo"  className = "col-md-8 col-md-offset-2 text-center">
                <form className="pure-form pure-form-stacked" onSubmit={(event) => {
                    event.preventDefault()
                    this.props.login(this.name.value, this.pass.value)
                    // this.props.register(this.name.value, this.pass.value)
                }}>
                    <fieldset>
                        <input id="name" ref = {(input) => {this.name = input}} type="text" placeholder="Name" required/>
                        <input id="pass" ref = {(input) => {this.pass = input}} type="text" placeholder="Password" required/>
                        <span className="pure-form-message">Please input your name and password</span>
                        <br />
                        <button type="submit" className="pure-button pure-button-primary">Register</button>
                        &nbsp; &nbsp; &nbsp; 
                        <button type="submit" className="pure-button pure-button-primary">Login</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}
export default LogContainer;