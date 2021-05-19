import { db } from './firebase'

const booksCollection = db.collection('books')

export async function fetchBooks() {
  const books = (await booksCollection.get()).docs.map((doc) => {
    const data  = doc.data()
    const id = doc.id
    return { id, ...data }
  })
  window.books = books
  return books
}