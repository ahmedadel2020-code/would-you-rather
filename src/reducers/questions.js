import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions'
import { ADD_ANSWER_TO_QUESTION } from '../actions/shared'

export default function questions (state = {}, action) {
    switch (action.type) {

        // return the new state contain the questions
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        
        // if user add question will return the new state with that question
        case ADD_QUESTION:
            const { question } = action
            return {
                ...state,
                [question.id]: action.question,
            }
        // if user choose answer for the question will return the new state and add user name to votes
        case ADD_ANSWER_TO_QUESTION:
            let option = {}
            option = {
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser]),
                        text: state[action.qid][action.answer].text
                        
                    }
                }
            }
            return {
                ...state,
                ...option
        
            }
    
        default:
            return state
    }
}