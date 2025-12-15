document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const googleForm = document.createElement("form");
      googleForm.method = "POST";
      googleForm.action =
        "https://docs.google.com/forms/d/e/1FAIpQLSf8u_u0qk5G-9IQADadyQqFsUKKYiQagjQ-_FbqCD4IkhE3Kw/formResponse";
      googleForm.target = "google-form-iframe";
      googleForm.style.display = "none";

      const fields = [
        { name: "entry.187973015", value: name },
        { name: "entry.1305694027", value: email },
        { name: "entry.552809538", value: message },
      ];

      fields.forEach((f) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = f.name;
        input.value = f.value;
        googleForm.appendChild(input);
      });

      const iframe = document.createElement("iframe");
      iframe.name = "google-form-iframe";
      iframe.style.display = "none";

      document.body.appendChild(iframe);
      document.body.appendChild(googleForm);
      googleForm.submit();

      setTimeout(() => {
        showMessage(
          "Thank you! Your message has been sent successfully. We'll get back to you soon.",
          "success"
        );
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
          googleForm.remove();
          iframe.remove();
        }, 1000);
      }, 2000);
    } catch (err) {
      console.error(err);
      showMessage("There was an issue sending your message.", "error");
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
});

function showMessage(message, type) {
  const messageDiv = document.getElementById("formMessage");
  messageDiv.textContent = message;
  messageDiv.className = type === "success" ? "success" : "error-message";
  messageDiv.style.display = "block";

  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
}
