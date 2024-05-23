import React, { useContext, useEffect, useState } from 'react'
import CommentItem from './CommentItem'
import { deleteComment, fetchComment } from '../http/commentApi'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import AddComment from './modals/AddComment'
import LoaderSVG from '../img/logo.svg'


const CommentContainer = observer(({repo_id}) => {

    const { comments } = useContext(Context)
    const [createComment, setCreateComment] = useState(false)
    let commentList = []
    const [sortedList, setSortedList] = useState([]);
    const [count, setCount] = useState(true)
    const [loaded, setLoaded] = useState(false) 

    useEffect(() => {
        setSortedList([])
        commentList.length = 0
        
        fetchComment(repo_id)
        .then(data => {
            commentList = [...data]
        })
        .then(() => {
            // сортировка реплаев к пэрентам
            for (let i = 0; i < commentList.length; i++) {
                if (!commentList[i].parent_id) {
                    setSortedList(prev => [...prev, commentList[i]])
                    for (let j = i + 1; j < commentList.length; j++) {
                        if (commentList[i].id === commentList[j].parent_id) {
                            setSortedList(prev => [...prev, commentList[j]])
                        }
                    }
                }
            }
        })
        .finally(() => setLoaded(true))                
    }, [count])


    if (!loaded) {
        return (
            <div className='main-loader-item'>
                <img src={LoaderSVG} alt=""/>
                LOADING...
            </div>
        )
    }     
    else {
        const commentMapping = sortedList.map((comment) => {
            return (
                <CommentItem key={comment.id} comment={comment} setCount={setCount}/>
            )
        })
    return (
        <>
        {createComment ? 
            <AddComment onHide={() => {setCreateComment(false)}} parent={null} setCount={setCount}/> : null}
            
        <button className="repo-item__create" onClick={() => setCreateComment(prev => !prev)}>Create comment</button>
            {commentMapping}
        </>
    )}
})

export default CommentContainer