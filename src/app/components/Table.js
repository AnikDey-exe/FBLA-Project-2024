"use client";

import { useEffect, useState, memo } from "react";
import Input from "./Input";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Table = ({ columns, data, keyIdentifier, pageSize = 5, isMobile, containerStyle = {} }) => {
    const [paginatedData, setPaginatedData] = useState(data);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPaginatedData(data);
        console.log("rerender")
    }, [data])

    function onChangeInput(e, keyId) {
        const { name, value } = e.target;

        const editedData = paginatedData.map((item) =>
            item.id === keyId && name ? { ...item, [name]: value } : item
        )

        setPaginatedData(editedData);
    }

    async function onChangeDropdown(e, columnKey, keyId, sideEffectCallback) {
        const { value } = e.target;

        const editedData = paginatedData.map((item) =>
            item.id === keyId && columnKey ? { ...item, [columnKey]: value } : item
        )

        try {
            await sideEffectCallback;
            setPaginatedData(editedData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div style={{
                overflowX: isMobile ? "scroll" : null,
            }}>
                <table style={{
                    marginTop: 20,
                    ...containerStyle
                }}>
                    <thead>
                        <tr>
                            {columns.map((item, i) => {
                                return <th key={i}> {item.name} </th>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.slice(page * pageSize, (page + 1) * pageSize).map((item, i) => {
                            return (
                                <tr key={item[keyIdentifier]}>
                                    {columns.map((column, i) => {
                                        return (
                                            column.editable ?
                                                column.editType === "dropdown" ?
                                                    <td key={i}>
                                                        <Dropdown
                                                            initialValue={"Rejected"}
                                                            value={item[column.columnKey]}
                                                            onChange={(e) =>
                                                                onChangeDropdown(
                                                                    e,
                                                                    column.columnKey,
                                                                    item[keyIdentifier],
                                                                    column.onChangeCallback(item[keyIdentifier], e.target.value)
                                                                )
                                                            }
                                                            options={column.dropdownOptions}
                                                            style={{
                                                                width: "100%",
                                                                padding: 12,
                                                                borderRight: "12px solid transparent"
                                                            }}
                                                        />
                                                    </td> :
                                                    <td key={i}>
                                                        <Input
                                                            name={column.columnKey}
                                                            value={item[column.columnKey]}
                                                            type="text"
                                                            onChange={(e) => onChangeInput(e, item[keyIdentifier])}
                                                            placeholder="Type here"
                                                            style={{
                                                                fontSize: 16,
                                                                backgroundColor: 'transparent',
                                                                border: "none",
                                                                width: "100%",
                                                                padding: 12
                                                            }}
                                                        />
                                                    </td> :
                                                <td key={i}
                                                    style={{
                                                        fontSize: 16,
                                                        backgroundColor: 'transparent',
                                                        padding: 12
                                                    }}>
                                                    {column.link ? <Link href={item[column.columnKey]}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        style={{ textDecoration: 'underline' }}>
                                                        <span>View</span>
                                                    </Link> : item[column.columnKey]}
                                                </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div style={{
                display: "flex",
                justifyContent: 'flex-end',
                alignItems: "center",
                marginTop: 20
            }}>
                <FontAwesomeIcon
                    onClick={() => {
                        if (page !== 0) {
                            setPage(prevPage => prevPage - 1)
                        }
                    }}
                    color="black"
                    icon={faChevronLeft} />
                <span style={{
                    marginLeft: 10,
                    marginRight: 10
                }}> Page {page + 1} of {Math.ceil(paginatedData.length / pageSize)} </span>
                <FontAwesomeIcon
                    onClick={() => {
                        if (page !== Math.ceil(paginatedData.length / pageSize) - 1) {
                            setPage(prevPage => prevPage + 1)
                        }
                    }}
                    color="black"
                    icon={faChevronRight} />
            </div>
        </div>
    )
}

export default Table;