// Load the JSON file using fetch
fetch('./dictionary.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Assuming the rest of your logic:
    const search = document.querySelector("#search");
    const button = document.querySelector("#button");
    const meaning = document.querySelector("#meaning");
    const suggestionsBox = document.createElement('div');
    suggestionsBox.setAttribute('id', 'suggestionsBox');
    search.parentNode.insertBefore(suggestionsBox, search.nextSibling);

    function searchWord() {
      const searchTerm = search.value.trim().toLowerCase();

      if (searchTerm in data) {
        let cleanedMeaning = data[searchTerm]
          .replace(/\(.*?\)/g, '') // Remove text in parentheses
          .replace(/\[Obs.\]/g, '') // Remove specific annotations
          .replace(/(\d+)\s*\./g, '<br>$1.') // Insert a line break before numbered lists
          .replace(/(--\s+)/g, '<br>')
          .replace(/(:\s+)/g, '')
          .replace(/(;\s+)/g, '')
          //.replace(/\.\s*/g, '<br>')
          .replace(/Note/g, '<br>Note:<br>')
          .replace(/Examples/g, '<br>Examples:<br>');

        cleanedMeaning = cleanedMeaning
          .replace(/(\d+\.\s+)/g, '<br><br>$1') // Add breaks before each numbered item
          .replace(/\s+/g, ' ').trim(); // Ensure multiple spaces are condensed into a single space
        meaning.innerHTML = cleanedMeaning; // Display the cleaned meaning in the HTML element
      } else {
        meaning.innerHTML = `Word "${searchTerm}" not found in the dictionary`;
      }
      // Clear the suggestions box after the search
      suggestionsBox.innerHTML = '';
    }

    function updateSuggestions() {
      const inputValue = search.value.toLowerCase();
      const suggestions = Object.keys(data).filter(word => word.startsWith(inputValue)).slice(0, 5); // Limit suggestions to 5
      suggestionsBox.innerHTML = '';

      suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion-item');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', () => {
          search.value = suggestion;
          searchWord();
        });
        suggestionsBox.appendChild(suggestionElement);
      });
    }

    button.addEventListener("click", searchWord);

    search.addEventListener("input", updateSuggestions);

    // Trigger search on pressing "Enter" key
    search.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        searchWord();
      }
    });

    // Dark mode functionality (kept the same)
    const darkmode = document.querySelector(".darkmode");
    darkmode.addEventListener("click", function() {
      const body = document.querySelector(".body");
      const footer = document.querySelector("footer");
      const footerLinks = footer.querySelectorAll("a");
      const icondark = document.querySelector(".darkmode");

      if (body.style.backgroundColor === 'black') {
        body.style.backgroundColor = 'beige';
        body.style.color = 'black';
        footer.style.backgroundColor = 'rgba(0, 0, 0, 0.811)';
        footerLinks.forEach(link => link.style.color = 'aliceblue');
        icondark.innerHTML = '<ion-icon name="moon"></ion-icon>';
        icondark.style.color = 'white';
        document.querySelector("#suggestionsBox ").style.color = 'black';
      } else {
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        footer.style.backgroundColor = 'gold';
        footerLinks.forEach(link => link.style.color = 'black');
        icondark.innerHTML = '<ion-icon name="sunny"></ion-icon>';
        icondark.style.color = 'black';
        document.querySelector("#suggestionsBox ").style.color = 'black';
      }
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
