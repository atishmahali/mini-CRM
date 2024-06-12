import React, { useState, useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { useDispatch, useSelector } from "react-redux";

/* Actions */
import { createFilter } from "../../store/actions/filterActions.js";
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const AdminFilter = () => {
  const dispatch = useDispatch();

  const [filterName, setFilterName] = useState("");

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const { created } = useSelector((state) => state.fil);

  useEffect(() => {
    if (created) {
      window.location.href = "/filters";
    }
  }, [created]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createFilter({ name: filterName }));
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        <div className="class__wrapper__left">
          <img src={avatar} alt="Avatar" />

          <h1>Filter Creation</h1>
          <ul>
            <li>Create A Filter (e.g., English)</li>
            <li>Add students to filter</li>
          </ul>
        </div>
        <div className="class__wrapper__right">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Filter Name</label>
              <input
                type="text"
                name="filtername"
                id="filtername"
                placeholder="Filter Name"
                className="mb-3"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>

            {errID === "FILTER__ERROR" ? (
              <div
                className="err-msgs"
                style={{ color: "red", marginTop: "10px" }}
              >
                {errMsg}
              </div>
            ) : null}

            <button color="dark" style={{ marginTop: "1rem" }}>
              Create Filter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminFilter;
