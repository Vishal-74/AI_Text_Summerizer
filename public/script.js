document.addEventListener("DOMContentLoaded", function() {
  const textArea = document.getElementById("text_to_summarize");
  const submitButton = document.getElementById("submit-button");
  const summarizedTextArea = document.getElementById("summary");

  // Function to toggle dark mode
  const themeToggleSwitch = document.getElementById("theme-toggle-switch");
  themeToggleSwitch.addEventListener("change", toggleDarkMode);

  // Initially, check if dark mode is enabled or disabled and update the UI accordingly
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    themeToggleSwitch.checked = true;
  }

  // Event listener for the text area input
  textArea.addEventListener("input", verifyTextLength);
  // Event listener for the submit button
  submitButton.addEventListener("click", submitData);

  function verifyTextLength() {
    // Verify the length of text in the text area
    if (textArea.value.length > 200 && textArea.value.length < 100000) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  function submitData() {
    submitButton.classList.add("submit-button--loading");
    const text_to_summarize = textArea.value;

    // Send request to the server for text summarization
    fetch('/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text_to_summarize: text_to_summarize
      })
    })
      .then(response => response.text())
      .then(summary => {
        summarizedTextArea.value = summary; // Update the summarized text area with the response
        submitButton.classList.remove("submit-button--loading"); // Remove loading animation
      })
      .catch(error => {
        console.error(error);
        submitButton.classList.remove("submit-button--loading"); // Remove loading animation in case of error
      });
  }

  function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  }
});