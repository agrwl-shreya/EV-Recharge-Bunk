function logAction(action, details = {}) {
  const user = firebase.auth().currentUser;

  if (!user) {
    console.warn("User not logged in, skipping log.");
    return;
  }

  const logEntry = {
    action,
    uid: user.uid,
    email: user.email,
    details,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  firebase.firestore().collection("logs").add(logEntry)
    .then(() => console.log("Log saved:", action))
    .catch(err => console.error("Logging failed:", err));
}

window.logAction = logAction;
