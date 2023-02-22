export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const storedLoginTime = localStorage.getItem("loginTime");
  const expiresIn = storedExpirationDate - storedLoginTime;

  return expiresIn;
};

export const getAuthToken = () => {
  console.log("getAuthToken");
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const expiresIn = getTokenDuration();

  if (expiresIn < 0) {
    return "EXPIRED";
  }

  return token;
};
