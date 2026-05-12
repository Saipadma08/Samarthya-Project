import React from "react";

import ProfilePage from "./ProfilePage";

const InlineProfileView = ({
  user,
  profile
}) => {

  return (

    <ProfilePage
      user={user}
      profile={profile}
    />

  );

};

export default InlineProfileView;