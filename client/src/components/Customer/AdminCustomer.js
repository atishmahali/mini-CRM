import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";

import { createCustomer } from "../../store/actions/customerActions";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const AdminCustomer = () => {
  const dispatch = useDispatch();
  const { audiences } = useSelector((state) => state.aud);
  const { created } = useSelector((state) => state.cus);
  const audienceOptions = audiences.map((a) => a.audience_name.toUpperCase());

  useEffect(() => {
    var input1 = document.querySelector("input[name=tags]");
    new Tagify(input1, {
      whitelist: [...audienceOptions],
      dropdown: {
        classname: "color-blue",
        enabled: 0,
        maxItems: 5,
        position: "text",
        closeOnSelect: false,
        highlightFirst: true,
      },
    });
  }, []);

  useEffect(() => {
    if (created) {
      return (window.location = "/customers");
    }
  }, [created]);

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [customerName, setCustomerName] = useState("");
  const [customerAge, setCustomerAge] = useState("");
  const [customerAudience, setCustomerAudience] = useState("");

  const { udience } = useSelector((state) => state.aud);
  const AudienceOptions = audiences.map((a) => a.audience_name.toUpperCase());

  const onChange = (e) => {
    setCustomerAudience(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let customerAudiences = [];
    const tags = document.querySelectorAll(".tagify__tag");
    for (var i = 0; i <= tags.length; i++) {
      if (tags[i]) {
        customerAudiences.push(tags[i].getAttribute("value"));
      }
    }

    dispatch(
      createCustomer({
        name: customerName,
        age: customerAge,
        audience: customerAudiences,
      })
    );
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        <div className="class__wrapper__left">
          <img src={avatar} alt="Avatar" />

          <ul>
            <li>Create a customer</li>
            <li>Add Customer Name</li>
            <li>Add Customer Age</li>
            <li>Add Customer Audiences</li>
          </ul>
        </div>
        <div className="class__wrapper__right">
          <form {...{ onSubmit }} method="post">
            <div className="form-group">
              <label htmlFor="name">Customer Name</label>
              <input
                type="text"
                name="customername"
                id="customername"
                placeholder="Customer Name"
                className="mb-3"
                onChange={(e) => setCustomerName(e.target.value)}
              />

              <label htmlFor="age">Customer Age</label>
              <input
                type="number"
                name="customerage"
                id="customerage"
                placeholder="Customer Age"
                onChange={(e) => setCustomerAge(e.target.value)}
              />

              <label htmlFor="name">Assign Audiences to this Customer</label>
              <input
                type="text"
                name="tags"
                id="assignaudiences"
                placeholder="Assign Audiences"
              />

              <div className="student__wrapper">
                <label htmlFor="name">Select Audience of Customer</label>
                <br />
                <select value={customerAudience} {...{ onChange }}>
                  <option value="Select an audience">Select audience</option>
                  {audienceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              {errID === "CUSTOMER__ERROR" ? (
                <div
                  className="err-msgs"
                  style={{ color: "red", marginTop: "10px" }}
                >
                  {errMsg}
                </div>
              ) : null}

              <button color="dark" style={{ marginTop: "1rem" }} block>
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomer;
