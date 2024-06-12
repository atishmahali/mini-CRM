import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";

const Customers = () => {
  const { customers } = useSelector((state) => state.cus);
  const { audiences } = useSelector((state) => state.aud);
  const { filters } = useSelector((state) => state.fil);

  return (
    <div className="container">
      <div className="student__wrapper students__cover">
        <AppNavbar />

        {customers.length > 0 && audiences.length > 0 && filters.length > 0 ? (
          <table>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Audience</th>
              <th>Filters</th>
            </tr>
            {customers.map(
              (
                {
                  customer_name,
                  customer_age,
                  customer_audience,
                  customer_filter,
                  slug,
                },
                id
              ) => {
                const customerFilters = customer_filter.split(",");

                return (
                  <tr key={id}>
                    <td>
                      <Link to={`/customer/${slug}`}>
                        {customer_name.toUpperCase()}
                      </Link>
                    </td>
                    <td>{customer_age}</td>
                    <td>{customer_audience.toUpperCase()}</td>
                    <td>
                      <select value="">
                        <option defaultValue="1">Filters</option>
                        {customerFilters.map((_, id) => (
                          <option value="2">{_.toUpperCase()}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              }
            )}
          </table>
        ) : (
          <div style={{ paddingLeft: "10px" }}>
            <h4>Please complete the following to manage customer</h4>
            <ul>
              {audiences.length < 1 ? (
                <li>
                  <Link to="/create-audience"> Create an audience</Link>
                </li>
              ) : null}
              {filters.length < 1 ? (
                <li>
                  <Link to="/create-filter">Create a filter</Link>
                </li>
              ) : null}
              {filters.length > 0 && audiences.length > 0 ? (
                <li>
                  <Link to="/create-customer">Add a Customer</Link>
                </li>
              ) : null}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
