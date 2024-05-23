import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createComment } from '../../http/commentApi'
import jwt_decode from "jwt-decode";
import { observer } from 'mobx-react-lite';

const AddComment = observer(({onHide, parent, setCount}) => {
    const [text, setText] = useState('')
    const {id} = useParams()
    const repo_id = id

    const checkId = () => {
        const obj = jwt_decode(localStorage.getItem('token'))
        return obj.id
    }
    const user_id = checkId()

    const checkName = () => {
        const obj = jwt_decode(localStorage.getItem('token'))
        return obj.name
    }
    const name = checkName()

    const addNewComment = () => {
        if (text) {
            createComment(name, text, user_id, repo_id, parent ? parent : null)
            .then(data => {
                setText('')
                onHide()
            })
            .then(() => setTimeout(() => setCount(prev => !prev), 1000))
            .catch(e => {
                alert(e.data.response.message)
            })
        }
    }
    return (
    <div className="repo-create-comment">
        {parent ?        
            <h1 className="repo-create-comment-h1">Create reply</h1>
        :
            <h1 className="repo-create-comment-h1">Create comment</h1>
        }
        <div className="repo-create-comment-div">
            <label>Type something...</label>
            <input placeholder='Very useful...' value={text}
                onChange={(e) => setText(e.target.value)}/>
        </div>
        <button className="repo-create-comment-button" onClick={onHide}>Cancel</button>
        <button className="repo-create-comment-button" onClick={addNewComment}>Confirm</button>
    </div>
  )
})

export default AddComment