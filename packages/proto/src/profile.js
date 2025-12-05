window.addEventListener("DOMContentLoaded", () => {
    const auth = document.querySelector("mu-auth");
  
    // If not logged in → redirect
    if (!auth?.user) {
      window.location.href = "/login.html";
      return;
    }
  
    const username = auth.user.username;
  
    const nameInput = document.querySelector("#name-input");
    const emailInput = document.querySelector("#email-input");
    const form = document.querySelector("#profile-form");
  
    // Load existing profile
    fetch(`/api/profile/${username}`)
      .then(res => res.json())
      .then(profile => {
        nameInput.value = profile.name ?? "";
        emailInput.value = profile.email ?? "";
      })
      .catch(err => console.error("Profile load error:", err));
  
    // Handle profile update
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const updated = {
        name: nameInput.value,
        email: emailInput.value
      };
  
      try {
        const res = await fetch(`/api/profile/${username}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated)
        });
  
        if (!res.ok) throw new Error("Failed to update");
  
        alert("Profile updated!");
        window.location.href = "/index.html";
      } catch (err) {
        console.error(err);
        alert("Error saving profile");
      }
    });
  });
  