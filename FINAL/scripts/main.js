const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

if (menuButton && mainNav) {
	menuButton.addEventListener("click", () => {
		mainNav.classList.toggle("open");
	});
}

if (currentYear) {
	currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
	lastModified.textContent = document.lastModified;
}
