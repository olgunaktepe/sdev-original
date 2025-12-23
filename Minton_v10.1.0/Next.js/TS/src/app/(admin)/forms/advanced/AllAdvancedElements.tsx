"use client"
import React, {useState} from "react";
import Link from "next/link";
import Select from "react-select";
import {Typeahead} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {InputMask} from '@react-input/mask';

// components
import {CustomDatePicker} from "@/components";
import {Option} from "react-bootstrap-typeahead/types/types";

const ReactSelect = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="header-title">
                    <Link
                        rel="noreferrer"
                        href={{pathname: "https://github.com/JedWatson/react-select"}}
                        target="_blank"
                    >
                        React select
                    </Link>
                </h4>
                <p className="mb-1 mt-3 fw-bold">Single Selection</p>
                <p className="text-muted fs-14">React-Select based Select element</p>
                <Select
                    className="react-select react-select-container"
                    classNamePrefix="react-select"
                    options={[
                        {value: "chocolate", label: "Chocolate"},
                        {value: "strawberry", label: "Strawberry"},
                        {value: "vanilla", label: "Vanilla"},
                    ]}
                ></Select>

                <p className="mb-1 mt-3 fw-bold">Multiple Selection</p>
                <p className="text-muted fs-14">
                    React-Select based Select (Multiple) element
                </p>
                <Select
                    isMulti={true}
                    options={[
                        {value: "chocolate", label: "Chocolate"},
                        {value: "strawberry", label: "Strawberry"},
                        {value: "vanilla", label: "Vanilla"},
                    ]}
                    className="react-select react-select-container"
                    classNamePrefix="react-select"
                ></Select>
            </div>
        </div>
    );
};

interface OptionTypes {
    id: number | string;
    value: string;
    label: string;
}

const Typeaheads = () => {
    const [singleSelections, setSingleSelections] = useState<Option[]>([]);
    const [multiSelections, setMultiSelections] = useState<Option[]>([]);

    const options: Array<OptionTypes> = [
        {id: 1, value: "chocolate", label: "Chocolate"},
        {id: 2, value: "strawberry", label: "Strawberry"},
        {id: 3, value: "vanilla", label: "Vanilla"},
    ];

    const onChangeSingleSelection = (selected: any[]) => {
        setSingleSelections(selected);
    };

    const onChangeMultipleSelection = (selected: Option[]): void => {
        setMultiSelections(selected);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="header-title">
                    <Link
                        rel="noreferrer"
                        href={{
                            pathname: "http://ericgio.github.io/react-bootstrap-typeahead/",
                        }}
                        target="_blank"
                    >
                        Typeahead
                    </Link>
                </h4>
                <p className="mb-1 mt-3 fw-bold">Single Selection</p>
                <p className="text-muted fs-14">Typeahead based Select element</p>
                <Typeahead
                    id="select2"
                    labelKey={"label"}
                    multiple={false}
                    onChange={onChangeSingleSelection}
                    options={options}
                    placeholder="Choose a state..."
                    selected={singleSelections}
                />

                <p className="mb-1 mt-3 fw-bold">Multiple Selection</p>
                <p className="text-muted fs-14">
                    Typeahead based Select (Multiple) element
                </p>
                <Typeahead
                    id="select3"
                    labelKey="label"
                    multiple
                    onChange={onChangeMultipleSelection}
                    options={options}
                    placeholder="Choose a state..."
                    selected={multiSelections}
                />
            </div>
        </div>
    );
};

const DatePickers = () => {
    const [selectedDate1, setSelectedDate1] = useState<Date>(new Date());
    const [selectedDate2, setSelectedDate2] = useState<Date>(new Date());
    const [selectedDate3, setSelectedDate3] = useState<Date>(new Date());
    const [selectedDate4, setSelectedDate4] = useState<Date>(new Date());
    const [selectedDate5, setSelectedDate5] = useState<Date>(new Date());
    const [dateRange, setDateRange] = useState<any>([
        new Date(),
        new Date().setDate(new Date().getDate() + 7),
    ]);
    const [startDate, endDate] = dateRange;

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="header-title">Date &amp; Time Picker</h4>
                <p className="text-muted fs-14">
                    A simple date picker using{" "}
                    <Link
                        target="_blank"
                        rel="noreferrer"
                        href={{pathname: "https://reactdatepicker.com/"}}
                    >
                        ReactJS Datepicker
                    </Link>
                </p>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Single Date</label> <br/>
                            <CustomDatePicker
                                hideAddon={true}
                                value={selectedDate1}
                                onChange={(date) => {
                                    setSelectedDate1(date);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">
                                Single Date with multiple months
                            </label>{" "}
                            <br/>
                            <CustomDatePicker
                                hideAddon={true}
                                monthsShown={2}
                                value={selectedDate2}
                                onChange={(date) => {
                                    setSelectedDate2(date);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Custom date format</label> <br/>
                            <CustomDatePicker
                                hideAddon={true}
                                dateFormat="yyyy-MM-dd"
                                value={selectedDate3}
                                onChange={(date) => {
                                    setSelectedDate3(date);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Specific date range</label> <br/>
                            <CustomDatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                hideAddon={true}
                                dateFormat={"yyyy/MM/dd"}
                                onChange={(date) => {
                                    setDateRange(date);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Select Time</label> <br/>
                            <CustomDatePicker
                                hideAddon={true}
                                showTimeSelect
                                timeFormat="HH:mm"
                                tI={60}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                                value={selectedDate4}
                                onChange={(date) => {
                                    setSelectedDate4(date);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Time only</label> <br/>
                            <CustomDatePicker
                                hideAddon={true}
                                showTimeSelect
                                showTimeSelectOnly
                                tI={60}
                                dateFormat="h:mm aa"
                                timeCaption="Time"
                                value={selectedDate5}
                                onChange={(date) => {
                                    setSelectedDate5(date);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputMasks = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="header-title">Input Masks</h4>
                <p className="text-muted fs-14">
                    Input masks by{" "}
                    <Link
                        target="_blank"
                        rel="noreferrer"
                        href={"https://github.com/GoncharukOrg/react-input"}
                    >
                        @react-input/mask
                    </Link>
                </p>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Phone Number with Area Code</label>{" "}
                            <br/>
                            <InputMask mask="(__) ____-____" replacement={{_: /\d/}}
                                       placeholder="(__) ____-____"
                                       className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">US Phone Number</label> <br/>
                            <InputMask mask="(___) ___-____" replacement={{_: /\d/}}
                                       placeholder="(___) ___-____"
                                       className="form-control"
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Date</label> <br/>
                            <InputMask mask="__/__/____" replacement={{_: /\d/}}
                                       placeholder="__/__/____"
                                       className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Time</label> <br/>
                            <InputMask
                                mask="__:__:__" replacement={{_: /\d/}}
                                placeholder="__:__:__"
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const AllAdvancedElements = () => {
    return (
        <>
            <div className="row">
                <div className="col-lg-6">
                    <ReactSelect/>
                </div>
                <div className="col-lg-6">
                    <Typeaheads/>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12">
                    <DatePickers/>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12">
                    <InputMasks/>
                </div>
            </div>
        </>
    )
}

export default AllAdvancedElements