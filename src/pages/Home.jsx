import { useRef } from "react";
import { setTrainerNameG } from "../store/slices/trainerName.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style/Home.css";

const Home = () => {
  const trainerNameRef = useRef();
  const navigate = useNavigate();
  const trainerName = useSelector((states) => states.trainerName);
  const dispatch = useDispatch();
  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(setTrainerNameG(trainerNameRef.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <>
      <div className="containt_register">
        <div className="Title-pokedex"></div>
        <h2 className="greet_coach">Hi Trainer!</h2>
        <p className="text_for-trainer">
          To start in this application, please, give me your trainer name.
        </p>
        <form onSubmit={handleSumbit} className="form_trainer">
          <input
            type="text"
            ref={trainerNameRef}
            className="input_trainer"
            placeholder="Your name..."
          />
          <button className="button_trainer">Catch them all!</button>
        </form>
        <footer className="footer_register">
          <div className="div_red-footer"></div>
          <div className="div_black-footer"></div>
          <div className="circle_footer">
            <div className="circle_in-the-footer"></div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
