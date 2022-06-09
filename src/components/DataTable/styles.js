import styled, {createGlobalStyle} from 'styled-components'
import * as style_variables from './variables';


const screen_size = {
    iPhoneX: '400px'
}

const device = {
    mobile: '(max-width: ' + screen_size.iPhoneX + ')'
}


export const GlobalStyle = createGlobalStyle`
  body {
    /* height: 100%;
    width:100%; */
    margin:0px;
  }

  #app {
    /* height: 100%;
    width: 100%; */
  }

`;


export const GroupedTable = styled.div`
  padding: 10px;
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: .5rem;
  position: relative;
  filter: drop-shadow(0.4rem 0.4rem 0.45rem rgba(0, 0, 30, 0.5));

    > ${StyledTable} {
        width: fit-content;
        padding: 0%;
        flex-grow: 1;
        
        :first-of-type {
            left: 0;
            position: sticky;
            z-index: 5;
            filter: drop-shadow(0.05rem 0.05rem 0.45rem #4a4a4a);
            
            > thead:nth-of-type(2) {  // StyledTHead
                position: static;
            }

            /* Week Of table should have tbody content right-aligned */
            tbody td {
                text-align: right;
            }
        }

        :not(:first-of-type) {
            min-width: 175px;
        }
    }
`;


export const StyledTable = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 6px;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    /* box-shadow: 0 0 20px rgba(0,0,0,0.15); */
    /* filter: drop-shadow(0.4rem 0.4rem 0.45rem rgba(0, 0, 30, 0.5)); */

    

    td {
        padding: 12px;
        text-align: center;
        white-space: nowrap;
        border-radius: 0;
        width: fit-content;

    }

    /* IF THERE IS A TFOOT ELEMENT FOLLOWING StyledTBody */
    > tbody:not(:last-child) tr:last-child td {
        border-bottom: 3px solid ${style_variables.PRIMARY_GREEN};
    }
`;


export const StyledTHead = styled.thead`
    :is(${StyledTable} > *) {
        position: sticky;
        z-index: 1;

        td {
            color: ${style_variables.PRIMARY_OFF_WHITE};
            text-align: center;
            font-weight: bold;
        }

        :first-child {
            background-color: ${style_variables.PRIMARY_GREEN};
            top: 0;
            z-index: 2;

            td {
                // Rounded Top Corners of Table
                :first-child {
                    border-top-left-radius: 6px;
                }
                :last-child {
                    border-top-right-radius: 6px;
                }
            }
        }

        // Second header
        :nth-child(2) {
            background-color: ${style_variables.SECONDARY_GREEN};
            top: 40;
        }
    }
`


export const StyledTBody = styled.tbody`

    :is(${StyledTable} > *) {
        border-bottom: 3px solid tomato;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        /* box-shadow: 0 0 20px rgba(0,0,0,0.15); */

        > tr:nth-of-type(even) {
            background-color: ${style_variables.SECONDARY_OFF_WHITE};
        }
        > tr:nth-of-type(odd) {
            background-color: ${style_variables.PRIMARY_OFF_WHITE};
        }

        // ROUNDED BOTTOM CORNERS OF TABLE
        > tr:last-child {
            border-bottom: 3px solid tomato;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
    
            > td:first-child {
                border-bottom-left-radius: 6px;
            }
            > td:last-child {
                border-bottom-right-radius: 6px;
            }
        }
    }

`


export const TFootSummary = styled.tfoot`

    :is(${StyledTable} > *) {
        background-color: ${style_variables.FOOTER_GREY};
        width: fit-content;
        height: 100%;
        position: relative; /* for children with 'position: absolute' */
        z-index: -1;

        /* Fill background behind tbody's rounded bottom corners */
        ::before {
            background-color: ${style_variables.FOOTER_GREY};
            position: absolute;
            display: block;
            content: "";
            width: 100%;
            height: 6px;
            top: -6px;
            z-index: -5;
        }

        > tr {
        
            :last-child > td {
                :first-child {
                    border-bottom-left-radius: 6px;
                }
                :last-child {
                    border-bottom-right-radius: 6px;
                }
            }

            :nth-of-type(odd) {  /* Label headers */
                // background: tomato;
                    
                > td {
                    text-align: left;
                    font-size: .1em;
                    padding-bottom: 1;
                    padding-left: 1.2rem;
                    opacity: .6;
                }

                :not(:first-of-type) td {
                    padding-top: 0;
                }
            }
            :nth-of-type(even) {
                td {
                    font-size: .8em;
                    padding-top: 1;

                    :first-of-type {
                        padding-left: 2.4rem;
                    }
                    :last-of-type {
                        padding-right: 2.4rem;
                    }
                }
            }
        }
    }
  
 `

export const ACTIVE_TABLE_PADDING_TOP = 12

export const ActiveStyledTable = styled(StyledTable)`
    color: #f3f3f3; /* font color */
    margin-top: 0;

    tr {
        background-color: ${style_variables.PRIMARY_GREEN} !important;
    }
    
    thead {  // StyledTHead
        background-color: ${style_variables.PRIMARY_GREEN} !important;
        
        :first-of-type {
            top: -25 !important;
            td {
                /* Add 25px to default 12px */
                padding-top: calc(${ACTIVE_TABLE_PADDING_TOP}px + 25px) !important;
                top: 0;
            }
        }
        
        td {
            :first-of-type {
                padding-left:1.8rem;
                padding-right:1rem;
            }
            :last-of-type {
                padding-right:1.8rem;
                padding-left:1rem;
            }
        }
    }

    tbody {  // StyledTBody
        padding-top: 1rem;
        border-radius: 9px;

        tr {
            position: relative;
            td {
                :first-of-type {
                    padding-left: 32px;
                    padding-right: 0px;
                }
                :last-of-type {
                    padding-right: 32px;
                    padding-left: 0px;
                }
            }

            /* Bottom borders of each row */
            ::after {
                position: absolute;
                display: block;
                content: "";
                right: 39%;
                left: 39%;
                border-bottom: 1px solid ${style_variables.SECONDARY_GREEN};
            }
        }

        // IF THERE IS A TFOOT ELEMENT FOLLOWING
        :not(:last-child) tr:last-child td {
            border-bottom-color: ${style_variables.SECONDARY_GREEN};
        }
    }

    tfoot {  // TFootSummary
        ::before {
            background-color: ${style_variables.PRIMARY_GREEN} !important;
        }

        tr {
            :nth-of-type(odd) td {
                padding-left: 1.8rem !important;
            }
            :nth-of-type(even) {
                td {
                    font-size: 1.2em !important;

                    :first-of-type {
                        padding-right: 8;
                    }
                    :last-of-type {
                        padding-left: 8;
                    }
                }
                
            }
        }
    }

`
