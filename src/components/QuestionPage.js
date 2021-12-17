import React from 'react'
import { connect } from 'react-redux'
import { Button, Image, Card, Divider, Checkbox, Form } from 'semantic-ui-react'
import { formatQuestion } from '../utils/helpers'
import QuestionResult from './QuestionResult'
import { handleAddAnswer } from '../actions/shared'
import NotFound from './NotFound'
class QuestionPage extends React.Component {
    state = {
        isSubmitted: false,
        value: ''
    }

    // will get the value that user choose 
    handleChange = (e, data) => {
        const value = data.value
        this.setState(() => ({
            value
        }))
    }
    

    // if user submit the form will get the value that he choose then dispatch action

    handleSubmit = (e) => {

        const { dispatch, authedUser, question } = this.props
    
    
        const { optionOne, optionTwo } = question

        if(optionOne.text === this.state.value) {
            dispatch(handleAddAnswer({
                authedUser,
                qid: question.id,
                answer: Object.keys(question)[3]
            }))
        } else if(optionTwo.text === this.state.value) {
            dispatch(handleAddAnswer({
                authedUser,
                qid: question.id,
                answer: Object.keys(question)[4]
            }))
        }
        
        
        this.setState(() => ({
            isSubmitted: true,
            value: ''
        }))
    }

    render() {
    
        const { question, authedUser} = this.props
        const { isSubmitted } = this.state

        // if the new added question is not there in our fake database then will redirect him to the home page
        if(question === null) {
            return <NotFound />
        }
        // if user submitted the form then will take him to the result page
        if(isSubmitted === true) {
        
            return (
                <QuestionResult question={question}/>
            )
        }

        const { 
            name, avatar, optionOne, optionTwo
        } = question

        // if user is then the answered tab and click on the Results will take him to the result page
        if(optionTwo.votes.includes(authedUser) || optionOne.votes.includes(authedUser)) {
            return (
                <QuestionResult question={question} />
            )
        }
        
        return (
            <div className="container">
            <Form onSubmit={this.handleSubmit}>
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
                        <Card.Description className="card-description-question-page">
                            <h3>Would you rather:</h3>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label={optionOne.text}
                                    name='checkboxRadioGroup'
                                    value={optionOne.text}
                                    checked={this.state.value === optionOne.text}
                                    onChange={this.handleChange}    
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label={optionTwo.text}
                                    name='checkboxRadioGroup'
                                    value={optionTwo.text}
                                    checked={this.state.value === optionTwo.text}
                                    onChange={this.handleChange} 
                                />
                            </Form.Field>
                        </Card.Description>
                        <Button 
                            fluid={true} 
                            color={"green"}
                            disabled={this.state.value !== optionTwo.text && this.state.value !== optionOne.text}
                            className="card-btn-question-page"
                            >
                            Submit
                        </Button>
                    </Card>
                </Form>
        
            </div>
        )
    }
}

// return authedUser, question formated from our store
function mapStateToProps({ authedUser, questions, users}, props) {
    const { id } = props.match.params
    const question = questions[id]

    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}
export default connect(mapStateToProps)(QuestionPage)
