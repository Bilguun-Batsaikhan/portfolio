document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const universityGrid = document.getElementById("university-projects");
  const privateGrid = document.getElementById("private-projects");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      if (tab.dataset.tab === "university") {
        universityGrid.classList.remove("hidden");
        privateGrid.classList.add("hidden");
      } else {
        privateGrid.classList.remove("hidden");
        universityGrid.classList.add("hidden");
      }
    });
  });
});

function animateCircle(circleElement) {
  const percentageElement = circleElement.querySelector(".percentage");
  const progressCircle = circleElement.querySelector(".progress");
  const target = +circleElement.dataset.percentage; //converts the data-percentage="75" to a number (using unary +).
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  let current = 0;

  //update the UI.
  function updateProgress() {
    // calculating the amount of stroke to hide.
    // offset = 283 - (0 / 100) * 283 = 283  // hide full stroke
    // offset = 283 - (75 / 100) * 283 = 70.75 // hide 75% of stroke
    // offset = 283 - (100 / 100) * 283 = 0    // hide no stroke
    const offset = circumference - (current / 100) * circumference;
    // stroke-dasharray: sets how long the total visible stroke is.
    // stroke-dashoffset: hides part of the stroke by shifting it.
    // stroke-dasharray: 283;     // Total stroke length
    // stroke-dashoffset: 283;    // Hide entire stroke (start at 0%)
    progressCircle.style.strokeDashoffset = offset; // This dynamically changes how much of the progress ring is visible, based on how far along the animation is.
    percentageElement.textContent = `${Math.round(current)}%`;
  }

  function step() {
    if (current < target) {
      current += 1; // Increase smoothly
      updateProgress();
      requestAnimationFrame(step); // Uses requestAnimationFrame(...) to ask the browser to call step() again at the next screen refresh (typically ~60fps).
    }
  }

  step();
}
/*
This is an Intersection Observer object that watches for when the circles become visible in the viewport.
{
  isIntersecting: true,
  intersectionRatio: 0.75,
  target: [The actual DOM element],
  boundingClientRect: { ... },
  rootBounds: { ... },
  time: 4212.88
}
*/

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        animateCircle(circle);
        observer.unobserve(circle); // Run only once
      }
    });
  },
  {
    threshold: 0.6, // When 60% of the element is visible
  }
);

/*[
  [Element], // DOM node
  [Element]
]
*/
document.querySelectorAll(".circle-progress").forEach((circle) => {
  observer.observe(circle);
});
