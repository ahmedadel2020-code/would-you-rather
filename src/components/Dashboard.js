import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tab } from 'semantic-ui-react'


class Dashboard extends Component {
    render() {
        const { questionIds, authedUser, questions } = this.props
        
        
        // this logic will give us the unanswered questions and answered questions
        
        let unansweredQuesIds = []
        let answeredQuesIds = []
        let counter = 0
            for(let question in questions) {
                const votesOptionOne = questions[questionIds[counter]].optionOne.votes
                const votesOptionTwo = questions[questionIds[counter]].optionTwo.votes

                if(!votesOptionOne.includes(authedUser)) {
                    if(!votesOptionTwo.includes(authedUser)) {
                        unansweredQuesIds.push(questionIds[counter]) 
                    } else {
                        answeredQuesIds.push(questionIds[counter])
                    }
                } else {
                    answeredQuesIds.push(questionIds[counter])
                }
                counter++ 
            }
        
        // this function will iterate over unansweredQuesIds then will put them in tab of unanswered
        function handleUnanswered(){
            return (
                <Tab.Pane attached={false}>
                <ul>
                {unansweredQuesIds.map((id) => (
                    <li key={id}>
                        <Question id={id}/>
                
                    </li>
                ))}
                </ul>
                </Tab.Pane>
            )
        }
        
        // this function will iterate over unansweredQuesIds then will put them in tab of answered question
        function handleAnswered(){
            return (
                <Tab.Pane attached={false}>
                <ul>
                {answeredQuesIds.map((id) => (
                    <li key={id}>
                        <Question id={id}/>
                
                    </li>
                ))}
                </ul>
                </Tab.Pane>
            )
        }

        // this will create two panes unanswered, answered
        const panes = [
            {
                menuItem: 'Unanswered',
                render: () => handleUnanswered(),
            },
            {
                menuItem: 'Answered',
                render: () => handleAnswered(),
            },
        ]
        
        // this will create our tab
        const TabPointing = () => <Tab menu={{ pointing: true, widths: 2}} panes={panes} className="container"/>
        return (
            <div>
            
                <TabPointing />
    
            </div>
        )
    }
}

// return authedUser, questions from our store then will sort each question depending on the timestamp

function mapStateToProps({ questions, authedUser }) {

    return {
        authedUser,
        questions,
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)
