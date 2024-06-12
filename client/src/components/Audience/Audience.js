import React from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import { useSelector } from "react-redux";

const Audience = () => {
  const { audiences } = useSelector((state) => state.aud);

  return (
    <div className="container">
      <div className="student__wrapper">
        <AppNavbar />

        <div className="classes__wrapper">
          {audiences.length > 0 ? (
            <ul className="allClasses">
              {audiences.map(({ audience_name, slug }, id) => {
                return (
                  <li key={id}>
                    <Link to={`/about-audience/${slug}`}>
                      {audience_name.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <h3>No Audience Available</h3>
              <br />
              <Link to="/create-audience"> Create an Audience</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Audience;
