import React, {useContext, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { Context } from "../index";
import {REPOLIST_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import RepoPage from "./RepoPage";

const Repo = ({repo}) => {

    const navigate = useNavigate()
    return (
        <div className="main-repo"
            onClick={() => {navigate(REPOLIST_ROUTE + "/" + repo.id);}}
        >
            <p>{repo.title}</p>
            <span>{repo.description}</span>
        </div>
    );
};

export default Repo;
