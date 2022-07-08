const tabs = document.querySelectorAll(".tab-link");
const pages = document.querySelectorAll(".page");
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", () => {
    tabs[i].classList.add("tab-active");
    pages[i].classList.remove("hidden");
    for (let j = 0; j < tabs.length; j++) {
      if (tabs[j] !== tabs[i]) {
        tabs[j].classList.remove("tab-active");
        pages[j].classList.add("hidden");
      }
    }
  });
}
console.log(pages);
