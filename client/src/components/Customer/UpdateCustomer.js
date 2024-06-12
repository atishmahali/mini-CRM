import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";

/* Actions */
import { updateCustomer } from "../../store/actions/customerActions";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateCustomer = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.fil);
  const { customers, updated } = useSelector((state) => state.cus);
  const filterList = filters.map((f) => f.filter_name.toUpperCase());

  let { slug: c_slug } = useParams();
  const customerDetail = customers.find(({ slug }) => slug === c_slug);

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAudience, setCustomerAudience] = useState("");

  useEffect(() => {
    var input1 = document.querySelector("input[name=tags]");
    new Tagify(input1, {
      whitelist: [...filterList],
      dropdown: {
        classname: "color-blue",
        enabled: 0,
        maxItems: 5,
        position: "text",
        closeOnSelect: false,
        highlightFirst: true,
      },
    });

    if (customerDetail) {
      setCustomerName(customerDetail.customer_name.toUpperCase());
      setCustomerEmail(customerDetail.customer_email);
      setCustomerAudience(customerDetail.customer_audience.toUpperCase());
    }
  }, [customerDetail]);

  useEffect(() => {
    if (updated) {
      window.location.href = "/customers";
    }
  }, [updated]);

  /* Audiences */
  const { audiences } = useSelector((state) => state.aud);
  const audienceOptions = audiences.map((a) => a.audience_name.toUpperCase());

  const onChange = (e) => {
    setCustomerAudience(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let customerFilters = [];
    const tags = document.querySelectorAll(".tagify__tag");
    tags.forEach((tag) => {
      customerFilters.push(tag.getAttribute("value"));
    });

    dispatch(
      updateCustomer({
        name: customerName,
        email: customerEmail,
        audience: customerAudience,
        filters: customerFilters,
        slug: customerDetail.slug,
        uid: customerDetail.uid,
      })
    );
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        {customerDetail && (
          <>
            <div className="class__wrapper__left">
              <img src={avatar} alt="Avatar" />
              <ul>
                <li>Update a customer</li>
                <li>Update Customer Name</li>
                <li>Update Customer Audience</li>
                <li>Update Customer Email</li>
                <li>Update Customer Filters</li>
              </ul>
            </div>
            <div className="class__wrapper__right">
              <form onSubmit={onSubmit} method="post">
                <div className="form-group">
                  <label htmlFor="name">Customer Name</label>
                  <input
                    type="text"
                    name="customername"
                    id="customername"
                    placeholder="Customer Name"
                    className="mb-3"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />

                  <label htmlFor="email">Customer Email</label>
                  <input
                    type="email"
                    name="customeremail"
                    id="customeremail"
                    placeholder="Customer Email"
                    className="mb-3"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />

                  <label htmlFor="name">Assign Filters to this Customer</label>
                  <input
                    type="text"
                    name="tags"
                    id="assignfilters"
                    placeholder="Assign Filters"
                    className="mb-3"
                    value={`${customerDetail.customer_filters.toUpperCase()}`}
                  />

                  <div className="student__wrapper">
                    <label htmlFor="name">Select Audience of Customer</label>
                    <br />
                    <select value={customerAudience} onChange={onChange}>
                      {audienceOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  {errID === "UPDATE_ERROR" && (
                    <div
                      className="err-msgs"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {errMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    color="dark"
                    style={{ marginTop: "1rem" }}
                    block
                  >
                    Update Customer Records
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateCustomer;
