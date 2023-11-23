async function getEducation() {
  const response = await fetch("data.json");

  if (response.ok) {
    const data = await response.json();
    console.log(data); // Controls if the data loads correctly

    const kbssBox = document.getElementById("kbssBox");
    const volvoBox = document.getElementById("volvoBox");
    const educationBox = document.getElementById("educationBox");

    // Add text for workAtKBSS
    const kbssText = document.createElement("p");
    kbssText.innerHTML = data.education.workAtKBSS;
    kbssBox.appendChild(kbssText);

    // Add text for workAtVolvoCars
    const volvoText = document.createElement("p");
    volvoText.innerHTML = data.education.workAtVolvoCars;
    volvoBox.appendChild(volvoText);

    // Add text for educationBox
    const educationText1 = document.createElement("li");
    educationText1.innerHTML = data.education.myEducation1;
    educationBox.appendChild(educationText1);

    const educationText2 = document.createElement("li");
    educationText2.innerHTML = data.education.myEducation2;
    educationBox.appendChild(educationText2);

    const educationText3 = document.createElement("li");
    educationText3.innerHTML = data.education.myEducation3;
    educationBox.appendChild(educationText3);
  } else {
    console.log("Error:", response.status);
  }
}

getEducation();

window.addEventListener("load", () => {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light");
  }
  // Gets the themeSelector id
  const themeSelector = document.querySelector("#themeSelector");
  const body = document.body;

  // Creating a const which reads which HTML page I'm on
  const currentPage = document.body.id;

  // Sets the default class based on the current index page
  const defaultClass = currentPage === "body-index" ? "dark-index" : "dark";

  // Makes the page darkmode
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add(defaultClass);
    themeSelector.textContent = "Light mode ☀️";
  } else {
    themeSelector.textContent = "Dark mode🌙️";
  }

  // Makes the pages light mode
  themeSelector.addEventListener("click", () => {
    if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
      themeSelector.textContent = "Light mode ☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeSelector.textContent = "Dark mode🌙️";
    }

    // Toggle the default class based on the current page
    body.classList.toggle(defaultClass);

    // Set the background image only if on the index page
    if (currentPage === "body-index") {
      const backgroundImage =
        localStorage.getItem("theme") === "dark"
          ? 'url("images/background-darkmode.jpeg")'
          : 'url("images/background.jpeg")';
      body.style.backgroundImage = backgroundImage;
    }
  });
});
