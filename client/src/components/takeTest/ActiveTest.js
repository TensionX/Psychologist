import { useEffect, useState } from "react";
import { getActiveTestOperation, answerActiveTestOperation } from "../../redux/user/user.operation";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getActiveTest, getUser } from "../../redux/user/user.selectors";
import { useSearchParams, useNavigate  } from "react-router-dom";
import BtnBlue from "../buttons/BtnBlue";
import style from "./Tests.module.css";
import Container from "../container/Container";
import Spiner from "../spiner/Spiner";

import Header from "../header/Header";

const ActiveTest = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const test = useSelector(getActiveTest);
    const [answers, setAnswers] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getActiveTestOperation({id: searchParams.get("id")}))
    }, [dispatch]);

    const loading = useSelector(getLoading);
    const user = useSelector(getUser);
    const isAdmin = user.user.Creator == 0 ? true : false

    const handleChange = (e) => {
        answers[e.target.name] = e.target.value
        setAnswers({...answers})
    }

    const handleSubmit = () => {
        const answ = []
        for(let a of Object.entries(answers)){
            answ.push({
                id: a[0],
                answer: a[1]
            })
        }
        dispatch(answerActiveTestOperation({testId: test.id, creatorId: test.creatorid, answers: answ}))
        onSubmit()
    }

    const onSubmit = () => navigate(`/tests`)

    return (
        <Container>
        {loading ? (
            <div className={style.flexSpiner}>
            <Spiner style={{ color: "black", fontSize: "4em" }} />
            </div>
        ) : (
            <>
                <Header />
                {test ? (
                    <>
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
                                {test.name}
                            </p>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "10px 10% 0 10%"
                        }}>
                            {test.questions.map((q) => (
                                <div key={q.id} style={{
                                    textAlign:"start"
                                }}>
                                    <p style={{
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        color: "black",
                                        paddingBottom: "7px"
                                    }}>
                                        {q.question}
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row", 
                                        justifyContent: "space-between",
                                        paddingBottom: "15px"
                                    }}
                                    onChange={handleChange}
                                    >
                                        <label>
                                            0
                                            <input type={"radio"} name={q.id} value={0}/>
                                        </label>
                                        <label>
                                            1
                                            <input type={"radio"} name={q.id} value={1}/>
                                        </label>
                                        <label>
                                            2
                                            <input type={"radio"} name={q.id} value={2}/>
                                        </label>
                                        <label>
                                            3
                                            <input type={"radio"} name={q.id} value={3}/>
                                        </label>
                                    </div>
                                </div>
                            ))}
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%"
                            }}>
                                <BtnBlue btnStyle={Object.entries(answers).length >= test.questions.length ? {
                                    width: "8%",
                                    color: "white",
                                    height: "38px"
                                } : {
                                    width: "8%",
                                    color: "white",
                                    background: "grey",
                                    cursor: "not-allowed",
                                    borderColor: "grey",
                                    height: "38px"
                                }} name={"Submit"} onClick={handleSubmit} disable={Object.entries(answers).length >= test.questions.length ? false : true}/>
                            </div>
                        </div>
                    </>
                ) : (
                    <h1>Test not found</h1>
                )}
            </>
        )}
        </Container>
    );
};

export default ActiveTest;
