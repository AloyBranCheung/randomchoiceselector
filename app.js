const tagsEl = document.querySelector(".tags");
const textarea = document.querySelector("textarea");
const startButton = document.querySelector(".container_startButton");
const container = document.querySelector(".container");

textarea.focus();

function createTags(input) {
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  tagsEl.textContent = "";

  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = tag;
    tagsEl.append(tagEl);
  });
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add("tag-highlight");
}

function noHighlightTag(tag) {
  tag.classList.remove("tag-highlight");
}

function randomSelect() {
  // if re-used, remove currently selected
  if (document.querySelector(".container_selected")) {
    document.querySelector(".container_selected").remove();
  }

  const times = 30;
  textarea.setAttribute("disabled", "true");

  // highlight/un-highlight random tags
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);
    setTimeout(() => {
      noHighlightTag(randomTag);
    }, 100);
  }, 100);

  // choose and highlight a random tag
  setTimeout(() => {
    textarea.removeAttribute("disabled");
    clearInterval(interval);
    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);

      // Display selected item text;
      const selectedOption = randomTag.innerText;
      const selectedHeader = document.createElement("h1");
      selectedHeader.innerText = selectedOption;
      selectedHeader.classList.add("container_selected");
      container.append(selectedHeader);
    }, 100);
  }, times * 100);
}

textarea.addEventListener("keyup", (e) => {
  const value = e.target.value;
  createTags(value);

  if (e.key === "Enter") {
    e.target.value = " ";
    randomSelect();
  }
});

startButton.addEventListener("click", (e) => {
  textarea.value = "";
  randomSelect();
});
