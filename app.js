const tagsEl = document.querySelector(".tags");
const textarea = document.querySelector("textarea");
const startButton = document.querySelector("#go");
const container = document.querySelector(".container");
const blind75 = document.querySelector("#blind75");

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

blind75.addEventListener("click", (e) => {
  textarea.value = "";
  textarea.value =
    "Array: Two Sum, Array: Container Duplicate, Array: Valid Anagram, Array: Group Anagrams, Array: Top K Frequent Elements, Array: Product of Array Except Self, Array: Encode and Decode Strings, Array: Longest Consecutive Sequence, Stack: Valid Parentheses, Binary Search: Search in Rotate Sorted Array, Binary Search: Find Minimum in Rotated Sorted Array, Linked List: Reverse Linked LIst, Linked List: Merge Two Sorted Lists, Linked List: Reorder List, Linked List: Remove Nth Node from End of List, Linked List: Linked List Cycle, Linked List: Merge K Sorted Lists, Trees: Invert Binary Tre, Trees: Maximum Depth of Binary Tree, Trees: Same Tree, Trees: Subtree of Another Tree, Heap/Priority Queue: Find Median from Data Stream";
  createTags(textarea.value);
  randomSelect();
});
