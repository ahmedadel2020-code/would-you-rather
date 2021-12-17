import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Card, Divider, Label } from 'semantic-ui-react'


class LeaderBoard extends Component {
    render() {
        const { users } = this.props
        let scores = []

        // iterate over users object and calculate the total score for each user
        for(let user in users) {
            const answeredQuestions = Object.keys(users[user].answers).length
            const createdQuestion = users[user].questions.length
            const score = answeredQuestions + createdQuestion
            scores.push(score);
        }

        // sort the scores array descending then get the unique values
        const sortedScores = scores.sort().reverse()
        const uniqueArr = [...new Set(sortedScores)]

        // colors for winning users
        const first = "yellow"
        const second = "grey"
        const third = "orange"

        const cards = [];

        // iterate over scores array then compare each user score and show them ordered descending
        
        for(let scoreArr in uniqueArr) {
            for(let user in users) {
                const answeredQuestions = Object.keys(users[user].answers).length
                const createdQuestion = users[user].questions.length
                const score = answeredQuestions + createdQuestion
                
                if(uniqueArr[scoreArr] === score) {
                    cards.push(
                            <Card key={user}>
                            
                                <Card.Content>
                                    <Label 
                                        corner="left" 
                                        icon="trophy" 
                                        size="large"
                                        color={
                                            uniqueArr[0] === uniqueArr[scoreArr] ? first 
                                            : uniqueArr[1] === uniqueArr[scoreArr] ? second : third
                                        }
                                    />
                                    <Image 
                                        className="card-image"
                                        size='small' 
                                        circular 
                                        src={users[user].avatarURL} 
                                        alt={`Avatar of ${user}`}
                                    />
                                    <Divider vertical className="leaderboard-card-divider"/>
            
                                    <div className="leaderboard-description">
                                        <h3>{users[user].id}</h3>
                                        <span>Answered questions</span>
                                        <span className="leaderboard-count">{answeredQuestions}</span>
                                        <Divider className='leaderboard-horizontal-divider'/>
                                        <span>Created questions</span>
                                        <span className="leaderboard-count">{createdQuestion}</span> 
                                    </div>
                                    <Divider vertical className="leaderboard-card-divider-description"/>
                                    <div className='leaderboard-score'>
                                        <h3 className='leaderboard'>Score</h3>
                                        <Divider />
                                        <Label 
                                            circular 
                                            className="label-score-color"
                                            size="large"
                                        >
                                            {score}
                                        </Label>
                                    </div>
                                
                                </Card.Content>
                            </Card>
                    )
                
                    
                }           
            }
        }
        
        return (
            
            <div className="container">
                {cards}    
            
            </div>
            
        )
    }
}

// return users object from our store
function mapStateToProps({users}) {
    return {
        users,
    }
}

export default connect(mapStateToProps)(LeaderBoard)
