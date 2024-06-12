import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";

/* Actions */
import { updateFilter } from "../../store/actions/filterActions";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateFilter = () => {
  const dispatch = useDispatch();
  let { slug: s_slug } = useParams();
  const { filters, updated } = useSelector((state) => state.fil);
  const { customers } = useSelector((state) => state.cus);

  const filterDetail = filters.find(({ slug }) => slug === s_slug);

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    var input1 = document.querySelector("input[name=tags]");

    if (filterDetail) {
      const customerList = customers
        .filter(({ customer_filter }) =>
          customer_filter.includes(filterDetail.filter_name.toLowerCase())
        )
        .map(({ customer_name }) => customer_name.toUpperCase());

      new Tagify(input1, {
        whitelist: customerList,
        dropdown: {
          classname: "color-blue",
          enabled: 0,
          maxItems: 5,
          position: "text",
          closeOnSelect: false,
          highlightFirst: true,
        },
      });
    }

    if (filterDetail) {
      setFilterName(filterDetail.filter_name.toUpperCase());
    }
  }, [filterDetail, customers]);

  useEffect(() => {
    if (updated) {
      window.location.href = "/filters";
    }
  }, [updated]);

  const onChange = (e) => setFilterName(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    let filterCustomers = [];
    const tags = document.querySelectorAll(".tagify__tag");
    tags.forEach((tag) => {
      filterCustomers.push(tag.getAttribute("value"));
    });

    dispatch(
      updateFilter({
        filter_name: filterName,
        customers: filterCustomers,
        uid: filterDetail.uid,
        slug: s_slug,
      })
    );
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        {filterDetail ? (
          <>
            <div className="class__wrapper__left">
              <img src={avatar} alt="Filter Avatar" />
              <ul>
                <li> Update a filter</li>
                <li>Update Filter name</li>
                <li> Add Customer to filter</li>
              </ul>
            </div>
            <div className="class__wrapper__right">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="filtername">Filter Name</label>
                  <input
                    type="text"
                    name="filtername"
                    id="filtername"
                    placeholder="Filter Name"
                    className="mb-3"
                    value={filterName}
                    onChange={onChange}
                  />

                  <label htmlFor="assigncustomers">
                    Assign Customers to this Filter
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="assigncustomers"
                    placeholder="Assign Customers"
                    className="mb-3"
                    value={`${filterDetail.filter_customers.toUpperCase()}`}
                  />

                  {errID === "UPDATE_FILTER_ERROR" && (
                    <div className="err-msgs" style={{ color: "red", marginTop: "10px" }}>
                      {errMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-dark"
                    style={{ marginTop: "1rem" }}
                  >
                    Update Filter Records
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UpdateFilter;
