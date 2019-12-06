import React, { useState, useContext, Profiler, useEffect } from 'react';
import '../styles/filter.css'
import { Button, Modal, InputGroup } from "react-bootstrap";
// import Modal from "react-bulma-components/lib/components/modal";
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
                <input name="testInput" value={props.value.testInput || ""} onChange={(e) => props.handleInputTextChange(e)}></input>
            </div>
        },
        options: [
            { display: "Test12", value: "test12" },
            { display: "Test22", value: "test22" },
            { display: "test32", value: "test32" },
        ],
    },

]
const ServiceCard = props => {
    const [show, setShow] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState(false)
    const [filterState, setFilterState] = useState(props.initialFilterState || false)
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        console.log("see the output",filterState)
        // setShow(false)
    } 
     const handleClear = () => {
         // setShow(false)
         setFilterState(false)
         console.log("see the output",filterState)
    }
    const handleInputTextChange = (e) => {
        setFilterState({
            ...filterState,
            [e.target.name]: e.target.value
        })
    }    

    const handleFilterClick = (filterValue) => {
        setSelectedFilter(filterValue)
    }
    return (
        <div style={{ width: "fit-content" }}>

            <Button variant="primary" onClick={handleShow.bind(this)} >View Details </Button>
            <Modal show={show} onHide={handleClose.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="filter-container">
                        <div className="key-container">
                            {
                                filterOptions && filterOptions.map((filterOp) => {
                                    return <div style={{ cursor: "pointer" }} onClick={() => handleFilterClick(filterOp)}>
                                        <div className="key-name">{filterOp.keyDisplay}</div>
                                        <hr className="key-separator" />
                                    </div>

                                })
                            }
                        </div>
                        <div className="value-container">
                            {
                                selectedFilter ? selectedFilter.customComponent ? <div>
                                    {selectedFilter.customComponent({
                                        handleInputTextChange : handleInputTextChange.bind(this),
                                        value:filterState 
                                    })}

                                </div> : "" : ""}
                            {selectedFilter && selectedFilter.options && selectedFilter.options.map((opt) => {
                                return <div >
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend >
                                            {
                                                selectedFilter.radio ? <InputGroup.Radio onChange={handleInputTextChange.bind(this)} name={selectedFilter.keyValue} value={opt.value} checked={filterState[selectedFilter.keyValue]==opt.value ? true : false}  aria-label="Checkbox for following text input" /> :
                                                    <InputGroup.Checkbox  onChange={handleInputTextChange.bind(this)} name={opt.value} checked={filterState[opt.value]=="on" ? true : false}   aria-label="Checkbox for following text input" />
                                            }
                                        </InputGroup.Prepend>
                                        {/* <FormControl aria-label="Text input with checkbox" /> */}
                                        <div className="key-name">{opt.display}</div>
                                    </InputGroup>
                                </div>

                            })

                            }
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClear}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )



}

export default ServiceCard;