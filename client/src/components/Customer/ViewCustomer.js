import React, { useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer } from "../../store/actions/customerActions";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewCustomer() {
  let { slug: c_slug } = useParams();
  const dispatch = useDispatch();

  const { customers, deleted } = useSelector((state) => state.cus);
  const customerDetail = customers.find(({ slug }) => slug === c_slug);
  const totalFilters = customerDetail.customer_filters.split(" ").length;

  const onDelete = (uid) => dispatch(deleteCustomer(uid));

  useEffect(() => {
    if (deleted) {
      window.location.href = "/customers";
    }
  }, [deleted]);

  return (
    <div className="container">
      <AppNavbar />
      <div className="one__customer">
        {customerDetail ? (
          <>
            <div className="one__customer__left">
              <img src={avatar} alt="Avatar" />
              <h1>{customerDetail.customer_name.toUpperCase()}</h1>
            </div>
            <div className="one__customer__right">
              <ul>
                <li>
                  <span>Name</span>: {customerDetail.customer_name.toUpperCase()}
                </li>
                <li>
                  <span>Email</span>: {customerDetail.customer_email}
                </li>
                <li>
                  <span>Audience</span>:{customerDetail.customer_audience.toUpperCase()}
                </li>
                <li>
                  <span>Filters</span>:{customerDetail.customer_filters.toUpperCase()}
                </li>
                <li>
                  <span>Total Number Filters</span>:{totalFilters}
                </li>
              </ul>

              <div className="one__actions">
                <Link to={`/customer/update/${customerDetail.slug}`}>
                  Update customer records
                </Link>

                <button
                  className="del-btn"
                  onClick={() => onDelete(customerDetail.uid)}
                >
                  Delete customer records
                </button>
              </div>
            </div>
          </>
        ) : (
          <h3>Record Unavailable for Customer</h3>
        )}
      </div>
    </div>
  );
}

export default ViewCustomer;
