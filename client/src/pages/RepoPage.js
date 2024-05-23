import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchOneRepo} from "../http/repoApi";
import AddComment from '../components/modals/AddComment';
import { Context } from '../index';
import { fetchComment } from '../http/commentApi';
import CommentItem from '../components/CommentItem';
import { observer } from 'mobx-react-lite';
import { getAllRating, getRating, setRating } from '../http/ratingApi';
import { checkId } from '../utils/check';
import CommentContainer from '../components/CommentContainer';
import StarSVG from '../img/star.svg'
import FillStarSVG from '../img/star-fill.svg'

const RepoPage = observer(() => {

    const [createComment, setCreateComment] = useState(false)
    const [repo, setRepo] = useState({})
    const [userRate, setUserRate] = useState(0)
    const [repoRate, setRepoRate] = useState({})

    const [newRate, setNewRate] = useState(0)
    const {id} = useParams()
    const repo_id = +id
    const userId = checkId()
    const rateList = [1, 2, 3, 4, 5]

    const debounce = (fn, ms) => {
        let timeout
        return function () {
            const fnCall = () => {fn.apply(this, arguments)}
            clearTimeout(timeout)
            timeout = setTimeout(fnCall, ms)
        }
    }

    useEffect(() => {
        fetchOneRepo(id)
            .then(data => setRepo(() => data))
            .then(() => getAllRating(id))
            .then(data => setRepoRate(() => data))
            .then(async () => await getRating(repo_id, userId))
            .then(data => setUserRate(prev => data[0]?.rate))
    }, [])

    async function rate(rate, repo_id, user_id) {
        await setRating(rate, repo_id, user_id)
    }

    async function updateRating() {

        fetchOneRepo(id)
            .then(data => setRepo(() => data))
    }

    const newUpdateRating = debounce(updateRating, 1000)

    const displayRating = rateList.map(rateNum => {
            if (rateNum <= userRate) {
                return (
                    <img onClick={() => {
                        if(userRate === rateNum){
                        setUserRate(() => 0)}
                        else setUserRate(() => rateNum)
                        rate(rateNum, repo_id, checkId())
                        .then(newUpdateRating())
                    }} src={FillStarSVG} alt="rate"/>
                )
            } else {
                return (
                    <img onClick={() => {
                        setUserRate(() => rateNum)
                        rate(rateNum, repo_id, checkId())
                        .then(newUpdateRating())
                    }} src={StarSVG} alt="rate"/>
                )
            }
    })

    return (
        
        <div className='repo-container'>
            <div className="repo-information">
                <div className="repo-name">{repo.title}</div>
                <div className="repo-author">"Created by {repo.author}"</div>
                <div className="repo-description">{repo.description}</div>
                <div className="repo-extra">
                    <a href={repo.url} target="_blank" rel="noreferrer">GitHub</a>
                    <div className="repo-extra-rating">
                        <ul>
                            {displayRating}
                        </ul>
                        {repo.rating}
                        <img src={StarSVG} alt="rating"/>
                    </div>
                </div>
            </div>
            <div className="repo-comment">
                <CommentContainer repo_id={id}/>
            </div>
        </div>
    
    );
})

export default RepoPage;