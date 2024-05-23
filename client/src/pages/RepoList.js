import React, {useContext, useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { REPOLIST_ROUTE } from "../utils/consts";
import Repo from './Repo'
import RepoPage from "./RepoPage";
import {fetchRepo} from "../http/repoApi";

const RepoList = observer(() => {
  const { repos } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => 
  {
    fetchRepo()
        .then(data => {
          console.log(data)
          repos.setRepos(data)})
  }, [])

  return (
    <div className="main-information">
      {repos.repos.map((repo) => {
        return (
            <Repo key={repo.id} repo={repo}/>
        )
      })}
    </div>
  );
});

export default RepoList;
