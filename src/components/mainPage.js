import React, { useState } from 'react'
import '../App.css';
import { FaDiceD20 } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { useHistory } from 'react-router';

export default function MainPage() {
    const [textFieldValue, setTextFieldValue] = useState('');
    const history = useHistory();

    const _handleTextFieldChange = (e) => {
        setTextFieldValue(e.target.value);
    };

    const _handleSubmit = (e) => {
      history.push('/project/' + textFieldValue);
  };

    return (
      <div>
        <h1><span className="blue"></span>Daily<span className="blue"></span> <span className="yellow">Presenters</span></h1>
        <div class="grid">
          <form onSubmit={_handleSubmit} class="form login">
              <div class="form__field">
                <label htmlFor="login__username">
                    <IconContext.Provider value={{ className: "icon" }}>
                      <div>
                        <FaDiceD20 />
                      </div>
                    </IconContext.Provider>
                    <span class="hidden">Project Name</span>
                </label>
                <input onChange={_handleTextFieldChange} id="login__username" type="text" autoFocus class="form__input" placeholder="Project Name" required />
              </div>
              <div class="form__field">
                <input type="submit" value="Find Project" />
              </div>
          </form>
        </div>
      </div>
    );
  }