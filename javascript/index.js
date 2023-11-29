// Function for main page

async function getIndexText() {
    
    const response = await fetch("data.json");
  
    if (response.ok) {
      const indexData = await response.json();
      console.log(indexData); // Controls if the data loads correctly
  
      // Create const for paragraph
      const indexBox = document.getElementById("indexBox");
  
      // Add the text
      const paragraphText = document.getElementById("indexParagraph");
      paragraphText.innerHTML = indexData.index.paragraph;
      indexBox.appendChild(paragraphText);
    } else {
      console.log("Error: ", response.status);
    }
  }

  getIndexText();