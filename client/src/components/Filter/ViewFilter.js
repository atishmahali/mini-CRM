import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFilter } from "../../store/actions/filterActions";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewFilter() {
  let { slug: f_slug } = useParams();
  const dispatch = useDispatch();

  const { filters, deleted } = useSelector((state) => state.fil);
  const filterDetail = filters.filter(({ slug }) => slug == f_slug)[0];
  const { customers } = useSelector((state) => state.stu);
  const [filterCustomers, setFilterCustomers] = useState("");

  const onDelete = (id) => dispatch(deleteFilter(id));

  useEffect(() => {
    if (filterDetail) {
      const customerList = customers
        .map(({ customer_filter, customer_name }) => {
          if (customer_filter.includes(filterDetail.filter_name)) {
            return customer_name.toUpperCase();
          }
        })
        .filter((customer) => customer != undefined);

      setFilterCustomers(customerList);
    }
  }, [filterDetail]);

  useEffect(() => {
    if (deleted) {
      window.location.href = "/filters";
    }
  }, [deleted]);

  return (
    <div className="container">
      <AppNavbar />
      <div className="one__student">
        {filterDetail ? (
          <>
            <div className="one__student__left">
              <img src={avatar} alt="Avatar" />

              <h1>{filterDetail.filter_name.toUpperCase()}</h1>
            </div>
            <div className="one__student__right">
              <ul>
                <li>
                  <span>Name</span>: {filterDetail.filter_name.toUpperCase()}
                </li>
                <li>
                  <h3>Filter Customers</h3>

                  {filterCustomers.length > 0 ? (
                    <ol>
                      {filterCustomers.map((f) => (
                        <li>{f}</li>
                      ))}
                    </ol>
                  ) : (
                    <div>
                      <h6>No Students Assigned Yet</h6>
                    </div>
                  )}
                </li>
              </ul>

              <div className="one__actions">
                <Link to={`/filter/update/${filterDetail.slug}`}>
                  Update Filter
                </Link>

                <button
                  className="del-btn"
                  onClick={() => onDelete(filterDetail.filter_id)}
                >
                  Delete Filter
                </button>
              </div>
            </div>
          </>
        ) : (
          <h3>Record Unavailable for Filter</h3>
        )}
      </div>
    </div>
  );
}

export default ViewFilter;
