import React, { useState } from 'react';
import Filter from '../components/filterComponent';



const filterOptions = [
    {
        keyDisplay: "General",
        keyValue: "general",
        options: [
            { display: "Test1", value: "test1" },
            { display: "Test2", value: "test2" },
            { display: "test3", value: "test3" },
        ]
    }, {
        keyDisplay: "Specific",
        keyValue: "specific",
        options: [
            { display: "Test11", value: "test11" },
            { display: "Test21", value: "test21" },
            { display: "test31", value: "test31" },
        ]
    }, {
        keyDisplay: "Blah",
        keyValue: "blah",
        radio: true,
        options: [
            { display: "Test12", value: "test12" },
            { display: "Test22", value: "test22" },
            { display: "test32", value: "test32" },
        ]
    },

    {
        keyDisplay: "Custom Input",
        keyValue: "customInput",
        customComponent: (props) => {
            return <div>
                This is purely custom I can do anything here
                    <input name="testInput" value={props.value && props.value.customInput.testInput || ""} onChange={(e) => props.handleInputTextChange(e)}></input>
            </div>
        },
        options: [
            { display: "Test12", value: "test12" },
            { display: "Test22", value: "test22" },
            { display: "test32", value: "test32" },
        ],
    },

]

const Home = props => {
    const [masterFilterState, setMasterFilterState] =useState(false)
    const returnStateToFilterMaster = (filterState) => {
        setMasterFilterState(false)
        console.log("I am master", filterState)
    }
    return <Filter filterOptions={filterOptions} initialFilterState={masterFilterState} returnStateToFilterMaster={returnStateToFilterMaster.bind(this)} />
}

export default Home;