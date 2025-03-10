/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */

console.log("login.js loaded");
function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    client_id:
      "1094204020857-468i72eqmi06keadctc4ffdjaqbhffg9.apps.googleusercontent.com",
    redirect_uri: "http://127.0.0.1:8080/src/pages/cms.html",
    response_type: "token",
    scope:
      "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly",
    include_granted_scopes: "true",
    state: "pass-through value",
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

// Handle OAuth response
function handleAuthResponse() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get("access_token");
  const state = params.get("state");

  if (accessToken && state === localStorage.getItem("oauth_state")) {
    localStorage.setItem("access_token", accessToken);
    fetchUserProfile(accessToken);
  } else {
    console.error("Invalid OAuth response");
  }
}

// Fetch user profile info
async function fetchUserProfile(token) {
  try {
    const response = await fetch(`${USER_INFO_API}?access_token=${token}`);
    if (!response.ok) throw new Error("Failed to fetch user info");

    const userData = await response.json();
    document.getElementById("status").textContent =
      `Logged in as ${userData.name}`;
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";
  } catch (error) {
    console.error(error);
    logout(); // Clear invalid token
  }
}

// Logout function
function logout() {
  localStorage.removeItem("access_token");
  document.getElementById("status").textContent = "Logged out!";
  document.getElementById("login-btn").style.display = "block";
  document.getElementById("logout-btn").style.display = "none";
}
