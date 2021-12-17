import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewPoll from './NewPoll'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import NotFound from './NotFound'

class App extends Component {
  
  // dispatch the initial data
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
    let { authedUser } = this.props

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            {
              authedUser ? // if authedUser is there then will return our pages
              <div>
                {
                  this.props.loading === true
                  ? null
                  : 
                  <div>
                      <Nav />
                      <Switch>
                          
                          <Route path='/' exact component={props => <Dashboard {...props} />}/>
                          <Route path='/questions/:id' exact component={props => <QuestionPage {...props} />}/>
                          <Route path='/add' exact component={props => <NewPoll {...props} />}/>
                          <Route path='/leaderboard' exact component={props => <LeaderBoard {...props} />}/>
                          <Route path='*' exact component={props => <NotFound {...props} />} />
                      </Switch>
          
                    </div>
                }
              </div> : // if authedUser is not there then will ask to login 
              <Switch>
                  <Route path='*' component={props => <Login {...props} />} />
                 
                  </Switch>
            }
              
          </div>
        </Fragment>
      </Router>
    
    )
  }
}


// will bring authedUser from our store

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)

