// widgets start
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector(".back-to-top").style.display = "block";
  } else {
    document.querySelector(".back-to-top").style.display = "none";
  }
}

document.querySelector(".back-to-top").addEventListener("click", function (e) {
  e.preventDefault();
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});
// widgets end

// dropdown start
// dropdown
document.addEventListener("DOMContentLoaded", function () {
  const dropdownIcon = document.getElementById("serviceDropdown");
  const dropdownMenu = document.getElementById("serviceMenu");
  const navLink = dropdownIcon.closest(".nav-link");

  dropdownIcon.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });

  navLink.addEventListener("click", function (event) {
    if (event.target === this) {
      // Allow navigation when clicking on the "Service" text
      return;
    }
    event.preventDefault();
  });

  // Close the dropdown when clicking outside
  window.addEventListener("click", function (event) {
    if (
      !event.target.matches("#serviceDropdown") &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove("show");
    }
  });
});
// dropdown end

//  accordion start
// d
const accordionsContent = [
  {
    id: "accordion-content-show-1",
    title: "Why you work with us?",
    content:
      "We create beautiful, functional websites that showcase your brand and engage your audience. Our custom software improves your operations and boosts efficiency, giving you an edge. We enhance your online visibility with effective SEO strategies that attract and convert quality traffic. Our dedicated team stays updated with industry trends to deliver top-notch solutions.",
  },
  {
    id: "accordion-content-show-2",
    title: "How we work?",
    content:
      "It's very simple and straightforward. We begin with a conversation to understand your business goals and how we can support you for a long time. Then, we translate these goals into a website that effectively communicates your company's objectives. Our team ensures that your recruitment website is designed to attract the right candidates, but also impresses the right clients and the clients delivered on time.",
  },
  {
    id: "accordion-content-show-3",
    title: "Our values",
    content:
      "At Eraloop, our values centre on integrity, innovation, and client satisfaction. We prioritise transparency and excellence in everything we do, ensuring we deliver exceptional results that exceed expectations.",
  },
  {
    id: "accordion-content-show-4",
    title: "Giving back the community",
    content:
      "We are dedicated to supporting our local community, whether through charitable donations or by collaborating with initiatives that enrich life in Barnet, London.",
  },
];
document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll(".list-unstyled li");

  listItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      const isMobile = window.matchMedia("(max-width: 990px)").matches;

      listItems.forEach((li) => {
        const para = li.querySelector("p");
        console.log(`mobile-accordion-title-${index + 1}`);
        if (
          li.id === `accordion-title-${index + 1}` ||
          li.id === `mobile-accordion-title-${index + 1}`
        ) {
          console.log(`Matched ID: accordion-title-${index + 1}`);
          li.classList.add("opacity-100");
          li.classList.remove("opacity-50");
          if (isMobile && para) {
            para.style.maxHeight = "200px";
            para.classList.add("slide");
            para.classList.remove("d-none");
          }
        } else {
          li.classList.remove("opacity-100");
          li.classList.add("opacity-50");
          if (isMobile && para) {
            para.style.maxHeight = null;
            para.classList.remove("slide");
            para.classList.add("d-none");
          }
        }
      });

      const title = document.getElementById("accordion-title-show");

      const para = document.getElementById(`accordion-content-show-1`);

      title.innerText = accordionsContent[index].title;
      para.innerText = accordionsContent[index].content;
    });
  });
});
// mobile accordion
document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll(".mobile-list-unstyled li");

  listItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      const isMobile = window.matchMedia("(max-width: 990px)").matches;
      listItems.forEach((li) => {
        const para = li.querySelector("p");
        console.log(`mobile-accordion-title-${index + 1}`);
        if (
          li.id === `accordion-title-${index + 1}` ||
          li.id === `mobile-accordion-title-${index + 1}`
        ) {
          li.classList.add("opacity-100");
          li.classList.remove("opacity-50");
          if (isMobile && para) {
            para.style.maxHeight = "200px";
            para.classList.add("slide");
            para.classList.remove("d-none");
          }
        } else {
          li.classList.remove("opacity-100");
          li.classList.add("opacity-50");
          if (isMobile && para) {
            para.style.maxHeight = null;
            para.classList.remove("slide");
            para.classList.add("d-none");
          }
        }
      });
    });
  });
});
// Toastify
function showToast(message, error) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "bottom", // top or bottom
    position: "right", // left, center or right
    backgroundColor: error ? "#e74c3c" : "#2ecc71",
  }).showToast();
}
// Book demo api integration
const baseUrl = "https://api.eraloop.co.uk/api";
document.addEventListener("DOMContentLoaded", function () {
  const bookDemoForm = document.getElementById("book-demo");
  if (bookDemoForm) {
    bookDemoForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Gather the form data
      const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
      };

      // Send the form data to the API endpoint
      fetch(baseUrl + "/book_demo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          showToast(data.results, false);
          // alert(data.results);
          //  clear the form
          document.getElementById("book-demo").reset();
        })
        .catch((error) => {
          // alert("There was a problem with your submission: " + error.message);
          showToast(error.message, true);
        });
    });
  }
});

// Contact api integration
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Gather the form data
      const formData = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        phone: document.getElementById("phone-contact").value,
        email: document.getElementById("email-contact").value,
        description: document.getElementById("description").value,
      };

      // Send the form data to the API endpoint
      fetch(baseUrl + "/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          // alert("Message sent successfully!");
          showToast("Message sent successfully!", false);
          // Clear the form
          contactForm.reset();
        })
        .catch((error) => {
          // alert("There was a problem with your submission: " + error.message);
          showToast(error.message, true);
        });
    });
  }
});

// Subscribe api integration
document.addEventListener("DOMContentLoaded", function () {
  const subscribeForm = document.getElementById("subscribeForm");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Gather the form data
      const formData = {
        email: document.getElementById("email-subscribe").value,
      };

      // Send the form data to the API endpoint
      fetch(baseUrl + "/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          // alert(data?.results);
          showToast(data?.results, false);
          // Clear the form
          subscribeForm.reset();
        })
        .catch((error) => {
          // alert("There was a problem with your submission: " + error.message);
          showToast(error.message, true);
        });
    });
  }
});

// about icons animation
// document.addEventListener('DOMContentLoaded', () => {
//   const icons = document.querySelectorAll('.stat-card');

//   let currentIconIndex = 0;
//   const fadeInOut = () => {
//       icons.forEach((icon, index) => {
//           icon.style.opacity = (index === currentIconIndex) ? '1' : '0';
//       });
//       currentIconIndex = (currentIconIndex + 1) % icons.length;
//   };

//   setInterval(fadeInOut, 2000); // Change every 2 seconds
//   fadeInOut(); // Initial call to start the loop
// });
// document.addEventListener('DOMContentLoaded', () => {
//   const icons = document.querySelectorAll('.stat-card');

//   icons.forEach((icon, index) => {
//       setTimeout(() => {
//           icon.style.animationDelay = `${index * 0.5}s`;
//       }, 100);
//   });
// });
