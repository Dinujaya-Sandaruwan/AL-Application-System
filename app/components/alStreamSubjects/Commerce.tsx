import React from "react";

const Commerce = () => {
  return (
    <fieldset className="fieldSet">
      <legend>A/L Subject selection</legend>
      <div className="twoCols">
        <div className="inputGroup">
          <label>First Subject</label>
          <select disabled>
            <option value="female">Economics</option>
          </select>
        </div>
        <div className="inputGroup">
          <label>Second Subject</label>
          <select disabled>
            <option value="female">Accounting</option>
          </select>
        </div>
      </div>
      <div className="inputGroup">
        <label>Select First Subject</label>
        <select>
          <option value="female">Business Studies</option>
          <option value="other">
            Information and Communication Technology
          </option>
        </select>
      </div>
    </fieldset>
  );
};

export default Commerce;
