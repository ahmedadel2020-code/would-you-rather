import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Button, Image, Card, Divider } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

class Question extends Component {

    render() {
        
        const { question, authedUser } = this.props
      
    

        const { 
            name, avatar, id, optionOne, optionTwo
        } = question
        
        /* 
            if authedUser didn't answer any question,
            will make the button color green and if he answered question will make the button color blue
        */
        
        let check = false
        if(!optionOne.votes.includes(authedUser)) {
            if(!optionTwo.votes.includes(authedUser)) {
                check = true
            }   
        }
        return (
            <div className="question-container">
            
                <Card color="green">
                    <Card.Content>
                        <Card.Header 
                            className="card-header"
                        >
                            {`${name} asks:`}
                        </Card.Header>
                        <Divider />
                        <Image 
                            className="card-image"
                            size='small' 
                            circular 
                            src={avatar} 
                            alt={`Avatar of ${name}`}
                        />
                        <Divider vertical className="card-divider"/>
                    </Card.Content>
                    <Card.Description textAlign="center" className="card-description">
                        <h4 className="card-description-title">Would you rather:</h4>
                        <p className="card-paragraph">{optionOne.text}</p>
                        <p>or...</p>
                    </Card.Description>
                    <Link to={`/questions/${id}`}>
                        <Button 
                            color={check ? "green" : "blue"}
                            className="card-btn"
                        >
                            {check ? "Answer poll" : "Results"}
                        </Button>
                    </Link>
                </Card>
        
            </div>
        )
    }
}

// return authedUser, users, questions from store and formate question
function mapStateToProps({authedUser, users, questions}, { id }) {
    const question = questions[id]

    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default connect(mapStateToProps)(Question)
