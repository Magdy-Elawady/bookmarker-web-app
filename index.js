var allWebsites = [];
allWebsites = JSON.parse(localStorage.getItem("allWebsites")) || [];
display();


// --------- Adding new website function ---------
function addWebsite() {
  var nameValue = nameInput.value.trim();
  var urlValue = urlInput.value.trim();

  if (valiName(nameValue) && valiUrl(urlValue)) {
    // 🔴 هنا بنتأكد إنه مش مكرر
    var isDuplicate = allWebsites.some(
      site => site.websiteName.toLowerCase() === nameValue.toLowerCase() || 
              site.websiteUrl === urlValue
    );

    if (isDuplicate) {
      Swal.fire({
        icon: "warning",
        title: "Duplicate Entry",
        text: "This website is already saved.",
      });
      return;
    }

    var website = {
      websiteName: nameValue,
      websiteUrl: urlValue,
    };

    allWebsites.push(website);
    display();
    localStorage.setItem("allWebsites", JSON.stringify(allWebsites));

    Swal.fire({
      title: "Good job!",
      text: "Your website is added successfully",
      icon: "success",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Site name must contain at least 3 characters, and the URL must be valid.`,
    });
  }
}

// --------- pressing enter will add the website  ---------
urlInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addWebsite();
  }
});
nameInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addWebsite();
  }
});

// --------- Display function ---------
function display(filteredWebsites = allWebsites) {
  var cartoona = "";

  if (filteredWebsites.length === 0) {
    cartoona = `
      <tr>
        <td colspan="3" class="text-center text-danger fw-bold">
          No Websites found.
        </td>
      </tr>
    `;
  } else {
    for (var i = 0; i < filteredWebsites.length; i++) {
      cartoona += `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${filteredWebsites[i].websiteName}</td>
          <td>
            <button class="btn"><a href="${
              filteredWebsites[i].websiteUrl
            }" target="_blank">Visit</a></button>
            <button class="btn" onclick="delet(${i})">Delete</button>
          </td>
        </tr>`;
    }
  }

  document.getElementById("table-content").innerHTML = cartoona;
  clearInputs();
}



// --------- filtering function ---------
function searchWebsite(term) {
  term = term.toLowerCase();
  let filtered = allWebsites.filter(site =>
    site.websiteName.toLowerCase().includes(term)
  );
  display(filtered);
}

// --------- Delete function ---------
function delet(num) {
  allWebsites.splice(num, 1);
  display();
  localStorage.setItem("allWebsites", JSON.stringify(allWebsites));
}


// --------- Clear inputs function ---------
function clearInputs() {
  document.getElementById("nameInput").value = "";
  document.getElementById("urlInput").value = "";
  nameInput.classList.remove("is-valid");
  urlInput.classList.remove("is-valid");

}


// --------- Validation ---------
var nameRegex = /^\w{3,30}$/;

function valiName(nameValue) {
  if (nameRegex.test(nameValue)) {
    nameInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    nameInput.classList.add("is-invalid");
    return false;
  }
}

var urlRegex = /^(https?:\/\/)?([A-Za-z0-9-]+\.)+[A-Za-z]{2,10}(\/.*)?$/;

function valiUrl(urlValue) {
  if (urlRegex.test(urlValue)) {
    urlInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    urlInput.classList.add("is-invalid");
    return false;
  }
}


