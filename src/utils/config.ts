export const isMobile = () => {
  const ua = navigator.userAgent
  if (ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1 || ua.indexOf('Android') !== -1) {
    return true
  }
  return false
}

export const isiOS = () => {
  const ua = navigator.userAgent
  if (ua.indexOf('iPhone') !== -1) {
    return true
  }
  return false
}

export const isChrome = () => {
  const ua = navigator.userAgent
  if (ua.indexOf('Chrome') !== -1 || ua.indexOf('CriOS') !== -1 || ua.indexOf('GSA') !== -1) {
    return true
  }
  return false
}
