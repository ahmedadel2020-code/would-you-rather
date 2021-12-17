import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Label, Image } from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
    state = { activeItem: 'Home' }


    // if user click on logout it will dispatch action and make authedUser null then will redirect to login page
    handleLogout = () => {
        let { authedUser, dispatch } = this.props
        authedUser = null
        dispatch(setAuthedUser(authedUser))
        this.props.history.push('/')
    }
    render() {
    
        const { activeItem } = this.state
        const { authedUser, users } = this.props

        let avatarURL = ''

        // iterate over users and give each one it's own avatar
        for(let user in users) {
            if(users[user].id === authedUser) {
                avatarURL = users[user].avatarURL
            }
        }
    return (
        <div>
            <Menu pointing secondary className="menu-color">
            
            {/* create links for home, add, leaderboard page */}
            <NavLink 
                to="/" 
                exact
                activeClassName='nav-link-active'
                className="nav-link"
            >
            Home
            </NavLink>

            <NavLink 
                to="/add" 
                exact
                activeClassName='nav-link-active'
                className="nav-link"
            >
                New Poll
            </NavLink>
        
    

            <NavLink 
                    to="/leaderboard" 
                    exact
                    activeClassName='nav-link-active'
                    className="nav-link"
            >
                Leader Board
            </NavLink>

            <Menu.Menu position='right'>

            <Label as='a'>
            <Image src={avatarURL} avatar spaced='right'/>
                { authedUser }
            </Label>

            <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleLogout}
                className='menue-btn'
            />
            </Menu.Menu>
        
        </Menu>

        </div>
    )
    }
}

// return authedUser, users from our store
function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Nav))
