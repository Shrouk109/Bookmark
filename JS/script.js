// get elements
let siteName = document.getElementById("siteName");
let siteURL = document.getElementById("siteURL");
let btnSubmit = document.querySelector(".btn-submit");
let searchName = document.querySelector("#searchInput");
let btnVisite = document.querySelector(".btn-visit");

let allSites = JSON.parse(localStorage.getItem("allSites")) || [];

displaySites();

// event on btn submit
btnSubmit.addEventListener("click", addBookmark);

siteName.addEventListener("input", validateName);
siteURL.addEventListener("input", validateURL);

// add
function addBookmark() {
  if (
    allSites.some((site) => {
      return siteName.value === site.name;
    }) ||
    allSites.some((site) => {
      return siteURL.value === site.url;
    })
  ) {
    Swal.fire({
      title: "Site is alredy exist",
      icon: "error",
      confirmButtonText: "Ok!",
    });
    clearInputs();

    return;
  }
  if (!validateName() || !validateURL()) {
    Swal.fire({
      title: "Validation Error",
      html: `
    <p style="color: red;">⚠️ <strong>Site Name:</strong> Must contain at least <b>3 characters</b>.</p>
    <p style="color: red;">⚠️ <strong>Site URL:</strong> Must be a valid URL starting with <b>http://</b> or <b>https://</b>.</p>
  `,
      icon: "error",
      confirmButtonText: "Ok!",
    });

    // clearInputs();
    siteName.classList.remove("is-valid", "is-invalid");
    siteURL.classList.remove("is-valid", "is-invalid");

    return;
  }

  let Bookmark = {
    name: siteName.value,
    url: siteURL.value,
  };

  allSites.push(Bookmark);

  localStorage.setItem("allSites", JSON.stringify(allSites));

  displaySites();
  clearInputs();
  Swal.fire({
    title: "Bookmark Added!",
    text: "Your bookmark has been successfully added.",
    icon: "success",
  });
}

// clear all inputs
function clearInputs() {
  siteName.value = "";
  siteURL.value = "";
  siteName.classList.remove("is-valid", "is-invalid");
  siteURL.classList.remove("is-valid", "is-invalid");
}

// display sites
function displaySites() {
  let allrows = "";
  for (let i = 0; i < allSites.length; i++) {
    if (
      allSites[i].name.toLowerCase().includes(searchName.value.toLowerCase())
    ) {
      allrows += `
        <tr>
                                <td>${i + 1}</td>
                                <td>${allSites[i].name}</td>
                                <td><button  onclick="visitSite('${
                                  allSites[i].url
                                }')" class="btn btn-visit text-white"><i class="fa-solid fa-eye pe-2"></i><a
                                            href="#" target="_blank" class="text-white">Visit</a></button></td>
                                <td><button class="btn btn-Delete text-white" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i>
                                        Delete</button></td>
                            </tr>
    `;
    }
  }

  document.getElementById("table-body").innerHTML = allrows;
}

// visite site
function visitSite(link) {
  window.open(link, "_blank");
}

// delete site
function deleteSite(index) {
  allSites.splice(index, 1);
  localStorage.setItem("allSites", JSON.stringify(allSites));
  displaySites();
}

// oninput search
searchName.addEventListener("input", displaySites);

function validateName() {
  let regex = /^\w{3,}(\s+\w+)*$/;
  if (regex.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

function validateURL() {
  let regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if (regex.test(siteURL.value)) {
    siteURL.classList.add("is-valid");
    siteURL.classList.remove("is-invalid");
    return true;
  } else {
    siteURL.classList.add("is-invalid");
    siteURL.classList.remove("is-valid");
    return false;
  }
}
