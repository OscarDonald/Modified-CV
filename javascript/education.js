// Function for education
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
    // Creates a loop for not repeating code
    for (let i = 1; i <= 3; i++) {
      const educationText = document.createElement("li");
      educationText.innerHTML = data.education["myEducation" + i];
      educationBox.appendChild(educationText);
    }
  } else {
    console.log("Error:", response.status);
  }
}

getEducation();