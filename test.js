
// Load the JSON file using fetch
fetch('./dictionary.json')
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})

.then(data => {
  // Use the JSON data here
  
  // Assuming the rest of your logic:
  const search = document.querySelector("#search");
  const button = document.querySelector("#button");
  const meaning = document.querySelector("#meaning");
  

  function searchWord() {
    const searchTerm = search.value.trim().toLowerCase();

    if (searchTerm in data) {
        let cleanedMeaning = data[searchTerm]
            .replace(/\(.*?\)/g, '') // Remove text in parentheses
            .replace(/\[Obs.\]/g, '') // Remove specific annotations
            .replace(/(\d+)\s*\./g, '<br>$1.') // Insert a line break before numbered lists
            .replace(/(--\s+)/g , '<br>')
            .replace(/(:\s+)/g , '')
            .replace(/(;\s+)/g , '')
            //.replace(/\.\s*/g, '<br>')
            .replace(/Note/g, '<br>Note:<br>')
            .replace(/Examples/g, '<br>Examples:<br>')
        // Add line breaks for separating numbered items
        cleanedMeaning = cleanedMeaning
            .replace(/(\d+\.\s+)/g, '<br><br>$1'); // Add breaks before each numbered item
            // Ensure multiple spaces are condensed into a single space
            cleanedMeaning = cleanedMeaning.replace(/\s+/g, '    ').trim();
        meaning.innerHTML = cleanedMeaning;  // Display the cleaned meaning in the HTML element
    } else {
        meaning.innerHTML = `Word "${searchTerm}" not found in the dictionary`;
    }
}

  button.addEventListener("click", searchWord);
  const searchInput = document.querySelector("#search");
  // Trigger search on pressing "Enter" key
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      searchWord();
    }
  });

// Select the dark mode toggle button
const darkmode = document.querySelector(".darkmode");

// Add an event listener to the button
darkmode.addEventListener("click", function() {
    const body = document.querySelector(".body");
    const footer = document.querySelector("footer");
    const footerLinks = footer.querySelectorAll("a");
    const icondark = document.querySelector(".darkmode");

    // Check if dark mode is currently active
    if (body.style.backgroundColor === 'black') {
        // Switch to normal mode
        body.style.backgroundColor = 'beige';
        body.style.color = 'black';
        footer.style.backgroundColor = 'rgba(0, 0, 0, 0.811)';
        footerLinks.forEach(link => {
            link.style.color = 'aliceblue';
        });
        icondark.innerHTML = '<ion-icon name="moon"></ion-icon>';
        icondark.style.color = 'white';
    } else {
        // Switch to dark mode
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        footer.style.backgroundColor = 'gold';
        footerLinks.forEach(link => {
            link.style.color = 'black';
        });
        icondark.innerHTML = '<ion-icon name="sunny"></ion-icon>';
        icondark.style.color = 'black';
    }
});


})
.catch(error => console.error('Error loading JSON:', error));
