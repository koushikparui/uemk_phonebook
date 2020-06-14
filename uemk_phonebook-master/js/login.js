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

function login(e) {
	e.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const alertbox = document.getElementById("alertbox");

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			alertbox.classList.add("alert-success");
			alertbox.innerHTML = "Login successful..";
			alertbox.style.display = "block";
			window.location.href = "/data-entry.html";
			setTimeout(() => {
				alertbox.classList.remove("alert-success");
				alertbox.innerHTML = "";
				alertbox.style.display = "none";
			}, 2000);
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

document.getElementById("loginform").addEventListener("submit", login);
