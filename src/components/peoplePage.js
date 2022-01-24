import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Loader, existingProjects } from '../utils/projectUtils';
import '../App.css';
import { FaDiceD20 } from 'react-icons/fa';
import { IconContext } from "react-icons";

export default function PeoplePage() {
    const [people, setPeople] = useState([])
    const [loading, setLoading] = useState(true)
    const [validProject, setValidProject] = useState(false)
    const [textFieldValue, setTextFieldValue] = useState('');

    const { projectName } = useParams();

    const _handleTextFieldChange = (e) => {
        setTextFieldValue(e.target.value);
    };

    let fetchPeople = async () => {
        // check is hardcoded for now to limit function calls
        const isValid = existingProjects.includes(projectName.toUpperCase())

        if(isValid) {
            // fetch people
            let peopleRes = await fetch(`/api/findPeople?projectName=${projectName.toUpperCase()}`)
            let data = await peopleRes.json()
            setPeople(data)
        }

        setValidProject(isValid)
        setLoading(false)
    }

    const addPerson = async (e) => {
        await fetch(`/api/createPerson?projectName=${projectName.toUpperCase()}&personName=${textFieldValue}`)
        setTextFieldValue('')
    }

    const removePerson = async (personName) => {
      await fetch(`/api/removePerson?projectName=${projectName.toUpperCase()}&personName=${personName}`)
      let peopleRes = await fetch(`/api/findPeople?projectName=${projectName.toUpperCase()}`)
      let data = await peopleRes.json()
      setPeople(data)
  }

    useEffect(() => {
        fetchPeople()
      }, []);

    return (
      <div>
        <h1><span className="blue"></span>Daily<span className="blue"></span> <span className="yellow">Presenters</span></h1>
        {loading ? <Loader /> :
        validProject ?
            people && people.length ?
                <div>
                  <div className="mobile-menu-div-2">
                        <nav className="mobile-menu">
                            <label htmlFor="show-menu" className="show-menu"><span>Menu</span><div className="lines"></div></label>
                            <input type="checkbox" id="show-menu"/>
                            <ul id="menu">
                                <li><Link to="/" >Home</Link></li>
                                <li><Link to={`/project/${projectName}`} >Presenters List</Link></li>
                            </ul>
                        </nav>
                  </div>
                  <div class="custom-grid">
                  <form onSubmit={addPerson} class="form login">
                      <div class="form__field">
                        <label htmlFor="login__username">
                            <IconContext.Provider value={{ className: "icon" }}>
                              <div>
                                <FaDiceD20 />
                              </div>
                            </IconContext.Provider>
                            <span class="hidden">Person Name</span>
                        </label>
                        <input autocomplete="username" onChange={_handleTextFieldChange} id="login__username" type="text" name="username" class="form__input" placeholder="Person Name" required />
                      </div>
                      <div class="form__field">
                        <input type="submit" value="Add Person" />
                      </div>
                  </form>
                </div>
                    <h2>Project: <strong>{projectName.toUpperCase()}</strong></h2>
                    <table className="container">
                        <tbody>     
                            {people.map((person, index) => (
                                    <tr key="{index}">
                                        <td><strong>{person.name}</strong>  <button className="button" onClick={() => removePerson(person.name)}>Remove</button></td>
                                    </tr>
                                )
                                    )
                            }
                        </tbody>
                    </table>
                </div> :
                <div>
                  <div class="custom-grid">
                  <form onSubmit={addPerson} class="form login">
                      <div class="form__field">
                        <label htmlFor="login__username">
                            <IconContext.Provider value={{ className: "icon" }}>
                              <div>
                                <FaDiceD20 />
                              </div>
                            </IconContext.Provider>
                            <span class="hidden">Person Name</span>
                        </label>
                        <input onChange={_handleTextFieldChange} id="login__username" type="text" class="form__input" placeholder="Person Name" required />
                      </div>
                      <div class="form__field">
                        <input type="submit" value="Add Person" />
                      </div>
                  </form>
                </div>
                  <h2>There are no people added to project: <strong>{projectName}</strong></h2>
                </div> :
        <div><h2>Project with name <strong>{projectName}</strong> does not exist</h2></div>
        }
      </div>
    );
  }
