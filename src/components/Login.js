import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown, Button, Card } from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    state = {
        authedUser: ''
    }

    // if user click on login it will dispatch and set authedUser
    handleLogin = () => {
        const { authedUser } = this.state
        const { dispatch } = this.props
        dispatch(setAuthedUser(authedUser))
    }

    // one selecting user from the dropdown will get user name 
    handleChange = (e, data) => {
        let { authedUser } = this.props

        authedUser = data.value
        this.setState(() => ({
            authedUser
        }))
    }
    render() {
        const { users } = this.props
        let usersList = []
        let obj = {}

        // iterate over users object and create list of them 
        for(let user in users) {
        
            obj =
            { 
                key: users[user].id,
                value: users[user].id,
                text: users[user].name,
                image: {
                    avatar: true,
                    src: users[user].avatarURL
                }
            }
        
            usersList.push(obj)
        }
        
        
        return (
            <div className="login-container">
                <Card className="ui card login">
                    <Card.Content>
                    <Card.Header className="login-header">Welcome to the Would You Rather App</Card.Header>
                    <p className="login-letter">Please sign in to continue</p>
                    </Card.Content>
            
                        <Dropdown
                            placeholder='Select a User'
                            selection 
                            options={usersList}
                            onChange={this.handleChange}
                            className="login-dropdown"
                        />
                
                        <Button
                            className="login"
                            disabled={!this.state.authedUser}
                            onClick={this.handleLogin}
                        >
                        Login
                        </Button>
                
                </Card>
                
        
                </div>
        )
    }
}

// return authedUser, users from store

function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users,
    }
}

export default connect(mapStateToProps)(Login)
