import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Loader, existingProjects, getCurrentDate, formatDate, formatReverseDate } from '../utils/projectUtils';
import '../App.css';

export default function PresentersPage() {
    const generationCycles = 2;
    const [presenters, setPresenters] = useState([])
    const [people, setPeople] = useState([])
    const [project, setProject] = useState([])
    const [loading, setLoading] = useState(true)
    const [validProject, setValidProject] = useState(false)

    const { projectName } = useParams();

    // generate list of presenters based on indexOfNextPresenter
    // which is updated nightly using mongodb scheduled trigger
    const generatePresenters = async () => {
        // check is hardcoded for now to limit function calls
        const isValid = existingProjects.includes(projectName.toUpperCase())

        if(isValid) {
            // fetch people
            let peopleRes = await fetch(`/api/findPeople?projectName=${projectName.toUpperCase()}`)
            let peopleData = await peopleRes.json()
            setPeople(peopleData)

            // in case there are no people
            if(peopleData.length === 0) {
                setLoading(false);
                setValidProject(isValid);
                return;
            }

            // fetch project
            let project = await fetch(`/api/findProject?projectName=${projectName.toUpperCase()}`)
            let projectData = await project.json()
            setProject(projectData);
            
            // start from the previous date
            let now = new Date();
            let currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            let presentersList = [];

            // ensure valid index
            let indexOfNextPresenter = projectData.indexOfNextPresenter === undefined || projectData.indexOfNextPresenter >= peopleData.length ? 0 : projectData.indexOfNextPresenter;

            // first cycle
            for(let j = indexOfNextPresenter; j < peopleData.length; j++) {
                currentDate = findNextPossibleDate(currentDate);
                presentersList.push({person: peopleData[j].name, date: currentDate});
            }

            // generate rest of the cycles
            for (let i = 0; i < generationCycles; i++) {
                for (let j = 0; j < peopleData.length; j++) {
                    currentDate = findNextPossibleDate(currentDate);
                    presentersList.push({person: peopleData[j].name, date: currentDate});
                } 
            }

            setPresenters(presentersList);
        }

        setLoading(false);
        setValidProject(isValid)
    }

    const fetchPresenters = async () => {
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

    const findNextPossibleDate = (currentDate) => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

        while(currentDate.getDay() === 6 || currentDate.getDay() === 0) {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        }

        return currentDate
    }

    const skipPresenter = async () => {
        setLoading(true);
        await fetch(`/api/updateProject?projectName=${projectName.toUpperCase()}&currentPresenterIndex=${project.indexOfNextPresenter}&peopleCount=${people.length}`);
        generatePresenters();
    }

    /* add new presenters */
    const addPresenters = async () => {
        setLoading(true)
        let projectRes = await fetch(`/api/findProject?projectName=${projectName.toUpperCase()}`)
        let project = await projectRes.json()
        let today = new Date()
        let lastGeneratedDate = new Date(project.lastGeneratedDate)
        let currentDate;

        // prevent generation for more than 2 months
        if(new Date(today.getFullYear(), today.getMonth() + 2, today.getDate()) < lastGeneratedDate) {
            return;
        }

        if(lastGeneratedDate < today) {
            currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
        } else {
            currentDate = new Date(lastGeneratedDate.getFullYear(), lastGeneratedDate.getMonth(), lastGeneratedDate.getDate())
        }

        let peopleRes = await fetch(`/api/findPeople?projectName=${projectName.toUpperCase()}`)
        let peopleList = await peopleRes.json()

        for (let i = 0; i < generationCycles; i++) {
            for (let j = 0; j < peopleList.length; j++) {
                currentDate = findNextPossibleDate(currentDate);
                await fetch(`/api/createPresenter?projectName=${projectName.toUpperCase()}&personName=${peopleList[j].name}&date=${formatReverseDate(currentDate)}`)
            } 
        }

        await fetch(`/api/removePresenters?projectName=${projectName.toUpperCase()}&date=${formatReverseDate(new Date())}`)
        await fetch(`/api/updateProject?projectName=${projectName.toUpperCase()}&date=${formatReverseDate(currentDate)}`)
        fetchPresenters()
    }

    useEffect(() => {
        generatePresenters()
      }, []);

    return (
      <div>
        <h1><span className="blue"></span>Daily<span className="blue"></span> <span className="yellow">Presenters</span></h1>
        {loading ? <Loader /> :
        validProject ?
            presenters && presenters.length ?
                <div>
                    <div className="mobile-menu-div">
                        <nav className="mobile-menu">
                            <label htmlFor="show-menu" className="show-menu"><span>Menu</span><div className="lines"></div></label>
                            <input type="checkbox" id="show-menu"/>
                            <ul id="menu">
                                <li><Link to="/" >Home</Link></li>
                                <li><Link to={`/people/${projectName}`} >Add Team Members</Link></li>
                                <li><Link to={`/project/${projectName}`} onClick={skipPresenter} >Skip Presenter</Link></li>
                            </ul>
                        </nav>
                    </div>
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
                                    <tr key="{index}" id="selectedRow">
                                        <td id="selectedCellName">{formatDate(presenter.date)}</td>
                                        <td id="selectedCellDate">{presenter.person}</td>
                                    </tr>  :
                                    <tr key="{index}">
                                        <td>{formatDate(presenter.date)}</td>
                                        <td>{presenter.person}</td>
                                    </tr>
                                        }
                                    )
                            }
                        </tbody>
                    </table>
                </div> :
                <div>
                    <div className="mobile-menu-div">
                        <nav className="mobile-menu">
                            <label htmlFor="show-menu" className="show-menu"><span>Menu</span><div className="lines"></div></label>
                            <input type="checkbox" id="show-menu"/>
                            <ul id="menu">
                                <li><Link to="/" >Home</Link></li>
                                <li><Link to={`/people/${projectName}`} >Add Team Members</Link></li>
                                <li><Link to={`/project/${projectName}`} onClick={skipPresenter} >Skip Presenter</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <h2>No presenters exist yet</h2>
                </div> :
        <div><h2>Project with name <strong>{projectName}</strong> does not exist</h2></div>
        }
      </div>
    );
  }
