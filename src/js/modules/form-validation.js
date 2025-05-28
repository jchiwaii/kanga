document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    // Clear previous error messages
    if (nameError) nameError.textContent = "";
    if (emailError) emailError.textContent = "";
    if (phoneError) phoneError.textContent = "";
    if (subjectError) subjectError.textContent = "";
    if (messageError) messageError.textContent = "";

    // Validate name
    if (nameInput && nameInput.value.trim() === "") {
      if (nameError) nameError.textContent = "Please enter your name";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && emailInput.value.trim() === "") {
      if (emailError) emailError.textContent = "Please enter your email";
      isValid = false;
    } else if (emailInput && !emailRegex.test(emailInput.value.trim())) {
      if (emailError)
        emailError.textContent = "Please enter a valid email address";
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[0-9\-+\s()]{7,20}$/;
    if (phoneInput && phoneInput.value.trim() === "") {
      if (phoneError) phoneError.textContent = "Please enter your phone number";
      isValid = false;
    } else if (phoneInput && !phoneRegex.test(phoneInput.value.trim())) {
      if (phoneError)
        phoneError.textContent = "Please enter a valid phone number";
      isValid = false;
    }

    // Validate subject
    if (subjectInput && subjectInput.value.trim() === "") {
      if (subjectError) subjectError.textContent = "Please enter a subject";
      isValid = false;
    }

    // Validate message
    if (messageInput && messageInput.value.trim() === "") {
      if (messageError) messageError.textContent = "Please enter your message";
      isValid = false;
    }

    // Submit if valid
    if (isValid) {
      alert("Form submitted successfully!");
      contactForm.reset();
    }
  });
});
