import React from "react";

export default function ProfileSummary(props) {
  const { firstName, lastName, email, school } = props.profile;
  return (
    <div className="card mb-3">
      <div className="card-header">Profile</div>
      <div className="card-body">
        <h5 className="card-title">{`${firstName} ${lastName}`}</h5>
        <ul className="list-group bg-primary list-group-flush">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">School: {school}</li>
        </ul>
      </div>
    </div>
  );
}
