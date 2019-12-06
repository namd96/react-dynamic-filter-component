import React, { useState, useContext, Profiler, useEffect } from 'react';
import '../styles/filter.css'
import { Button, Modal, InputGroup } from "react-bootstrap";


const FilterComponent = props => {
    const [show, setShow] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState(false)
    const [filterState, setFilterState] = useState(props.initialFilterState || false)
    const handleShow = () => {
        setShow(true)
    }
    const filterOptions = props.filterOptions
    const handleClose = () => {
        console.log("see the output", filterState)
        props.returnStateToFilterMaster(filterState);
        setShow(false);
    }
    const handleClear = () => {
        setShow(false)
        setFilterState(false)
        props.returnStateToFilterMaster(false);
    }
    const handleInputTextChange = (e) => {
        setFilterState({
            ...filterState,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckBoxRadio = (e) => {
        setFilterState({
            ...filterState,
            [e.target.name]: !filterState[e.target.name]
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
                                        handleInputTextChange: handleInputTextChange.bind(this),
                                        value: filterState
                                    })}

                                </div> : "" : ""}
                            {selectedFilter && selectedFilter.options && selectedFilter.options.map((opt) => {
                                return <div >
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend >
                                            {
                                                selectedFilter.radio ? <InputGroup.Radio onChange={handleInputTextChange.bind(this)}
                                                    name={selectedFilter.keyValue} value={opt.value}
                                                    checked={filterState[selectedFilter.keyValue] == opt.value ? true : false}
                                                    aria-label="Checkbox for following text input" /> :
                                                    <InputGroup.Checkbox onChange={handleCheckBoxRadio.bind(this)}
                                                        name={opt.value} checked={filterState[opt.value] || false}
                                                        aria-label="Checkbox for following text input" />
                                            }
                                        </InputGroup.Prepend>
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

export default FilterComponent;