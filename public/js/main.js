
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const mobileMenu = document.getElementById('mobile-menu-id');

menuToggleBtn.addEventListener('click', () => {
    menuToggleBtn.classList.toggle('active');
    if (menuToggleBtn.classList.contains('active')) {
        mobileMenu.style.transform = 'translateY(10%)';
    } else {
        mobileMenu.style.transform = 'translateY(-150%)';
    }
});

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".mobile-menu-id");
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    
}


const contentContainer = document.getElementById('images-cont');
const toggleButton = document.getElementById('toggle-button');
let isExpanded = false;

toggleButton.addEventListener('click', function () {
    if (!isExpanded) {
        // Duplicate images
        const images = contentContainer.querySelectorAll('.img-container');
        images.forEach(image => {
            const clone = image.cloneNode(true);
            contentContainer.appendChild(clone);
        });
        toggleButton.textContent = 'See Less';
        isExpanded = true;
    } else {
        // Remove duplicated images (but keep the original set)
        const images = contentContainer.querySelectorAll('.img-container');
        const originalLength = images.length / 2;
        for (let i = originalLength; i < images.length; i++) {
            images[i].remove();
        }
        toggleButton.textContent = 'See More';
        isExpanded = false;
    }
});
