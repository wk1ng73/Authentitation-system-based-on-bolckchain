import React, { Component } from 'react'

class ProfileContainer extends Component{
    render(){       
        return(
            <div id = "modInfo" className = "col-md-8 col-md-offset-2 text-center">
                <form className="pure-form pure-form-stacked" onSubmit={(event) => {
                    event.preventDefault()
                    this.props.modify(this.newname.value, this.newpass.value)
                }}>
                    <fieldset>
                        <input id="newname" ref = {(input) => {this.newname = input}} type="text" placeholder="new Name" required/>
                        <input id="newpass" ref = {(input) => {this.newpass = input}} type="text" placeholder="new Password" required/>
                        <span className="pure-form-message">Please input your new name and new password</span>
                        <br />
                        <button type="submit" className="pure-button pure-button-primary">Modify</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}
export default ProfileContainer;