const TAXI_ENDPOINT = "https://qa-interview-test.qa.splytech.io/api/drivers?"
const CORS_URL = `https://cors-anywhere.herokuapp.com/${TAXI_ENDPOINT}`


const jsonify = res => res.json()

const getTaxis = () => {
    return fetch(CORS_URL).then(jsonify)
}

export default {
    getTaxis
}