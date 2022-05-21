import { useEffect, useState } from "react";
import { getTestsOperation, getClientsOperation } from "../../redux/user/user.operation";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getTests, getUser, getClients } from "../../redux/user/user.selectors";
import BtnBlue from "../buttons/BtnBlue";
import Row from "../row/Row";
import TableHeader from "../row/TableHeader";
import AddTestsModal from "../modal/AddTestsModal"
import EditTestsModal from "../modal/EditTestsModal"
import AssignTestsModal from "../modal/AssignTestsModal"
import style from "./Tests.module.css";
import Container from "../container/Container";
import Spiner from "../spiner/Spiner";

import Header from "../header/Header";

const Tests = () => {
    const clients = useSelector(getClients);
    const tests = useSelector(getTests);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenAssign, setIsOpenAssign] = useState(false);
    const [testToEdit, setTestToEdit] = useState(null);
    const [testToAssign, setTestToAssign] = useState(null);
    const togleAdd = () => setIsOpenAdd(!isOpenAdd);
    const togleEdit = (e) => {
        if(isOpenEdit == true){
            setTestToEdit(null)
        }
        else{
            setTestToEdit(e.currentTarget.getAttribute("rowid"))
        }
        setIsOpenEdit(!isOpenEdit)
    };
    const togleAssign = (e) => {
        if(isOpenAssign == true){
            setTestToAssign(null)
        }
        else{
            setTestToAssign(e.currentTarget.getAttribute("rowid"))
        }
        setIsOpenAssign(!isOpenAssign)
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTestsOperation())
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
                    }}>{isAdmin ? (
                        <>Tests</>
                    ) : (
                        <>Assigned tests</>
                    )}</p>
                    {isAdmin ? (
                        <BtnBlue onClick={togleAdd} btnStyle={{
                            width: "5%",
                            color: "white",
                            textAlign: "center",
                            height: "40px"
                        }} name={'Add new'}>Add new</BtnBlue>) : 
                    (
                        <></>
                    )}
                </div>
                {tests ? (
                    <>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "10px 10% 0 10%"
                        }}>
                            <TableHeader isAdmin={isAdmin} data={tests} type={"test"} />
                        </div><div style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "0 10%"
                        }}>
                            {tests.map((test) => (
                                <Row isAdmin={isAdmin} togleEdit={togleEdit} togleAssign={togleAssign} data={test} type={"test"} key={test.id} />
                            ))}
                        </div>
                    </>
                ) : (
                    <h1>No tests yet</h1>
                )}
                {isOpenAdd && (
                    <AddTestsModal
                        name={"Add New Test"}
                        togleModal={togleAdd}
                        display={{ display: "none" }}
                    />
                )}
                {isOpenEdit && (
                    <EditTestsModal
                        data={tests}
                        testId={testToEdit}
                        name={"Edit Test"}
                        togleModal={togleEdit}
                        display={{ display: "none" }}
                    />
                )}
                {isOpenAssign && (
                    <AssignTestsModal
                        testId={testToAssign}
                        clients={clients}
                        name={"Assign Test"}
                        togleModal={togleAssign}
                        display={{ display: "none" }}
                    />
                )}
            </>
        )}
        </Container>
    );
};

export default Tests;
