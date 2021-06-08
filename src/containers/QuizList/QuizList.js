import React, {Component} from 'react';
import classes from './QuizList.module.css'
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
//import axios from "../../axios/axios-quiz";
import {connect} from 'react-redux'
import {fetchQuizzes} from "../../store/actions/quiz";

class QuizList extends Component {

    // state = {
    //     quizzes: [],
    //     loading: true
    // }

    renderQuizes() {
        return this.props.quizzes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    // async componentDidMount() {
    //     try {
    //         const response = await axios.get('/quizes.json')
    //
    //         const quizzes = []
    //
    //         Object.keys(response.data).forEach((key, index) => {
    //             quizzes.push({
    //                 id:key,
    //                 name: `Test №${index + 1}`
    //             })
    //         })
    //
    //         this.setState({
    //             quizzes,
    //             loading: false
    //         })
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }

    componentDidMount() {
        this.props.fetchQuizzes()
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>List of tests</h1>

                    {
                        this.props.loading && this.props.quizzes.length !== 0
                        ? <Loader />
                        : <ul>
                                { this.renderQuizes() }
                          </ul>
                    }

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quizzes: state.quiz.quizzes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizzes: () => dispatch(fetchQuizzes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
