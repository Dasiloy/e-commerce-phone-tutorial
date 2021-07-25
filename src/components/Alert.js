import React from "react";
import { useUserContext } from "../context/user";
import { FaWindowClose } from "react-icons/fa";

export default function Alert() {
  const { alert, hideAlert } = useUserContext();
  const { show, msg, type } = alert;
    return (
      <div
        className={`alert-container ${
          show && "alert-show"
        } alert-${type}`}>
        <div className='alert'>
          <p>{msg}</p>
          <button className='alert-close'>
            <FaWindowClose onClick={hideAlert}/>
          </button>
        </div>
      </div>
    );
  }

