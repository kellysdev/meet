import mockData from "./mock-data";
import NProgress from "nprogress";

// This function takes an events array, then uses map to create a new array with only locations.
// It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// This function will fetch an array of all events
export const getEvents = async () => {
  NProgress.start();
  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }

  if(!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    NProgress.done();
    return events?JSON.parse(events):[];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `https://3tvxri9f5c.execute-api.us-west-1.amazonaws.com/dev/api/get-events/${token}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      NProgress.done();
      localStorage.setItem("lastEvents", JSON.stringify(result.data.events));
      return result.data.items;
    } else return null;
  }
};

// This function retrieves the access token from localStorage and passes it to tokenCheck().
// If there is no token, it checks for an authorization code
// If there is no authorization code, it redirects the user to the Google Authorization screen
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://3tvxri9f5c.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

// This function takes the accessToken found and checks whether it's a valid token or not.
// If it's not, then it redirects the user to the Google Authorization screen.
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

// This function will remove the access code from the URL before redirecting
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = 
      window.location.protocol + 
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

// This function will retreive an access token if one isn't available
const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
 
    const response = await fetch(`https://3tvxri9f5c.execute-api.us-west-1.amazonaws.com/dev/api/token/${encodeCode}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
 };