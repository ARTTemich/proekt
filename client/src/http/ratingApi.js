import axios from "axios";
import { $host } from "./index";

export const setRating = async (rate, repo_id, user_id) => {

    // console.log(localStorage.getItem('token'))
      let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      };

      axios.post('http://localhost:5000/api/rating/rate', {rate, repo_id, user_id}, axiosConfig)
      .then((res) => {
          alert('Rated')
      })
      .catch((err) => {
          alert('Something went wrong...')
      })
}

export const getRating = async (repo_id, userId) => {
    const {data} = await $host.get('http://localhost:5000/api/rating/' + repo_id + '/' + userId)
    return data
}

export const getAllRating = async (repo_id) => {
    const {data} = await $host.get('http://localhost:5000/api/rating/' + repo_id)
    return data
}