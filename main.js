async function getEducation() {
    const response = await fetch("data.json");

    if (response.ok) {
        const data = await response.json();
        console.log(data); // Kontrollera om data hämtas korrekt

        const kbssBox = document.getElementById("kbssBox");
        const volvoBox = document.getElementById("volvoBox");

        // Rensa tidigare text i experienceBox1
        kbssBox.innerHTML = "";
        volvoBox.innerHTML = "";

        // Lägg till text för workAtKBSS
        const kbssText = document.createElement("p");
        kbssText.innerHTML = data.education.workAtKBSS;
        kbssBox.appendChild(kbssText);

        // Lägg till text för workAtVolvoCars
        const volvoText = document.createElement("p");
        volvoText.innerHTML = data.education.workAtVolvoCars;
        volvoBox.appendChild(volvoText);
    } else {
        console.log("Error:", response.status);
    }
}

getEducation();
