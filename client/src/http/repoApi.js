import axios from "axios";
import { $host } from "./index";

// TODO: create func "editRepo" with changing info

export const createRepo = async (title, description, url, name) => {

    console.log(localStorage.getItem('token'))
      let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      };

      axios.post('http://localhost:5000/api/repo/create', {title, description, url, name}, axiosConfig)
    //   .then((res) => {
    //     // console.log("RESPONSE RECEIVED: ", res);
    //       alert('Repo has successfully created')
    //   })
      .catch((err) => {
          alert('Something went wrong...')
      })
}

export const deleteRepo = async (id) => {
    let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    };

    axios.post('http://localhost:5000/api/repo/delete', {id}, axiosConfig)
        // .then((res) => {
        //     // console.log("RESPONSE RECEIVED: ", res);
        //     alert('Repo has successfully removed')
        // })
        .catch((err) => {
            alert('Something went wrong...')
        })
}
// {params: {limit: 5}}
export const fetchRepo = async () => {
    const {data} = await $host.get('http://localhost:5000/api/repo')
    return data
}

export const fetchOneRepo = async (id) => {
    const {data} = await $host.get('http://localhost:5000/api/repo/' + id)
    return data
}
