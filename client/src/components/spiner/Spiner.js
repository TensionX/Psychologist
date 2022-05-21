import "./Spiner.css";

const Spiner = ({style}) => {
  return (
    <div >
      <div style={style} className="spinner icon-spinner-2" aria-hidden="true"></div>
    </div>
  );
};

export default Spiner;
