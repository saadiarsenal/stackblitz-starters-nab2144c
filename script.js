document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Location selector functionality
  const locationButton = document.getElementById('location-button');
  const locationModal = document.getElementById('location-modal');
  const closeModal = document.getElementById('close-modal');
  const locationForm = document.getElementById('location-form');
  const selectedLocation = document.getElementById('selected-location');
  const locationError = document.getElementById('location-error');
  
  if (locationButton) {
    const savedLocation = localStorage.getItem('userLocation') || '';
    if (savedLocation) {
      selectedLocation.textContent = savedLocation;
    }

    locationButton.addEventListener('click', () => {
      locationModal.style.display = 'flex';
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      locationModal.style.display = 'none';
      locationError.style.display = 'none';
    });
  }

  async function getLocationDetails(zipcode) {
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);
      if (!response.ok) {
        throw new Error('Invalid ZIP code');
      }
      const data = await response.json();
      const place = data.places[0];
      return `${place['place name']}, ${place['state abbreviation']}`;
    } catch (error) {
      throw new Error('Invalid ZIP code');
    }
  }

  if (locationForm) {
    locationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const zipcode = document.getElementById('zipcode').value;
      
      try {
        locationError.style.display = 'none';
        const locationString = await getLocationDetails(zipcode);
        localStorage.setItem('userLocation', locationString);
        selectedLocation.textContent = locationString;
        locationModal.style.display = 'none';
      } catch (error) {
        locationError.style.display = 'block';
      }
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === locationModal) {
      locationModal.style.display = 'none';
      locationError.style.display = 'none';
    }
  });

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
});