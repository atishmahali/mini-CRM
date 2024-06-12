import React, { useState, useEffect } from "react";
import { AvatarGenerator } from "random-avatar-generator";
import AppNavbar from "../AppNavbar";
import { useDispatch, useSelector } from "react-redux";
import { createAudience, createCommunicationLog } from "../../store/actions/communication_logActions";
import { useNavigate } from "react-router-dom";

/* Avatar Generator */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const AdminAudience = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [audienceName, setAudienceName] = useState("");
  const { created } = useSelector((state) => state.aud);
  const { msg: errMsg, id: errID } = useSelector((state) => state.error);

  useEffect(() => {
    if (created) {
      navigate("/audiences");
    }
  }, [created, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createCommunicationLog({ name: audienceName }));
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        <div className="class__wrapper__left">
          <img src={avatar} alt="Avatar" />
          <h3>Audience</h3>
          <ul>
            <li>Create An Audience Type (e.g., Primary 1)</li>
          </ul>
        </div>
        <div className="class__wrapper__right">
          <h2>Create an Audience</h2>
          <form {...{ onSubmit }} className="form">
            <div className="form-group">
              <label htmlFor="audiencename">Audience Type</label>
              <input
                type="text"
                name="audiencename"
                id="audiencename"
                placeholder="Audience Name"
                className="mb-3"
                onChange={(e) => setAudienceName(e.target.value)}
                value={audienceName}
              />
              {errID === "AUDIENCE__ERROR" ? (
                <div className="err-msgs" style={{ color: "red", marginTop: "10px" }}>
                  {errMsg}
                </div>
              ) : null}
              <button type="submit" style={{ marginTop: "1rem" }} block="true">
                Create Audience
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAudience;
