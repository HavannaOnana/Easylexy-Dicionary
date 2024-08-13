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
        meaning.innerHTML = data[searchTerm];
      } else {
        meaning.innerHTML = `Word "${searchTerm}" not found in the dictionary`;
      }
    }

    button.addEventListener("click", searchWord);
  })
  .catch(error => console.error('Error loading JSON:', error));
