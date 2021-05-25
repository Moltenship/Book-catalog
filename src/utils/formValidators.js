export const checkRating = (rule, value, callback) => {
  setTimeout(() => {
    if (value === '') callback()
    if (typeof value !== 'number') {
      callback(new Error('Rating should be a number'))
    } else {
      if (value > 10 || value < 0) {
        callback(new Error('Rating should be 0-10'))
      } else {
        callback()
      }
    }
  }, 250)
}

export const checkPublicationYear = (rule, value, callback) => {
  setTimeout(() => {
    if (value === '') callback()
    if (typeof value !== 'number') {
      callback(new Error('Publication year must be a number'))
    } else {
      const currentYear = new Date().getFullYear()
      if (value > currentYear || value < 1800) {
        callback(new Error(`Publication year must be in range of 1800-${currentYear}`))
      } else {
        callback()
      }
    }
  }, 250)
}

export const checkISBN = (rule, value, callback) => {
  const regExp = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
  setTimeout(() => {
    if (value === '') callback()
    if (regExp.test(value)) {
      callback()
    } else {
      callback(new Error('Invalid ISBN'))
    }
  }, 250)
}