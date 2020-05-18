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

firebase.auth().onAuthStateChanged(function (user) {
	if (!user) {
		// No user is signed in.
		window.location.href = "/login.html";
	}
});

function submit(e) {
	e.preventDefault();
	const name = document.getElementById("name").value;
	const codeName = document.getElementById("codeName").value;
	const department = document.getElementById("department").value;
	const email = document.getElementById("email").value;
	const phone = document.getElementById("phone").value;
	const hod = document.forms["dataentryform"]["hodbtn"].value;

	const alertbox = document.getElementById("alertbox");

	firebase
		.database()
		.ref("/phonebook/")
		.push({
			name,
			codeName,
			department,
			email,
			phone,
			hod,
		})
		.then(() => {
			alertbox.classList.add("alert-success");
			alertbox.innerHTML = "Record added successfully...";
			alertbox.style.display = "block";
			setTimeout(() => {
				alertbox.classList.remove("alert-success");
				alertbox.innerHTML = "";
				alertbox.style.display = "none";
			}, 2000);
			document.forms["dataentryform"].reset();
		})
		.catch((err) => {
			alertbox.classList.add("alert-danger");
			alertbox.innerHTML = err.message;
			alertbox.style.display = "block";
			setTimeout(() => {
				alertbox.classList.remove("alert-danger");
				alertbox.innerHTML = "";
				alertbox.style.display = "none";
			}, 2000);
		});
}

document.getElementById("dataentryform").addEventListener("submit", submit);
document
	.getElementById("cancelbtn")
	.addEventListener("click", () => document.forms["dataentryform"].reset());
