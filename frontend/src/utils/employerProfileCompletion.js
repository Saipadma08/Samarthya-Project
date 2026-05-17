export function calculateEmployerProfileCompletion(
  user,
  profile
) {

  let score = 0;

  if (user?.profileImage)
    score += 10;

  if (profile?.coverImage)
    score += 5;

  if (profile?.phone)
    score += 10;

  if (profile?.employerType)
    score += 10;

  if (profile?.location)
    score += 10;

  if (profile?.about)
    score += 15;

  if (
    profile?.jobCategories?.length > 0
  )
    score += 15;

  // company name only required if company
  if (
    profile?.employerType === "Company"
  ) {

    if (profile?.companyName)
      score += 10;

  } else if (
    profile?.employerType
  ) {

    score += 10;
  }

  // engagement/activity
  if (profile?.jobsPosted > 0)
    score += 10;

  if (profile?.workersHired > 0)
    score += 5;

  return Math.min(score,100);
}