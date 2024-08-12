function validatePassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const feedback = document.getElementById("password-feedback");
  const userTypeSelect = document.getElementById("user-type");
  const additionalInfoDiv = document.getElementById("additional-info");

  passwordInput.addEventListener("input", () => {
    if (validatePassword(passwordInput.value)) {
      feedback.textContent = "Strong password!";
      feedback.style.color = "green";
    } else {
      feedback.textContent =
        "Password should be at least 8 characters long, include an uppercase letter, a number, and a special character.";
      feedback.style.color = "red";
    }
  });

  userTypeSelect.addEventListener("change", () => {
    if (userTypeSelect.value === "admin") {
      additionalInfoDiv.style.display = "block";
    } else {
      additionalInfoDiv.style.display = "none";
    }
  });
});

// Router Function
function router() {
  const routes = {
    "/": homePage,
    "/about": aboutPage,
    "/contact": contactPage,
  };

  const path = window.location.pathname;
  const route = routes[path] || homePage;
  route();
}

window.onpopstate = router;

function navigate(path) {
  window.history.pushState({}, path, window.location.origin + path);
  router();
}

function homePage() {
  document.getElementById("content").innerHTML = `
        <h1>Welcome to My Web Project</h1>
        <p>This is the home page.</p>
        <form id="register-form">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <p id="password-feedback"></p>

        <label for="user-type">User Type:</label>
        <select id="user-type" name="user-type">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div id="additional-info" style="display: none">
          <label for="admin-code">Admin Code:</label>
          <input type="text" id="admin-code" name="admin-code" />
        </div>

        <button type="submit">Register</button>
      </form>
        `;
}

function aboutPage() {
  document.getElementById("content").innerHTML =
    "<h1>About Us</h1><p>This is the about page.</p>";
}

function contactPage() {
  document.getElementById("content").innerHTML =
    "<h1>Contact Us</h1><p>This is the contact page.</p>";
}

document.getElementById("home-link").addEventListener("click", (e) => {
  e.preventDefault();
  navigate("/");
});

document.getElementById("about-link").addEventListener("click", (e) => {
  e.preventDefault();
  navigate("/about");
});

document.getElementById("contact-link").addEventListener("click", (e) => {
  e.preventDefault();
  navigate("/contact");
});

router();
