import React from 'react';
import '../App.css';

export default function PresentersPage() {
    return (
      <div>
        <h1><span className="blue"></span>Daily<span className="blue"></span> <span className="yellow">Presenters</span></h1>
        <h2>Project: <strong>CE-Phoenix</strong></h2>
        <table className="container">
            <thead>
                <tr>
                    <th><h1>Date</h1></th>
                    <th><h1>Presenter</h1></th>
                </tr>
            </thead>
            <tbody>
                <tr id="selectedRow">
                    <td id="selectedCellName">05 Nov 21</td>
                    <td id="selectedCellDate">Pasko Zhelev</td>
                </tr>
                <tr>
                    <td>06 Nov 21</td>
                    <td>Daniel Rezek</td>
                </tr>
                <tr>
                    <td>07 Nov 21</td>
                    <td>Govardhana Ganji</td>
                </tr>
            <tr>
                    <td>08 Nov 21</td>
                    <td>Kanchan Kumar</td>
                </tr>
            <tr>
                    <td>09 Nov 21</td>
                    <td>Blanca Mateos</td>
                </tr>
            <tr>
                    <td>10 Nov 21</td>
                    <td>Lavanya Sampath</td>
                </tr>
            </tbody>
        </table>
      </div>
    );
  }