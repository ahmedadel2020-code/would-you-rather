import React, { Component } from 'react'
import { Button, Form, Card, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewPoll extends Component {
    state = {
        optionOne: {
            textOne: ''
        },
        optionTwo: {
            textTwo: ''
        },
        toHome: false,

    }

    // this function will seState for textOne in optionOne
    handleChangeOne = (e) => {
        const textOne = e.target.value
        this.setState({
            optionOne: {
                textOne
            }
        })
    }
    
    
    // this function will seState for textTwo in optionTwo
    handleChangeTwo = (e) => {
        const textTwo = e.target.value
        this.setState(() => ({
            optionTwo: { textTwo },
        }))
    }

    // on submit our form will dispatch action that will add that question 
    handleSubmit = (e) => {
        e.preventDefault()

        const { textOne } = this.state.optionOne
        const { textTwo } = this.state.optionTwo
        const { dispatch, id } = this.props
        dispatch(handleAddQuestion(textOne, textTwo))

        this.setState({
            optionOne: {
                textOne: ''
            },
            optionTwo: {
                textTwo: ''
            },
            toHome: id ? false : true,
        })

    }
    render() {
        const { textOne } = this.state.optionOne
        const { textTwo } = this.state.optionTwo
        const { toHome } = this.state
        
        // if user submit the form then will redirect back to home page
        if(toHome === true) {
            return <Redirect to='/' />
        }
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <Card>
                        <Card.Content>
                            <Card.Header className="new-poll-header">Create a New Poll</Card.Header>
                        </Card.Content>
                        <Divider />
                        <Card.Description textAlign="left">
                        <h3 className="new-poll-title">Would you rather...</h3>
                        <div className="form-container">
                            <Form.Field>
                                <input 
                                    placeholder='Enter option one'
                                    value={textOne}
                                    onChange={this.handleChangeOne}
                                />
                            </Form.Field>
                            <Divider horizontal>Or</Divider>
                            <Form.Field>
                                <input 
                                    placeholder='Enter option two' 
                                    value={textTwo}
                                    onChange={this.handleChangeTwo}
                                />
                            </Form.Field>
                        </div>
                        <Button
                            className="new-poll-btn"
                            type='submit'
                            disabled={!textTwo}
                            color="green"
                        >
                            Submit
                        </Button>
                    </Card.Description>
                    </Card>
                    
            
                </Form>
            </div>
        )
    }
}

export default connect()(NewPoll)
