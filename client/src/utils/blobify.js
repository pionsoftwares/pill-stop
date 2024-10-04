export function serializeBlob(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
            const base64String = reader.result.split(',')[1]
            resolve(base64String)
        }

        reader.onerror = (error) => {
            reject(error)
        }

        reader.readAsDataURL(blob)
    })
}

export function deserializeBlob(base64String, mimeType) {
    const byteCharacters = atob(base64String)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
}

export function base64ToBlob(base64String, contentType) {
    const byteCharacters = atob(base64String)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: contentType })
}
