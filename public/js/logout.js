const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // if response is ok, reroutes to homepage
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

// checks if the logout button is on the page
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector("#logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
