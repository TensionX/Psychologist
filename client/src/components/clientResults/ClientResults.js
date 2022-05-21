import { useEffect, useState } from "react";
import { clientTestsOperation, answerActiveTestOperation } from "../../redux/user/user.operation";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getClientTests, getUser } from "../../redux/user/user.selectors";
import { useSearchParams, useNavigate  } from "react-router-dom";
import BtnBlue from "../buttons/BtnBlue";
import CommentTestModal from "../modal/CommentTestModal"
import style from "./Tests.module.css";
import Container from "../container/Container";
import Spiner from "../spiner/Spiner";

import Header from "../header/Header";

const ClientResults = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const tests = useSelector(getClientTests);
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [testToComment, setTestToComment] = useState(null);
    const togleComment = (e) => {
        if(isOpenComment == true){
            setTestToComment(null)
        }
        else{
            setTestToComment(e.currentTarget.getAttribute("rowid"))
        }
        setIsOpenComment(!isOpenComment)
    };
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(clientTestsOperation({id: searchParams.get("id")}))
    }, [dispatch]);

    const loading = useSelector(getLoading);
    const user = useSelector(getUser);
    const isAdmin = user.user.Creator == 0 ? true : false

    return (
        <Container>
        {loading ? (
            <div className={style.flexSpiner}>
            <Spiner style={{ color: "black", fontSize: "4em" }} />
            </div>
        ) : (
            <>
                <Header />
                <div style={{
                    display: "flex",
                    margin: "10px 10%"
                }}>
                    <p style={{
                        fontSize: "28px",
                        color: "black",
                        fontWeight: "600",
                        width: "95%",
                        textAlign: "start"
                    }}>
                        Client results
                    </p>
                </div>
                <div style={{
                    display: "flex",
                    margin: "10px 10%",
                    flexDirection: "row"
                }}>
                    {tests?.map((t) => (
                        <div style={{
                            width: "20%",
                            padding: "10px",
                            border: "1px solid grey",
                            borderRadius: "4px",
                            marginRight: "10%"
                        }}>
                            <p style={{
                                fontSize: "20px",
                                color: "black",
                                fontWeight: "600",
                                width: "95%",
                                textAlign: "start"
                            }}>
                                {t.name}
                            </p>
                            <div style={{
                                display: "flex",
                                margin: "10px 0",
                                flexDirection: "column"
                            }}>
                                {t.question.length > 0 ? (
                                    <>
                                        {t.question.map((q) => (
                                            <>
                                                <p style={{
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    color: "black",
                                                    width: "95%",
                                                    textAlign: "start"
                                                }}>
                                                    {q.question}
                                                </p>
                                                <p style={{
                                                    fontSize: "16px",
                                                    color: "black",
                                                    width: "95%",
                                                    textAlign: "start",
                                                    marginBottom: "10px"
                                                }}>
                                                    {q.mark}
                                                </p>
                                            </>
                                        ))}
                                        <p style={{
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            color: "black",
                                            width: "95%",
                                            textAlign: "start"
                                        }}>
                                            Total
                                        </p>
                                        <p style={{
                                            fontSize: "16px",
                                            color: "black",
                                            width: "95%",
                                            textAlign: "start",
                                            marginBottom: "10px"
                                        }}>
                                            {t.totalMark}
                                        </p>
                                    </>
                                ) : (
                                    <p style={{
                                        fontSize: "16px",
                                        color: "black",
                                        width: "95%",
                                        textAlign: "start"
                                    }}>
                                        No answered questions
                                    </p>
                                )}
                                {t.status === 3 ? (
                                    <BtnBlue btnStyle={{
                                        color: "white",
                                        background: "grey",
                                        borderColor: "grey",
                                        width: "100%",
                                        height: "30px"
                                    }} name={"Already submited"}
                                    onClick={togleComment}
                                    rowid={t.assignId}
                                    disable={true}/>
                                ) : (
                                    <BtnBlue btnStyle={{
                                        color: "white",
                                        width: "100%",
                                        height: "30px"
                                    }} name={"Submit and Add comment"}
                                    onClick={togleComment}
                                    rowid={t.assignId}/>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {isOpenComment && (
                    <CommentTestModal
                        name={"Add comment"}
                        testId={testToComment}
                        togleModal={togleComment}
                        display={{ display: "none" }}
                    />
                )}
            </>
        )}
        </Container>
    );
};

export default ClientResults;
