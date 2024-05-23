import React, { useContext, useState } from 'react'
import { Context } from '../index'
import AddComment from './modals/AddComment'
import { checkId, checkName, checkRole } from '../utils/check'
import { deleteComment } from '../http/commentApi'
import { useNavigate, useParams } from 'react-router-dom'
import { REPOLIST_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'

const CommentItem = observer(({comment, setCount}) => {

  const [createComment, setCreateComment] = useState(false)
  const navigate = useNavigate()
  const { user } = useContext(Context)
  const role = checkRole()
  const user_id = checkId()
  const name = checkName()
  const {id} = useParams()

  const removeComment = () => {
    deleteComment(comment.id, user_id, role)
    .then(() => setTimeout(() => setCount(prev => !prev), 1000))
  }


  // console.log(comment.id)
  return (
    <>
      {createComment ? 
            <AddComment onHide={() => setCreateComment(false)} parent={comment.id} setCount={setCount}/> : null}
      {comment.parent_id ? 
      <div className={`repo-answer-item ${comment.id}`}>
          <div className="repo-item__name">
              {comment.name}
          </div>
          <div className="repo-item__text">
              {comment.text}
          </div>
          <div className="repo-item__buttons">
              {name === comment.name || role === "ADMIN" ? 
                <button className="repo-item__button" onClick={() => removeComment()}>Delete</button> : null
              }

          </div>
      </div>
      :
      <div className={`repo-item ${comment.id}`}>
          <div className="repo-item__name">
              {comment.name}
          </div>
          <div className="repo-item__text">
              {comment.text}
          </div>
          <div className="repo-item__buttons">
              <button className="repo-item__button" onClick={() => setCreateComment(prev => !prev)}>Reply</button>
              {name === comment.name || role === "ADMIN" ? 
                <button className="repo-item__button" onClick={() => removeComment()}>Delete</button> : null
              }

          </div>
      </div>}
    </>
  )
})

export default CommentItem