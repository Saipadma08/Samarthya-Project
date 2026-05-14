import React from "react";

import ProfilePage from "./ProfilePage";

const InlineProfileView = ({
  currentUser,
  user,
  profile
}) => {

  return (

    <ProfilePage
      currentUser={currentUser}
      user={user}
      profile={profile}
      isPublicView={true}
    />

  );

};

export default InlineProfileView;