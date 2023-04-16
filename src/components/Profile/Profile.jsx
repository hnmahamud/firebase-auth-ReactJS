import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="card card-compact w-96 bg-base-100 shadow rounded-md">
        <figure>
          <img src={user?.photoURL} alt="Picture" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user?.displayName}</h2>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
