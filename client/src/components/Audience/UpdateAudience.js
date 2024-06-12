import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";

/* Actions */
import { updateAcommunicationLog } from "../../store/actions/communication_logActions"; // Correct action import

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateAudience = () => {
  let { slug: s_slug } = useParams();
  const dispatch = useDispatch();
  const { audience, updated } = useSelector((state) => state.aud); // Adjusted state reference

  const AudienceDetail = audience.filter(({ slug }) => slug === s_slug)[0];

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [audienceName, setAudienceName] = useState("");

  useEffect(() => {
    if (updated) {
      window.location.href = "/audiences";
    }

    if (AudienceDetail) {
      setAudienceName(AudienceDetail.audience_name.toUpperCase());
    }
  }, [AudienceDetail, updated]);

  const onChange = (e) => setAudienceName(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      UpdateAudience({
        audience_name: audienceName,
        slug: AudienceDetail.slug,
        uid: AudienceDetail.uid,
      })
    );
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="audience__wrapper">
        {AudienceDetail ? (
          <>
            <div className="audience__wrapper__left">
              <img src={avatar} alt="Avatar" />

              <ul>
                <li>Update an Audience</li>
                <li>Update Audience Name</li>
              </ul>
            </div>
            <div className="audience__wrapper__right">
              <form {...{ onSubmit }} method="post">
                <div className="form-group">
                  <label htmlFor="name">Audience Name</label>
                  <input
                    type="text"
                    name="audiencename"
                    id="audiencename"
                    placeholder="Audience Name"
                    className="mb-3"
                    value={audienceName}
                    {...{ onChange }}
                  />

                  {errID === "UPDATE_AUDIENCE_ERROR" ? (
                    <div
                      className="err-msgs"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {errMsg}
                    </div>
                  ) : null}

                  <button color="dark" style={{ marginTop: "1rem" }} block>
                    Update Audience Records
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

export default UpdateAudience;
