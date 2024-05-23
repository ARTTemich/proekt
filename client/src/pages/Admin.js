import React, { useState } from "react";
import "../components/Admin/Admin.css";
import AddRepo from "../components/modals/AddRepo";
import {observer} from "mobx-react-lite";
import RemoveRepo from "../components/modals/RemoveRepo";

const Admin = observer(() => {
    const [repoVisible, setRepoVisible] = useState(false)
    const [removeRepo, setRemoveRepo] = useState(false)

    return (
    <div className="admin-container">
      <h2 className="admin-h2">ADMIN PANEL</h2>
      <button className="admin-button" onClick={() => setRepoVisible(true)}>
          Add REPO
      </button>
      {repoVisible ?
      <AddRepo onHide={() => setRepoVisible(false)}/>
          : null
      }
      <button className="admin-button" onClick={() => setRemoveRepo(true)}>
          Remove REPO
      </button>
        {removeRepo ?
            <RemoveRepo onHide={() => setRemoveRepo(false)}/>
            : null
        }
    </div>
    );
});

export default Admin;
