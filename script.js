let myLibrary = new Array();
myLibrary = [
  {
    title: "Illiad",
    author: "Homer",
    pages: "500",
    status: "read",
  },
  {
    title: "Notes from the Underground",
    author: "Fiodor Dostojewski",
    pages: "400",
    status: "half way",
  },
];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

if (window.localStorage.length == 0) {
  storeLib(myLibrary);
}

function addBookToLibrary(inp_title, inp_author, inpt_pages, inpt_status) {
  const retrievedArray = getArray();

  const bookie = new Book(inp_title, inp_author, inpt_pages, inpt_status);
  const kopia = Object.assign({}, bookie);
  newLib = myLibrary.push(bookie);
  retrievedArray.push(bookie);
  storeLib(retrievedArray);
  console.log();
}
function createForm() {
  let div = document.getElementById("flex-box");

  let form = document.createElement("form");

  // Create an input element
  let group1 = document.createElement("div");
  group1.classList.add("flex-box-item");
  let title = document.createElement("input");
  let title_l = document.createElement("label");
  title_l.innerHTML = "Title";

  title.setAttribute("id", "one");
  title.setAttribute("type", "text");
  title.setAttribute("name", "title");
  title.setAttribute("placeholder", "Title");
  let group2 = document.createElement("div");
  group2.classList.add("flex-box-item");
  let author = document.createElement("input");
  let author_l = document.createElement("label");
  author.setAttribute("id", "two");
  author_l.innerHTML = "Author";
  author.classList.add("inp");
  author.setAttribute("type", "text");
  author.setAttribute("name", "author");
  author.setAttribute("placeholder", "Author");
  let group3 = document.createElement("div");
  group3.classList.add("flex-box-item");
  let pages = document.createElement("input");
  let pages_l = document.createElement("label");
  pages.setAttribute("id", "three");
  pages_l.innerHTML = "Pages";
  pages.classList.add("inp");
  pages.setAttribute("type", "text");
  pages.setAttribute("name", "pages");
  pages.setAttribute("placeholder", "Pages");
  let group4 = document.createElement("div");
  group4.classList.add("flex-box-item");
  let read = document.createElement("input");
  let read_l = document.createElement("label");
  read.setAttribute("id", "four");
  read_l.innerHTML = "Status";
  read.classList.add("inp");
  read.setAttribute("type", "text");
  read.setAttribute("name", "read");
  read.setAttribute("placeholder", "Is it read?");
  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit");
  group1.appendChild(title_l);
  group2.appendChild(author_l);
  group3.appendChild(pages_l);
  group4.appendChild(read_l);
  group1.appendChild(title);
  group2.appendChild(author);
  group3.appendChild(pages);
  group4.appendChild(read);

  div.append(group1);
  div.append(group2);
  div.append(group3);
  div.append(group4);

  form.append(submit);
  div.appendChild(form);
  submit.addEventListener("click", (e) => {
    addBookToLibrary(title.value, author.value, pages.value, read.value);

    display(2);
    if (!title.value || !author.value || !pages.value || !read.value) {
      alert("You have to fill all the boxes!");
    }
  });
}
console.log(localStorage);
function storeLib(library) {
  localStorage.setItem("library", JSON.stringify(library));

  console.log(localStorage);
}
//storeLib(myLibrary);

function getArray() {
  let localArray = localStorage.getItem("library");

  let retrievedArray = JSON.parse(localArray);

  return retrievedArray;
}

getArray();
console.log(getArray());

function display(method) {
  const retrievedArray = getArray();
  const table = document.getElementById("tbod");
  const container = document.querySelector(".container");
  if (method == 1) {
    for (const book in retrievedArray) {
      let row = table.insertRow();
      row.classList.add("tr");
      let title = row.insertCell(0);
      title.innerHTML = retrievedArray[book].title;
      let authore = row.insertCell(1);
      authore.innerHTML = retrievedArray[book].author;
      let pagez = row.insertCell(2);
      pagez.innerHTML = retrievedArray[book].pages;
      let status = row.insertCell(3);
      //const button = container.createElement("button");
      //row.appendChild(button);
      status.classList.add("status");
      status.innerHTML = retrievedArray[book].status;
    }
    if (method == 2) {
      let newest = retrievedArray[retrievedArray - 1];
      let row = table.insertRow();
      let title = row.insertCell(0);
      title.innerHTML = newest.title;
      let authore = row.insertCell(1);
      authore.innerHTML = newest.author;
      let pagez = row.insertCell(2);
      pagez.innerHTML = newest.pages;
      let status = row.insertCell(3);
      status.innerHTML = newest.status;
      status.classList.add("status");
    }
  }
}
display(1);
const container = document.querySelector(".container");
const new_button = container.querySelector(".new-button");
new_button.addEventListener("click", (e) => {
  createForm();
  display(2);
});
function addButtons() {
  const container = document.querySelector(".container");
  const stats = container.querySelectorAll(".status");
  const btn_list = [];
  stats.forEach((status) => {
    // const index = status.rowIndex;

    const button = document.createElement("button");
    status.appendChild(button);
    btn_list.push(button);
    button.classList.add("stat-btn");
    button.innerText = "CHANGE";
    button.addEventListener("click", (e) => {
      const index = btn_list.indexOf(button);

      const input = document.createElement("input");
      input.type = "text";
      input.classList.add("change-class");
      status.appendChild(input);

      let submit = document.createElement("input");
      submit.type = "submit";

      status.appendChild(submit);
      submit.addEventListener("click", (e) => {
        const new_value = input.value;
        changeStat(index, new_value);
      });
    });
  });
}
addButtons();
function changeStat(row_index, value) {
  //check the row that it's been clicked at
  //get the row it's been clicked at
  let retrievedArray = getArray();
  let random = [];
  let that_object = retrievedArray.at(row_index);
  function changeBook(obj, status) {
    let bookie = new Book();
    bookie.title = obj.title;
    bookie.author = obj.author;
    bookie.pages = obj.pages;
    bookie.status = status;
    return bookie;
  }
  const updated_obj = changeBook(that_object, value);
  random.push(updated_obj);

  const newArray = retrievedArray.map(
    (obj) => random.find((o) => o.title === obj.title) || obj
  );

  //for (const book in retrievedArray) {
  // count = count++;
  //if (count == row_index) {
  //const value=retrievedArray[book].status
  //}
  //}

  console.log(updated_obj);
  console.log(newArray);
  storeLib(newArray);
  window.location.reload(true);
}
function addRemoveBtn() {
  const container = document.querySelector(".container");
  const rows = container.querySelectorAll("tr");
  const table = document.getElementById("tbod");
  let rowsArr = Array.prototype.slice.call(rows);
  let btnList = [];

  for (let i = 0; i < rowsArr.length; i++) {
    if (i > 0) {
      const button = document.createElement("button");
      rowsArr[i].appendChild(button);
      button.classList.add("remove-btn");
      btnList.push(button);
      button.innerText = "REMOVE";
      button.addEventListener("click", (e) => {
        const index = btnList.indexOf(button);
        remove(index);
      });
    }
  }
}
addRemoveBtn();
function remove(index_num) {
  let retrievedArray = getArray();
  const updateArray = retrievedArray.splice(index_num, 1);
  console.log(retrievedArray);

  console.log(index_num);
  storeLib(retrievedArray);
  console.log(localStorage);
  window.location.reload(true);
}
