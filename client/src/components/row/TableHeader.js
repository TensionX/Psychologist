import style from "./Row.module.css";

const TableHeader = ({data, type, isAdmin}) => {
  return (
    <div className={style.header}>
        {type === "client" ? (
            <>
                <div style={{
                    width: "10%",
                    fontWeight: "600",
                    borderRight: "1px solid grey"
                }}>
                    Id
                </div>
                <div style={{
                    width: "25%",
                    fontWeight: "600",
                    borderRight: "1px solid grey"
                }}>
                    First name
                </div>
                <div style={{
                    width: "25%",
                    fontWeight: "600",
                    borderRight: "1px solid grey"
                }}>
                    Last name
                </div>
                <div style={{
                    width: "25%",
                    fontWeight: "600",
                    borderRight: "1px solid grey"
                }}>
                    Email
                </div>
                <div style={{
                    fontWeight: "600",
                    width: "15%"
                }}>
                    Actions
                </div>
            </>
        ) : (
            type === "test" ? (
                <>
                    <div style={{
                        width: "10%",
                        fontWeight: "600",
                        borderRight: "1px solid grey"
                    }}>
                        Id
                    </div>
                    <div style={{
                        width: "25%",
                        fontWeight: "600",
                        borderRight: "1px solid grey"
                    }}>
                        Name
                    </div>
                    <div style={{
                        width: "25%",
                        fontWeight: "600",
                        borderRight: "1px solid grey"
                    }}>
                        Number of q`s
                    </div>
                    <div style={{
                        width: "25%",
                        fontWeight: "600",
                        borderRight: "1px solid grey"
                    }}>
                        {isAdmin ? (
                            <>Number of assigns</>
                        ) : (
                            <>Status</>
                        )}
                    </div>
                    <div style={{
                        fontWeight: "600",
                        width: "15%"
                    }}>
                        Actions
                    </div>
                </>
            ) : (
               <></>
            )
        )}
    </div>
  );
};

export default TableHeader;