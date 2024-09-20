import { useState } from "react";
import CustomInput from "./CustomInput";
import "./NameInputModal.css";

const NameInputModal = ({ isOpen, setName, time }) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSaveName = () => {
    setName(value);
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <span>You found all the characters in {time} seconds! </span>
          <span>
            Congrats you are among the top 3 quickest waldo finders! <br /> You
            may input your name for the grand podium!
          </span>
          <label>
            Name
            <CustomInput handleChange={handleChange} value={value} />
            <button onClick={handleSaveName}>Save</button>
          </label>
        </div>
      )}
    </>
  );
};

export default NameInputModal;
