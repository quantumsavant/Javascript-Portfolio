// Cache DOM lists
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

// Init EmailJS
emailjs.init("KM4SeGJ4bdXmwkxOX");

// ---------------- TAB FUNCTION ----------------
function opentab(tabname, event) {
  // Remove old active classes
  [...tablinks].forEach(link => link.classList.remove("active-link"));
  [...tabcontents].forEach(content => content.classList.remove("active-tab"));

  // Add new active classes
  document.getElementById(tabname).classList.add("active-tab");
  event.currentTarget.classList.add("active-link");
}

// ---------------- HAMBURGER MENU ----------------
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");

  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// ---------------- CONTACT FORM ----------------
function sendMessage(event) {
  event.preventDefault();

  // Input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Error/output elements
  const errors = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    subject: document.getElementById("subjectError"),
    message: document.getElementById("messageError"),
    success: document.getElementById("successMessage")
  };

  // Reset errors
  Object.values(errors).forEach(el => { el.textContent = ""; });

  // Validation
  let isValid = true;

  if (name.length < 2) {
    errors.name.textContent = "Name must be at least 2 characters";
    isValid = false;
  }

  if (!isValidEmail(email)) {
    errors.email.textContent = "Please enter a valid email";
    isValid = false;
  }

  if (subject.length < 3) {
    errors.subject.textContent = "Subject must be at least 3 characters";
    isValid = false;
  }

  if (message.length < 10) {
    errors.message.textContent = "Message must be at least 10 characters";
    isValid = false;
  }

  if (!isValid) return;

  // Button state
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // EmailJS Params
  const templateParams = {
    from_name: name,
    from_email: email,
    phone,
    subject,
    message,
    to_email: "vijayecc9984@gmail.com"
  };

  // Send Email
  emailjs.send( "service_fhhhyxm","template_62tc229", templateParams)
    .then(response => {
      console.log("Email sent:", response);

      errors.success.textContent = "✓ Thank you! Your message has been sent.";
      errors.success.style.display = "block";
      errors.success.style.color = "#28a745";

      console.log({
        name, email, phone, subject, message,
        timestamp: new Date().toLocaleString(),
        status: "SENT"
      });

      setTimeout(() => {
        document.getElementById("contactForm").reset();
        errors.success.textContent = "";
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    })
    .catch(error => {
      console.error("Email sending error:", error);

      errors.success.textContent = "✗ Error sending message. Please try again.";
      errors.success.style.color = "#ff6b6b";

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

// ---------------- EMAIL VALIDATION ----------------
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

