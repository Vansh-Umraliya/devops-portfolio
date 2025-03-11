const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const messagesContainer = document.getElementById("messages-container");

// Form Submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value
  };

  fetch("http://localhost:3000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Message sent successfully!");
        form.reset();
        fetchMessages(); // Reload messages
      } else {
        alert("❌ Failed to send message.");
      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ Server error.");
    });
});

// Fetch Past Messages
function fetchMessages() {
  fetch("http://localhost:3000/messages")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        messagesContainer.innerHTML = "";

        data.data.forEach(msg => {
          const div = document.createElement("div");
          div.classList.add("border", "p-3", "mb-3", "rounded");
          div.innerHTML = `
            <strong>${msg.name}</strong> (${msg.email})<br/>
            <small>${new Date(msg.createdAt).toLocaleString()}</small>
            <p>${msg.message}</p>
          `;
          messagesContainer.appendChild(div);
        });
      }
    })
    .catch(err => {
      console.error("Error fetching messages:", err);
    });
}

document.addEventListener("DOMContentLoaded", fetchMessages);
