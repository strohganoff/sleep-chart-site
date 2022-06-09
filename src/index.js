import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {
    SleepTable,
    WeekLabelTable
} from './components/DataTable/DataTable.jsx'
import {
    GlobalStyle,
    GroupedTable
} from './components/DataTable/styles.js';
import sleepData from './data/sleepTimes.json'
import summaryData from './data/sleepSummary.json'


class App extends Component {

    scrollToBottom = () => {
        // Get tfoot element of table representing current-day
        // There should only be one "currentDay" element on the page
        let currentDay = document.getElementById('currentDay').lastChild;

        let weekOfOffset = document.getElementById("weekOfLabel").offsetWidth + 5;

        window.scrollTo({
            top: currentDay.offsetTop,
            // top: 0,
            left: currentDay.offsetLeft - weekOfOffset,
            behavior: 'smooth'
          })
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        console.log("HERE")
    }

    render() {

        const weekdayNameArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

        // Gets list of records for a specific weekday in each week
        const getWeekdayDataList = (weekday) => Object.entries(sleepData).map( ([key, value]) => weekday in value ? value[weekday] : [])



        return (
            <>
                <GlobalStyle />

                <GroupedTable id="sleep">

                    <WeekLabelTable
                        // pass in week_of date values
                        data={Object.entries(sleepData).map( ([key, value]) => [key])}
                    />

                    {weekdayNameArray.map( (weekdayName) => 
                        <SleepTable
                            key={weekdayName}
                            firstHeader={weekdayName}
                            data={getWeekdayDataList(weekdayName)}
                            summaryData={summaryData[weekdayName]}
                        />
                    )}

                </GroupedTable>
            </>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('app'))