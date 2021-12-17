import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION_TO_USER } from '../actions/questions'
import { ADD_ANSWER_TO_USER } from '../actions/shared'

export default function users (state = {}, action) {
    switch (action.type) {
        
        // return the new state contain users
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        // return the new state and add the new question id to user
        case ADD_QUESTION_TO_USER:
            let questions = {}
            questions = {
                [action.author]: {
                    ...state[action.author],
                    questions: state[action.author].questions.concat([action.id])
                }
            }
    
            return {
                ...state,
                ...questions,
            }
        // return the new state with added answer
        case ADD_ANSWER_TO_USER:
            let answers = {}
            answers = {
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid] : action.answer
                    }
                }
            }
            return {
                ...state,
                ...answers
            }
        default:
            return state
    }
}