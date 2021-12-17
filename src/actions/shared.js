import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'


export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';

function addAnswerToUser({ authedUser, qid, answer }) {
    return {
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        answer
    }
}
function addAnswerToQuestion({ authedUser, qid, answer }) {
    return {
        type: ADD_ANSWER_TO_QUESTION,
        authedUser,
        qid,
        answer
    }
}

// this function will add the answer to the user and to the question
export function handleAddAnswer(info) {
    return(dispatch) => {
        dispatch(addAnswerToUser(info))
        dispatch(addAnswerToQuestion(info))
        return saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in handleAddAnswer: ', e)
                dispatch(addAnswerToUser(info))
                dispatch(addAnswerToQuestion(info))
            })
    }
}

// this function will return the initial data which contain questions, users and loading bar
export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}