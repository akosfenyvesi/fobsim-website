export const concatenateDisplayName = (
  firstName: string,
  lastName: string
): string => {
  return `${firstName}|${lastName}`;
};

export const getFirstName = (
  displayName: string | null | undefined
): string => {
  return displayName?.split("|")[0] || "";
};

export const getLastName = (displayName: string | null | undefined): string => {
  return displayName?.split("|")[1] || "";
};
