import React from 'react';
import '../App.css';

export default function PresentersPage() {
    return (
      <div>
        <h1><span class="blue"></span>Daily<span class="blue"></span> <span class="yellow">Presenters</span></h1>
        <h2>Project: <strong>CE-Phoenix</strong></h2>
        <table class="container">
            <thead>
                <tr>
                    <th><h1>Date</h1></th>
                    <th><h1>Presenter</h1></th>
                </tr>
            </thead>
            <tbody>
                <tr id="selectedRow">
                    <td id="selectedCellDate">05 Nov 21</td>
                    <td id="selectedCellName">Pasko Zhelev</td>
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