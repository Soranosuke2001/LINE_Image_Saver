function checkURLEncoding(value: string): boolean {
  try {
    const decoded_value = decodeURIComponent(value)
    const encoded_value = encodeURIComponent(decoded_value)

    return encoded_value === value
  } catch (error) {
    console.log(error)
    return false
  }
}

export function convertString(value: string | undefined): string {
  if (!value) {
    return ''
  }
  
  if (checkURLEncoding(value)) {
    return decodeURIComponent(value)
  }

  return value
}