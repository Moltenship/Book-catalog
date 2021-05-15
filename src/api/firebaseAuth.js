import firebase from 'firebase'

export async function logInWithGoogle(commit) {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  try {
    const { user } = await firebase.auth().signInWithPopup(googleProvider)
    commit(user)
  } catch (e) {
    console.error(e)
  }
}

export async function fetchUserStatus(commit) {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) commit(user)
  })
}

export async function logOut() {

  try {
    await firebase.auth().signOut()
  } catch (e) {
    console.error(e)
  }
}