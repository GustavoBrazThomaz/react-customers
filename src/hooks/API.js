import axios from "axios";

export default axios.create({
    baseURL: "https://rod-customers.herokuapp.com/api/customers",
})