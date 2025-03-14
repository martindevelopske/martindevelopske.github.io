var YOUR_CLIENT_ID =
  "1094204020857-468i72eqmi06keadctc4ffdjaqbhffg9.apps.googleusercontent.com";
var YOUR_REDIRECT_URI = "http://127.0.0.1:8080/src/pages/cms.html";

// Parse query string to see if page request is coming from OAuth 2.0 server.
var fragmentString = location.hash.substring(1);
var params = {};
var regex = /([^&=]+)=([^&]*)/g,
  m;
while ((m = regex.exec(fragmentString))) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
if (Object.keys(params).length > 0 && params["state"]) {
  if (params["state"] == localStorage.getItem("state")) {
    localStorage.setItem("oauth2-test-params", JSON.stringify(params));
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";

    trySampleRequest();
  } else {
    console.log("State mismatch. Possible CSRF attack");
  }
}

// Function to generate a random state value
function generateCryptoRandomState() {
  const randomValues = new Uint32Array(2);
  window.crypto.getRandomValues(randomValues);

  // Encode as UTF-8
  const utf8Encoder = new TextEncoder();
  const utf8Array = utf8Encoder.encode(
    String.fromCharCode.apply(null, randomValues),
  );

  // Base64 encode the UTF-8 data
  return btoa(String.fromCharCode.apply(null, utf8Array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function trySampleRequest() {
  var params = JSON.parse(localStorage.getItem("oauth2-test-params"));
  if (params && params["access_token"]) {
    // User authorized the request. Now, check which scopes were granted.
    if (
      params["scope"].includes(
        "https://www.googleapis.com/auth/drive.metadata.readonly",
      )
    ) {
      // User authorized read-only Drive activity permission.
      // Calling the APIs, etc.
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://www.googleapis.com/drive/v3/about?fields=user&" +
          "access_token=" +
          params["access_token"],
      );
      xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.response);
        } else if (xhr.readyState === 4 && xhr.status === 401) {
          // Token invalid, so prompt for user permission.
          oauth2SignIn();
        }
      };
      xhr.send(null);
    } else {
      // User didn't authorize read-only Drive activity permission.
      // Update UX and application accordingly
      console.log(
        "User did not authorize read-only Drive activity permission.",
      );
    }

    // Check if user authorized Calendar read permission.
    if (
      params["scope"].includes(
        "https://www.googleapis.com/auth/calendar.readonly",
      )
    ) {
      // User authorized Calendar read permission.
      // Calling the APIs, etc.
      console.log("User authorized Calendar read permission.");
    } else {
      // User didn't authorize Calendar read permission.
      // Update UX and application accordingly
      console.log("User did not authorize Calendar read permission.");
    }
  } else {
    oauth2SignIn();
  }
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauth2SignIn() {
  // create random state value and store in local storage
  var state = generateCryptoRandomState();
  localStorage.setItem("state", state);

  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create element to open OAuth 2.0 endpoint in new window.
  var form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    client_id: YOUR_CLIENT_ID,
    redirect_uri: YOUR_REDIRECT_URI,
    scope:
      "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly",
    state: state,
    include_granted_scopes: "true",
    response_type: "token",
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
