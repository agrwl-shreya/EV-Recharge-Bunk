document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginMsg = document.getElementById('loginMsg');
  const registerMsg = document.getElementById('registerMsg');

  // LOGIN LOGIC
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const uid = userCredential.user.uid;

        const doc = await firebase.firestore().collection("users").doc(uid).get();
        if (doc.exists) {
          const role = doc.data().role;
          if (role === "admin") {
            window.location.href = "admin-dashboard.html";
          } else {
            window.location.href = "user-dashboard.html";
          }
        } else {
          loginMsg.textContent = "No role assigned to this account.";
        }
      } catch (error) {
        console.error("Login Error:", error.message);
        loginMsg.textContent = error.message;
      }
    });
  }

  // REGISTRATION LOGIC
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;
      const role = document.querySelector('input[name="role"]:checked')?.value;

      if (!role) {
        registerMsg.textContent = "Please select a role (user or admin).";
        return;         
      }

      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = userCredential.user.uid;

        await firebase.firestore().collection("users").doc(uid).set({
          email: email,
          role: role,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        registerMsg.textContent = "Registered successfully! Redirecting...";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } catch (error) {
        console.error("Registration Error:", error.message);
        registerMsg.textContent = error.message;
      }
    });
  }
});





