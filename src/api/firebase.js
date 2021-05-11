import firebase from 'firebase'


export async function signInWithGoogle(commit) {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  try {
    const { user } = await firebase.auth().signInWithPopup(googleProvider)
    commit(user)
  } catch (e) {
    console.log(e)
  }
}

export async function fetchUserStatus(mutation) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) mutation(user)
  })
}