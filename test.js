
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

  //dark mode
  const darkmode = document.querySelector(".darkmode")
  darkmode.addEventListener("click",function(){
    const body = document.querySelector(".body")
    const footer = document.querySelector("footer")
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    footer.style.backgroundColor = 'gold'
    const footerLinks = footer.querySelectorAll("a");
    footerLinks.forEach(link => {
      link.style.color = 'black';
    });

    

  })


})
.catch(error => console.error('Error loading JSON:', error));
