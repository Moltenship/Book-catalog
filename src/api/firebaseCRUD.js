import { db } from './firebase'

const booksCollection = db.collection('books')

export function createId() {
  return db.collection('_').doc().id
}

export async function fetchBooks() {
  const books = (await booksCollection.get()).docs.map((doc) => {
    const data  = doc.data()
    const id = doc.id
    return { id, ...data }
  })
  window.books = books
  return books
}

export async function setBook(bookData) {
  booksCollection.doc(bookData.id).set(bookData)
}

export async function deleteBookById(bookId) {
  booksCollection.doc(bookId).delete()
}

