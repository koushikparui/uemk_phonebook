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

function displayData(dataObj) {
	const tableBody = document.querySelector("#tablebody");
	var newData = "";
	for (const entries in dataObj) {
		if (dataObj.hasOwnProperty(entries)) {
			const data = dataObj[entries];
			newData += `<tr>
						<td>${data.name}</td>
						<td>${data.codeName}</td>
						<td>${data.department}</td>
						<td><a href="mailto:${data.email}">${data.email}</a></td>
						<td><a href="tel:${data.phone}">${data.phone}</a></td>
					</tr>`;
		}
	}
	tableBody.innerHTML = newData;
}

(function getData() {
	firebase
		.database()
		.ref("/phonebook/")
		.on("value", (snapshot) => {
			displayData(snapshot.val());
		});
})();
