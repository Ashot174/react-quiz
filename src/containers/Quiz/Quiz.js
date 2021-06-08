import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
// import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {
    // onAnswerClickHandler = (answerId) => {
    //
    //     if (this.state.answerState){
    //         const key = Object.keys(this.state.answerState)[0]
    //         if (this.state.answerState[key] === 'success') {
    //             return
    //         }
    //     }
    //     const question = this.state.quiz[this.state.activeQuestion]
    //
    //     const results = this.state.results
    //
    //     if(question.rightAnswerId === answerId) {
    //         if (!results[question.id]) {
    //             results[question.id] = 'success'
    //         }
    //         this.setState({
    //             answerState: {[answerId]: 'success'},
    //             results: results
    //         })
    //         const timeOut = window.setTimeout(() => {
    //             if (this.isQuizFinished()) {
    //                 this.setState({
    //                     isFinished: true
    //                 })
    //             } else {
    //                 this.setState({
    //                     activeQuestion: this.state.activeQuestion + 1,
    //                     answerState: null
    //                 })
    //             }
    //
    //             window.clearTimeout(timeOut)
    //         }, 1000)
    //     } else {
    //         results[question.id] = 'error'
    //         this.setState({
    //             answerState: {[answerId]: 'error'},
    //             results: results
    //         })
    //     }
    // }

    // isQuizFinished() {
    //     return this.state.activeQuestion + 1 === this.state.quiz.length
    // }

    // retryHandler = () => {
    //     this.setState({
    //         results: {},
    //         isFinished: false,
    //         activeQuestion: 0,
    //         answerState: null,
    //     })
    // }

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer to all questions</h1>
                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.props.retryQuiz}
                            />
                            : <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                // onAnswerClick={this.onAnswerClickHandler}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId =>dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
