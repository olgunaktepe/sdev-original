import Image from "next/image";
import React from "react";
const ProfileCard = ({
  avatar,
  name,
  email,
  role,
  variant
}) => {
  return <div className="card widget-rounded-circle">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col">
            <div className="avatar-lg">
              <Image src={avatar} className="img-fluid rounded-circle" alt="" height={72} width={72} />
            </div>
          </div>

          <div className="col">
            <h5 className="mt-0 mb-1">{name}</h5>
            <p className="text-muted mb-2 font-13 text-truncate">{email}</p>
            <small className={"text-" + variant}>
              <b>{role}</b>
            </small>
          </div>
        </div>
      </div>
    </div>;
};
export default ProfileCard;