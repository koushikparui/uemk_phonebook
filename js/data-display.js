// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCftKDkJBB2UVtyzRxg8spxu_YFWVheaiY",
  authDomain: "lb-uemk-phonebook.firebaseapp.com",
  databaseURL: "https://lb-uemk-phonebook.firebaseio.com",
  projectId: "lb-uemk-phonebook",
  storageBucket: "lb-uemk-phonebook.appspot.com",
  messagingSenderId: "506291128817",
  appId: "1:506291128817:web:0303cb9e9369ce5c691c50",
  measurementId: "G-BFK0FSW3Z2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const mainData = [];

function checkLoggedIn() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);

      const elements = Array.from(document.getElementsByClassName("adminOnly"));
      elements.map((element) => {
        element.classList.remove("adminOnly");
      });
    }
  });
}

function deleteData(id) {
  firebase
    .database()
    .ref("/phonebook/" + id)
    .remove()
    .then((res) => alert("Data removed"))
    .catch((err) => {});
}

function displayData(dataObj) {
  const tableBody = document.querySelector("#tablebody");
  var newData = "";
  for (const entries in dataObj) {
    if (dataObj.hasOwnProperty(entries)) {
      const data = dataObj[entries];
      mainData.push({ id: entries, data });

      newData += `<tr>
						<td class="rd-f">${data.name}</td>
						<td>${data.codeName}</td>
						<td>${data.department}</td>
						<td><a href="tel:${data.phone}">${data.phone}</a></td>
            <td class="rd-l"><a href="mailto:${data.email}">${data.email}</a></td>
            <td class="blank"> <button type="button" onclick="deleteData('${entries}')" style= "border-radius:30px;"class="btn btn-danger adminOnly">x</button></td>
					</tr>`;
    }
  }

  checkLoggedIn();

  tableBody.innerHTML = newData;
  document.getElementsByClassName("loader")[0].style.display = "none";
  document.getElementsByClassName("non-loader")[0].style.visibility = "visible";
}

function getData() {
  firebase
    .database()
    .ref("/phonebook/")
    .on("value", (snapshot) => {
      displayData(snapshot.val());
    });
}

function searchData(e) {
  e.preventDefault();
  checkLoggedIn();
  const tableBody = document.querySelector("#tablebody");
  const searchVal = document.getElementById("searchVal").value;
  const filterOption = document.getElementById("filterOption").value;

  const filteredData = mainData.filter(({ data }) =>
    data[filterOption].toLowerCase().includes(searchVal.toLowerCase())
  );
  if (filteredData.length === 0) {
    document.getElementById("notFoundMessage").innerText =
      "Search value didn't match any record";
    document.getElementById("notFoundMessage").style.display = "block";
    return;
  }
  tableBody.innerHTML = "";
  document.getElementById("notFoundMessage").style.display = "none";

  filteredData.map(({ data, id }) => {
    tableBody.innerHTML += `<tr>
						<td>${data.name}</td>
						<td>${data.codeName}</td>
						<td>${data.department}</td>
						<td><a href="mailto:${data.email}">${data.email}</a></td>
            <td><a href="tel:${data.phone}">${data.phone}</a></td>
            <td> <button type="button" onclick="deleteData('${id}')" class="btn btn-danger adminOnly">x</td>
            
					</tr>`;
  });
}

function cancelSearch() {
  const tableBody = document.querySelector("#tablebody");
  document.getElementById("searchVal").value = "";
  tableBody.innerHTML = "";

  mainData.map(({ data, id }) => {
    tableBody.innerHTML += `<tr>
						<td>${data.name}</td>
						<td>${data.codeName}</td>
						<td>${data.department}</td>
						<td><a href="mailto:${data.email}">${data.email}</a></td>
						<td><a href="tel:${data.phone}">${data.phone}</a></td>
            <td> <button type="button" onclick="deleteData('${id}')" class="btn btn-danger adminOnly">x</td>

          </tr>`;
  });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location.href = "/";
    })
    .catch(function (error) {
      alert("Error logging out");
    });
}

window.addEventListener("load", getData);
document.getElementById("searchForm").addEventListener("submit", searchData);
document.getElementById("searchVal").addEventListener("input", (e) => {
  if (!e.target.value) {
    cancelSearch();
  }
});
document.getElementById("logoutBtn").addEventListener("click", logout);
