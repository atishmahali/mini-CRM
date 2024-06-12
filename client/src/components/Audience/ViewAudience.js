import React, { useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommunicationLog } from "../../store/actions/communication_logActions";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewAudience() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { slug: s_slug } = useParams();

  const { audience, deleted } = useSelector((state) => state.aud);
  const { customer } = useSelector((state) => state.cus);
  const audienceDetail = audience.filter(({ slug }) => slug === s_slug)[0];

  const numOfCustomers = customer.filter(
    ({ customer_audience }) => customer_audience === audienceDetail.audience_name
  );

  const onDelete = (uid) => dispatch(deleteCommunicationLog(uid));

  useEffect(() => {
    if (deleted) {
      navigate("/audiences");
    }
  }, [deleted, navigate]);

  return (
    <div className="container">
      <AppNavbar />
      <div className="one__audience">
        {audienceDetail ? (
          <>
            <div className="one__audience__left">
              <img src={avatar} alt="Avatar" />
              <h1>{audienceDetail.audience_name.toUpperCase()}</h1>
            </div>
            <div className="one__audience__right">
              <ul>
                <li>
                  <span>Name</span>: {audienceDetail.audience_name.toUpperCase()}
                </li>
                <li>
                  <span>Number of Customers</span>:{" "}
                  {numOfCustomers.length > 0 ? (
                    numOfCustomers.length
                  ) : (
                    <span style={{ color: "red", marginLeft: "10px" }}>
                      No customer attached to this audience
                    </span>
                  )}
                </li>
                <li>
                  <span>Participating Customers</span>:
                  <ol style={{ marginTop: "14px" }}>
                    {numOfCustomers.map(({ customer_name }) => (
                      <li key={customer_name}>
                        <span
                          style={{
                            color: "green",
                            marginLeft: "10px",
                            textTransform: "capitalize",
                            fontSize: "12px",
                          }}
                        >
                          {customer_name.toUpperCase()}
                        </span>
                      </li>
                    ))}
                  </ol>
                </li>
              </ul>

              <div className="one__actions">
                <Link to={`/audience/update/${audienceDetail.slug}`}>
                  Update Audience Records
                </Link>

                <button
                  className="del-btn"
                  onClick={() => onDelete(audienceDetail.uid)}
                >
                  Delete Audience
                </button>
              </div>
            </div>
          </>
        ) : (
          <h3>Record Unavailable for Audience</h3>
        )}
      </div>
    </div>
  );
}

export default ViewAudience;
