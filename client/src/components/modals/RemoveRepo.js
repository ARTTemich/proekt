import React, {useState} from "react";
import './AddRepo.css'
import {deleteRepo} from "../../http/repoApi";
import {observer} from "mobx-react-lite";

const RemoveRepo = observer(({ onHide }) => {

    const [repoId, setRepoId] = useState(null)

    const removeRepo = () => {
        deleteRepo(repoId)
            .then(data => {
                setRepoId(null)
                onHide()
            }).catch(e => {
            alert(e.data.response.message)
        })
    }

    return (
        <div className="add-repo-confirm">
            <h1 className="add-repo-h1">Remove repository</h1>
            <div className="add-repo-div">
                <label>ID</label>
                <input placeholder='Type the repository id...' value={repoId}
                onChange={(e) => setRepoId(e.target.value)}/>
            </div>
            <button className="add-repo-button" onClick={onHide}>Cancel</button>
            <button autoFocus className="add-repo-button" onClick={removeRepo}>Confirm</button>
        </div>
    );
})

export default RemoveRepo