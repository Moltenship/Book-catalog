import { db } from './firebase'

const booksCollection = db.collection('books')

export async function fetchBooks() {
  const books = (await booksCollection.get()).docs.map(doc => doc.data())
  return books
}