import style from "./Row.module.css";
import BtnRed from "../buttons/BtnRed"
import { useState } from "react"
import { removeClientOperation, removeTestOperation } from "../../redux/user/user.operation";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Row = ({data, type, togleEdit, togleAssign, isAdmin}) => {
    const dispatch = useDispatch();
    const [showComment, setShowComment] = useState(false)
    const removeClient = (e) => {
        dispatch(removeClientOperation(e.currentTarget.getAttribute("rowid")))
    }
    const removeTest = (e) => {
        dispatch(removeTestOperation(e.currentTarget.getAttribute("rowid")))
    }

    const onHoverEnter = (e) => {
        setShowComment(true)
    }
    const onHoverLeave = (e) => {
        setShowComment(false)
    }

    return (
        <div className={style.row}>
            {type === "client" ? (
                <>
                    <div style={{
                        width: "10%",
                        borderRight: "1px solid grey"
                    }}>
                        {data.id}
                    </div>
                    <div style={{
                        width: "25%",
                        borderRight: "1px solid grey"
                    }}>
                        {data.FirstName}
                    </div>
                    <div style={{
                        width: "25%",
                        borderRight: "1px solid grey"
                    }}>
                        {data.LastName}
                    </div>
                    <div style={{
                        width: "25%",
                        borderRight: "1px solid grey"
                    }}>
                        {data.Email}
                    </div>
                    <div style={{
                        width: "15%",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Link to={"/clients/test?id="+data.id} style={{
                            width: "40%",
                            height: "18px",
                            color: "white",
                            fontSize: "14px",
                            background: "grey",
                            borderColor: "grey",
                            marginRight: "5px",
                            padding: "2.1px 10px",
                            borderRadius: "4px"
                        }}>Open results</Link>
                        <BtnRed rowid={data.id} onClick={removeClient} name={"Delete"} btnStyle={{
                            width: "30%",
                            height: "100%",
                            color: "white"
                        }}/>
                    </div>
                </>
            ) : (
                type === "test" && isAdmin ? (
                    <>
                        <div style={{
                            width: "10%",
                            borderRight: "1px solid grey"
                        }}>
                            {data.id}
                        </div>
                        <div style={{
                            width: "25%",
                            borderRight: "1px solid grey"
                        }}>
                            {data.name}
                        </div>
                        <div style={{
                            width: "25%",
                            borderRight: "1px solid grey"
                        }}>
                            {data.questions.length}
                        </div>
                        <div style={{
                            width: "25%",
                            borderRight: "1px solid grey"
                        }}>
                            {data.assigns}
                        </div>
                        <div style={{
                            width: "15%",
                            textAlign: "center"
                        }}>
                            <BtnRed rowid={data.id} onClick={togleEdit} name={"Edit"} btnStyle={{
                                width: "30%",
                                height: "100%",
                                color: "white",
                                background: "grey",
                                borderColor: "grey",
                                marginRight: "5px"
                            }}/>
                            <BtnRed rowid={data.id} onClick={togleAssign} name={"Assign"} btnStyle={{
                                width: "30%",
                                height: "100%",
                                color: "white",
                                background: "grey",
                                borderColor: "grey",
                                marginRight: "5px"
                            }}/>
                            <BtnRed rowid={data.id} onClick={removeTest} name={"Delete"} btnStyle={{
                                width: "30%",
                                height: "100%",
                                color: "white",
                            }}/>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{
                            width: "10%",
                            borderRight: "1px solid grey"
                        }}>
                            {data.id}
                        </div>
                        <div style={{
                            width: "25%",
                            borderRight: "1px solid grey"
                        }}>
                            {data.name}
                        </div>
                        <div style={{
                            width: "25%",
                            borderRight: "1px solid grey"
                        }}>
                            {data.questions.length}
                        </div>
                        <div style={data.status == "Checked" ? ({
                                width: "25%",
                                borderRight: "1px solid grey",
                                cursor: "pointer"
                            }) : ({
                                width: "25%",
                                borderRight: "1px solid grey",
                            })}
                            onPointerEnter={onHoverEnter}
                            onPointerLeave={onHoverLeave}
                        >
                            {data.status}
                            <div style={showComment ? (
                                {
                                    display: "block",
                                    position: "ablosute",
                                }
                            ) : (
                                {
                                    display: "none",
                                    position: "ablosute"
                                }
                            )}>
                                <b>Psychologist comments:</b> {data.comments}
                            </div>
                        </div>
                        <div style={{
                            width: "15%",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            {data.status == "To test" ? (
                                <Link to={"/tests/test?id="+data.id} style={{
                                    width: "40%",
                                    height: "18px",
                                    color: "white",
                                    fontSize: "14px",
                                    background: "grey",
                                    borderColor: "grey",
                                    marginRight: "5px",
                                    padding: "2.1px 10px",
                                    borderRadius: "4px"
                                }}>Open test</Link>
                            ) : (
                                <>No actions</>
                            )}
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default Row;