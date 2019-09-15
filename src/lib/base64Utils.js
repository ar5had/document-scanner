const imageToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject()
      }
    }

    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export { imageToBase64 }
