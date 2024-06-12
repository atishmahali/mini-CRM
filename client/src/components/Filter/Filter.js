import React from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import { useSelector } from "react-redux";

const Filters = () => {
  const { filters } = useSelector((state) => state.fil);

  return (
    <div className="container">
      <div className="student__wrapper">
        <AppNavbar />

        <div className="classes__wrapper">
          {filters.length > 0 ? (
            <ul className="allClasses">
              {filters.map(({ filter_name, slug }, id) => {
                return (
                  <li key={id}>
                    <Link to={`/about-filter/${slug}`}>
                      {filter_name.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <h3>No Filter Available</h3>
              <br />
              <Link to="/create-filter"> Create a filter</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
