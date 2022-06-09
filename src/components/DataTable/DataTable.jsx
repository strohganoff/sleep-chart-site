import {
    StyledTable,
    StyledTHead,
    StyledTBody,
    TFootSummary,
    ActiveStyledTable
} from './styles.js';
import React, {ReactDOM, Component, Fragment} from 'react';
import { useEffect } from 'react/cjs/react.production.min';




const getCurrentDay = () => {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let latest_night_num = new Date().getDay() - 1
    if (latest_night_num < 0) latest_night_num = 6

    return days[latest_night_num]
}



export class DataRow extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.parentRef = props.parentRef;
    }
    componentDidMount() {
        if (this.parentRef) {
            window.addEventListener("scroll", this.listenToScroll);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.listenToScroll);
    }

    isActiveTable() {
        let tableClassList = Array.from(this.parentRef.current.classList);

        return tableClassList.reduce( (isActive, elem) => isActive || + elem.includes('ActiveStyledTable'), false);
    }

    isLabelTable() {
        return this.parentRef.current.id.toLowerCase().includes("label")
    }

    getTableHeaders() {
        return Array.from(this.parentRef.current.getElementsByTagName("thead"));
    }

    getCombinedHeadersHeight() {

        let headersList = this.getTableHeaders();
        let headersHeight;

        if(!this.isLabelTable()) {
            // If not a label table, calculate total height of all headers
            // Combined height of table headers
            headersHeight = headersList.reduce( (partialSum, elem) => partialSum + elem.offsetHeight, 0);

            // Subtract additional padding from headersHeight if this is the ActiveStyledTable
            if(this.isActiveTable()) headersHeight -= 25;
        }
        else {
            // For label table, ignore the second header from header height
            headersHeight = headersList[0].offsetHeight
        }

        return headersHeight
    }

    listenToScroll = (evt) => {

        let parentTable = this.parentRef.current

        let thisElement = this.myRef.current

        // Distance of parent table's top edge from the window top
        let tableDistanceFromTop = parentTable.offsetTop;

        // Combined height of table headers
        let headersHeight = this.getCombinedHeadersHeight();


        // Default padding for tbody cells is 12px; subtract for bottom margin to get height to bottom of content
        // let elemContentPaddingTopHeight = thisElement.offsetHeight - 12

        // Distance of top of 'td' element to bottom of header on scroll
        let topDistance = tableDistanceFromTop + thisElement.parentNode.offsetTop - headersHeight;
        
        if((topDistance + thisElement.offsetHeight) < window.scrollY) {
            // Percentage of 'td' element hidden behind header
            let percentageHidden = (1 - ((window.scrollY - topDistance) / thisElement.offsetHeight)) * 100;

            // encompassing 'tr' element
            // thisElement.parentNode.style.opacity = percentageHidden + "%";
            //                                                  0=full transparency             1=full color   
            // background: linear-gradient(to top, rgba(255,0,0,0),                rgba(255,0,0,1))
            thisElement.parentNode.style.opacity = "0%";

            // current 'td' element
            Array.from(thisElement.parentNode.children).map( (elem) => {
                // elem.style.opacity = percentageHidden + "%";
                elem.style.opacity = "0%";
            });
        }
        else {
            thisElement.parentNode.style.removeProperty('opacity')

            // all 'td' elements contained by parent 'tr' - should be all sibling 'td' in block
            Array.from(thisElement.parentNode.children).map( (elem) => {
                elem.style.removeProperty('opacity')
            })
        }
    }

    render() {
        return <>
                {this.props.dataArray.map((datum, index) => 
                    <td
                        ref={this.myRef}
                        key={index}
                    >
                        {datum ? datum : '-'}
                    </td>
                )}
            </>;
    }
}

export const DataTBody = ({data}) =>
    <StyledTBody>
        {data.map((dataRow, index) =>
            <tr key={index}>
                <DataRow dataArray={dataRow} />
            </tr>
        )}
    </StyledTBody>


// export const DataTRow = ({data}) =>


export class SleepTable extends Component {
    constructor(props) {
        super(props);
        this.state = {latest_night: getCurrentDay()}
        this.myRef = React.createRef()
    }

    isActive = () => {
        return this.props.firstHeader == this.state.latest_night;
    }

    componentDidMount() {
        // console.log(ReactDOM.findDOMNode(this));
    }

    render() {
        // For Sleep data, first header is weekday name
        const Table = this.isActive() ? ActiveStyledTable : StyledTable;

        return (
            <Table
                ref={this.myRef}
                {... this.isActive() ? {id: "currentDay"} : {}}
            >

                <StyledTHead>
                    <td colSpan="2">{this.props.firstHeader} Night</td>
                </StyledTHead>

                <StyledTHead
                    // ref={this.myRef}
                >
                    <td>Sleep Time</td>
                    <td>Wake Time</td>
                </StyledTHead>

                {/* <DataTBody data={this.props.data} /> */}
                <StyledTBody>
                    {this.props.data.map((dataRow, index) =>
                        <tr key={index}>
                            <DataRow
                                parentRef={this.myRef}
                                dataArray={dataRow.length > 0 ? dataRow : ['','']}
                            />
                        </tr>
                    )}
                </StyledTBody>

                {this.props.summaryData &&
                    <TFootSummary>
                        <tr>
                            <td colSpan="2">DAILY AVG</td>
                        </tr>
                        <tr>
                            <DataRow dataArray={this.props.summaryData.dailyAvg} />
                        </tr>

                        <tr>
                            <td colSpan="2">ROLLING 6WK AVG</td>
                        </tr>
                        <tr>
                            <DataRow dataArray={this.props.summaryData.rollingAvg} />
                        </tr>
                    </TFootSummary>
                }

            </Table>
        )
    }
}

export class WeekLabelTable extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }
    render = () =>
        <StyledTable
            id="weekOfLabel"
            ref={this.myRef}
        >

            <StyledTHead>
                <td>Week Of</td>
            </StyledTHead>

            {/* Set ignoreHeight attribute to not use this when calculating total header height */}
            <StyledTHead >
                <td>-</td>
            </StyledTHead>

            <StyledTBody>
                {this.props.data.map((dataRow, index) =>
                    <tr key={index}>
                        <DataRow
                            parentRef={this.myRef}
                            dataArray={dataRow}
                        />
                    </tr>
                )}
            </StyledTBody>

        </StyledTable>

}