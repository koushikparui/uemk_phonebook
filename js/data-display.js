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

function displayData(dataObj) {
  const tableBody = document.querySelector("#tablebody");
  var newData = "";
  for (const entries in dataObj) {
    if (dataObj.hasOwnProperty(entries)) {
      const data = dataObj[entries];
      mainData.push(data);

      newData += `<tr>
						<td>${data.name}</td>
						<td>${data.codeName}</td>
						<td>${data.department}</td>
						<td><a href="mailto:${data.email}">${data.email}</a></td>
            <td><a href="tel:${data.phone}">${data.phone}</a></td>
            <td> <button type="button" id="" class="btn btn-danger">x</td>
					</tr>`;
    }
  }
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
  const tableBody = document.querySelector("#tablebody");
  const searchVal = document.getElementById("searchVal").value;
  const filterOption = document.getElementById("filterOption").value;

  const filteredData = mainData.filter((data) =>
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

  filteredData.map((data) => {
    tableBody.innerHTML += `<tr>
						<td>${data.name}</td>
						<td>${data.codeName}</td>
						<td>${data.department}</td>
						<td><a href="mailto:${data.email}">${data.email}</a></td>
						<td><a href="tel:${data.phone}">${data.phone}</a></td>
					</tr>`;
  });
}

function cancelSearch() {
  const tableBody = document.querySelector("#tablebody");
  document.getElementById("searchVal").value = "";
  tableBody.innerHTML = "";

  mainData.map((data) => {
    tableBody.innerHTML += `<tr>
						<td>${data.name}</td>
						<td>${data.codeName}</td>
						<td>${data.department}</td>
						<td><a href="mailto:${data.email}">${data.email}</a></td>
						<td><a href="tel:${data.phone}">${data.phone}</a></td>
					</tr>`;
  });
}

window.addEventListener("load", getData);
document.getElementById("searchForm").addEventListener("submit", searchData);
document.getElementById("cancelSearch").addEventListener("click", cancelSearch);
