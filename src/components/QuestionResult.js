import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Progress, Image, Card, Divider, Label } from 'semantic-ui-react'

class QuestionResult extends Component {
    render() {
        const { question } = this.props
        const { 
            name, avatar, optionOne, optionTwo
        } = question
        
        // those lines will get the percentage of votes and the count for each option
        const optionOnePercent = Math.floor((optionOne.votes.length / 3) * 100)
        const optionTwoPercent = Math.floor((optionTwo.votes.length / 3) * 100)
        const optionOneVotesCount = optionOne.votes.length
        const optionTwoVotesCount = optionTwo.votes.length

        let checkUserVoteOptionOne = false
        let checkUserVoteOptionTwo = false

        // check user answer to put a mark indicating which answer user choose
        
        if(optionOne.votes.includes(this.props.authedUser)) {
            checkUserVoteOptionOne = true
        } else if(optionTwo.votes.includes(this.props.authedUser)) {
            checkUserVoteOptionTwo = true
        }

        return (
            <div className="container">
            
            <Card color="green" className="question-result-card">
                <Card.Content>
                    <Card.Header>
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
                    <Divider vertical className="question-result-card-divider"/>
                </Card.Content>
                <Card.Description className="question-result-card-description">
                    <h2>Results:</h2>
                    <p className="question-result-title">Would you rather:</p>
                </Card.Description>
                <div className="question-result-nested-card">
                    <Card color="red">
                        <Card.Content>
                            <p className="question-result-options-title">{question.optionOne.text}</p>
                        </Card.Content>
                        <Card.Description>
                            {
                                checkUserVoteOptionOne ?  
                                <Label as='a' color='green' ribbon='right' size="large">
                                    Your vote
                                </Label> : null
                            }
                            <Progress 
                                percent={optionOnePercent} 
                                progress
                                success={optionOnePercent === 100}
                                className="question-result-progress"
                            >
                            </Progress>
                            <p className="question-result-votes">{`${optionOneVotesCount} out of 3 votes`}</p>                   
                        </Card.Description>
                    </Card>
                    <Card color="red">
                        <Card.Content>
                            <p className="question-result-options-title">{question.optionTwo.text}</p>
                        </Card.Content>
                        <Card.Description>
                            {
                                checkUserVoteOptionTwo ?  
                                <Label as='a' color='green' ribbon='right' size="large">
                                    Your vote
                                </Label> : null
                            }
                            <Progress 
                                percent={optionTwoPercent} 
                                progress
                                success={optionTwoPercent === 100}
                                className="question-result-progress"
                            >
                            </Progress>
                            <p className="question-result-votes">{`${optionTwoVotesCount} out of 3 votes`}</p> 
                        </Card.Description>
                    </Card>
                
                </div>
                
            </Card>
            </div>
        )
    }
}

// return authedUser from store
function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionResult)

