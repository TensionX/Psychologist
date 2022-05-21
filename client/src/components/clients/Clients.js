import { useEffect, useState } from "react";
import { getClientsOperation } from "../../redux/user/user.operation";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getClients, getUser } from "../../redux/user/user.selectors";
import BtnBlue from "../buttons/BtnBlue";
import Row from "../row/Row";
import TableHeader from "../row/TableHeader";
import AddClientModal from "../modal/AddClientModal"
import style from "./Clients.module.css";
import Container from "../container/Container";
import Spiner from "../spiner/Spiner";
import { Navigate } from "react-router-dom";

import Header from "../header/Header";

const Clients = () => {
    const clients = useSelector(getClients);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const togleAdd = () => setIsOpenAdd(!isOpenAdd);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getClientsOperation())
    }, [dispatch]);

    const loading = useSelector(getLoading);
    const user = useSelector(getUser);
    const isAdmin = user.user.Creator == 0 ? true : false

    return (
        <Container>
        {!isAdmin ? (<Navigate to="/tests" />) : (<></>)}
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
                    }}>Clients</p>
                    <BtnBlue onClick={togleAdd} btnStyle={{
                        width: "5%",
                        color: "white",
                        textAlign: "center",
                        height: "40px"
                    }} name={'Add new'}>Add new</BtnBlue>
                </div>
                {clients ? (
                    <>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "10px 10% 0 10%"
                        }}>
                            <TableHeader data={clients} type={"client"} />
                        </div><div style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "0 10%"
                        }}>
                            {clients.map((client) => (
                                <Row data={client} type={"client"} key={client.id} />
                            ))}
                        </div>
                    </>
                ) : (
                    <h1>No clients yet</h1>
                )}
                {isOpenAdd && (
                    <AddClientModal
                        name={"Add New Client"}
                        togleModal={togleAdd}
                        display={{ display: "none" }}
                    />
                )}
            </>
        )}
        </Container>
    );
};

export default Clients;
