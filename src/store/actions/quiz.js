import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS, FINISH_QUIZ,
    QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionTypes";

export function fetchQuizzes() {
    return async dispatch => {
        dispatch(fetchQuizzesStart())
            try {
                const response = await axios.get('/quizes.json')

                const quizzes = []

                Object.keys(response.data).forEach((key, index) => {
                    quizzes.push({
                        id:key,
                        name: `Test №${index + 1}`
                    })
                })

                // this.setState({
                //     quizzes,
                //     loading: false
                // })
                dispatch(fetchQuizzesSuccess(quizzes))
            } catch(e) {
                //console.log(e)
                dispatch(fetchQuizzesError(e))
            }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizzesStart())

        try {
            const response = await axios.get(`/quizes/${quizId}.json`) //url ic enq id-n stanum this.props.match.params.id
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizzesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz: quiz
    }
}

export function fetchQuizzesStart() {
    return {
        type: FETCH_QUIZZES_START
    }
}

export function fetchQuizzesSuccess(quizzes) {
    return {
        type: FETCH_QUIZZES_SUCCESS,
        quizzes: quizzes
    }
}

export function fetchQuizzesError(e) {
    return {
        type: FETCH_QUIZZES_ERROR,
        error: e
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }

}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}


export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState){
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }
        const question = state.quiz[state.activeQuestion]

        const results = state.results

        if(question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, results))
            // this.setState({
            //     answerState: {[answerId]: 'success'},
            //     results: results
            // })
            const timeOut = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                    // this.setState({
                    //     isFinished: true
                    // })
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                    // this.setState({
                    //     activeQuestion: this.state.activeQuestion + 1,
                    //     answerState: null
                    // })
                }

                window.clearTimeout(timeOut)
            }, 1000)
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
            // this.setState({
            //     answerState: {[answerId]: 'error'},
            //     results: results
            // })
        }
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}


