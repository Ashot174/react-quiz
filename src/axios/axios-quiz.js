import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-5d860-default-rtdb.firebaseio.com/'
})
