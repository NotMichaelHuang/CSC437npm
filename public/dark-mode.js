console.log("dark-mode.js loaded");

const toggleButton = document.querySelector("#enable-dark-mode");
const body = document.body;

// Check local storage
if(localStorage.getItem("darkMode") == "enabled")
{
  body.classList.add("dark-mode");
  if (toggleButton) toggleButton.checked = true;
}

// Function to toggle dark mode
if (toggleButton)
{
  toggleButton.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) 
      {
      body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    } 
    else 
    {
      body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    }
  });
}

