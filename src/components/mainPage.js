import React from 'react';
import '../App.css';
import { FaDiceD20 } from 'react-icons/fa';
import { IconContext } from "react-icons";

export default function MainPage() {
    return (
      <div>
        <h1><span className="blue"></span>Daily<span className="blue"></span> <span className="yellow">Presenters</span></h1>
        <div class="grid">
          <form action="https://httpbin.org/post" method="POST" class="form login">
              <div class="form__field">
                <label for="login__username">
                    <IconContext.Provider value={{ className: "icon" }}>
                      <div>
                        <FaDiceD20 />
                      </div>
                    </IconContext.Provider>
                    <span class="hidden">Project Name</span>
                </label>
                <input autocomplete="username" id="login__username" type="text" name="username" class="form__input" placeholder="Project Name" required />
              </div>
              <div class="form__field">
                <input type="submit" value="Find Project" />
              </div>
          </form>
        </div>
      </div>
    );
  }