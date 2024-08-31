document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch JSON data
  function fetchData() {
      return fetch('data.json') // Path to your JSON file
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              return {}; // Return empty object on error to prevent further issues
          });
  }

  // Function to create accordion item
  function createAccordionItem(item) {
      return `
          <div class="accordion-item">
              <h3 class="accordion-header">
                  <button class="accordion-button" type="button">
                      ${item.name}
                  </button>
              </h3>
              <div class="accordion-content">
                  <img src="${item.imageUrl}" alt="${item.name}" />
                  <p>${item.description}</p>
                  <p><strong>Price:</strong> ${item.price}</p>
                  <p><strong>Purpose:</strong> ${item.purpose}</p>
                  <p><strong>Quantity:</strong> ${item.quantity}</p>
              </div>
          </div>
      `;
  }

  // Event listener for "Learn More" buttons
  document.querySelectorAll('.learn-more').forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          const section = button.getAttribute('data-section');

          fetchData().then(data => {
              if (data && data[section]) {
                  const items = data[section];
                  const accordionContainer = document.querySelector('.details');

                  // Clear previous content
                  accordionContainer.innerHTML = '';

                  // Insert new accordion items
                  items.forEach(item => {
                      accordionContainer.innerHTML += createAccordionItem(item);
                  });

                  // Make accordion functional
                  const accordionItems = document.querySelectorAll('.accordion-button');
                  accordionItems.forEach(btn => {
                      btn.addEventListener('click', function() {
                          this.classList.toggle('active');
                          const content = this.nextElementSibling;
                          if (content.style.maxHeight) {
                              content.style.maxHeight = null;
                          } else {
                              content.style.maxHeight = content.scrollHeight + "px";
                          }
                      });
                  });
              } else {
                  console.error('Section not found in data:', section);
              }
          });
      });
  });
});