
// this function will formate the question 

export function formatQuestion(question, user) {
    const { id, timestamp, optionOne, optionTwo } = question
    const { name, avatarURL } = user

    return {
        name,
        id,
        timestamp,
        optionOne,
        optionTwo,
        avatar: avatarURL
    }
}
