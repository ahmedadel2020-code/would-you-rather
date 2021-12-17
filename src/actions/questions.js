import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';



function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}
function addQuestionToUser(question) {
    return {
        type: ADD_QUESTION_TO_USER,
        id: question.id,
        author: question.author
    }
}


// this function will add the question to questions and to user

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => { 
        const { authedUser } = getState();
        
        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(addQuestionToUser(question))
            })
            .then(() => dispatch(hideLoading()))
    }
}


// get all questions
export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}