export const checkRating = (rule, value, callback) => {
  setTimeout(() => {
    if (!Number.isInteger(value)) {
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
    if (!Number.isInteger(value)) {
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