import React, {useContext, useState} from "react";
import './AddRepo.css'
import {createRepo} from "../../http/repoApi";
import {observer} from "mobx-react-lite";
import { Context } from "../../index";
import { checkName } from "../../utils/check";

const AddRepo = observer(({ onHide }) => {

    const name = checkName()
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const addNewRepo = () => {
        createRepo(title, description, url, name)
            .then(data => {
                setUrl('')
                setTitle('')
                setDescription('')
                onHide()
            }).catch(e => {
                alert(e.data.response.message)
        })
    }

  return (
    <div className="add-repo-confirm">
      <h1 className="add-repo-h1">Add new repository</h1>
      <div className="add-repo-div">
        <label>GitHub URL</label>
        <input placeholder='Type the URL...' value={url}
        onChange={e => setUrl(e.target.value)}/>
        <label>Title</label>
        <input placeholder='Type the title...' value={title}
               onChange={e => setTitle(e.target.value)}/>
        <label>Description</label>
        <input placeholder='Type the description...' value={description}
               onChange={e => setDescription(e.target.value)}/>
      </div>
      <button className="add-repo-button" onClick={onHide}>Cancel</button>
      <button autoFocus className="add-repo-button" onClick={addNewRepo}>Confirm</button>
    </div>
  );
})

export default AddRepo