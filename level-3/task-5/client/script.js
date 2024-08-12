document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("user-list");
  const userForm = document.getElementById("user-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/api/users");
    const users = await response.json();
    userList.innerHTML = users
      .map((user) => `<p>${user.name} (${user.email})</p>`)
      .join("");
  };

  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
    };
    await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    nameInput.value = "";
    emailInput.value = "";
    fetchUsers();
  });

  fetchUsers();
});
