import axios from "axios";
import { $host } from "./index";

export const createComment = async (name, text, user_id, repo_id, parent_id) => {

    // console.log(localStorage.getItem('token'))
      let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      };

      axios.post('http://localhost:5000/api/comment/create', {name, text, user_id, repo_id, parent_id}, axiosConfig)
    //   .then((res) => {
    //       alert('Comment has successfully created')
    //   })
      .catch((err) => {
          alert('Something went wrong...')
      })
}

export const deleteComment = async (id, user_id, role) => {
    let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    };

    axios.post('http://localhost:5000/api/comment/delete', {id, user_id, role}, axiosConfig)
        // .then((res) => {
        //     alert('Repo has successfully removed')
        // })
        .catch((err) => {
            alert('Something went wrong...')
        })
}
export const fetchComment = async (id) => {
    const {data} = await $host.get('http://localhost:5000/api/comment/' + id)
    return data
}
