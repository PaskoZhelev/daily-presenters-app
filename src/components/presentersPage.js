import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Loader, existingProjects, getCurrentDate, formatDate } from '../utils/projectUtils';
import '../App.css';

export default function PresentersPage() {
    const [presenters, setPresenters] = useState([])
    const [loading, setLoading] = useState(true)
    const [validProject, setValidProject] = useState(false)
    const [error, setError] = useState(false)

    const { projectName } = useParams();

    let fetchPresenters = async (projectName) => {
        //let response = await fetch(`/api/findProject?projectName=${projectName}`)
        // check is hardcoded for now to limit function calls
        const isValid = existingProjects.includes(projectName.toUpperCase())

        if(isValid) {
            // fetch projects
            let presentersRes = await fetch(`/api/findPresenters?projectName=${projectName.toUpperCase()}&date=${getCurrentDate()}`)
            let data = await presentersRes.json()
            setPresenters(data)
        }

        setValidProject(isValid)
        setLoading(false)
    }

    useEffect(() => {
        fetchPresenters(projectName)
      }, [projectName]);

    return (
      <div>
        <h1><span className="blue"></span>Daily<span className="blue"></span> <span className="yellow">Presenters</span></h1>
        {loading ? <Loader /> :
        validProject ?
        <div>
            <h2>Project: <strong>{projectName.toUpperCase()}</strong></h2>
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>Date</h1></th>
                        <th><h1>Presenter</h1></th>
                    </tr>
                </thead>
                <tbody>     
                    {presenters.map((presenter, index) => {
                        return index === 0 ? 
                        <tr id="selectedRow">
                            <td id="selectedCellName">{formatDate(presenter.date)}</td>
                            <td id="selectedCellDate">{presenter.person}</td>
                        </tr>  :
                        <tr>
                            <td>{formatDate(presenter.date)}</td>
                            <td>{presenter.person}</td>
                        </tr>
                            }
                        )
                    }
                </tbody>
            </table>
        </div> :
        <div><h2>Project with name <strong>{projectName}</strong> does not exist</h2></div>
        }
      </div>
    );
  }
