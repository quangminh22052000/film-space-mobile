export const DEFAULT_DATEFORMAT = "MM/DD/yyyy"

export const calculateTimeLeft = (time: string) => {
  const endTime = new Date(time).getTime()
  const now = new Date().getTime()
  const difference = endTime - now

  if (difference > 0) {
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / 1000 / 60) % 60)
    const seconds = Math.floor((difference / 1000) % 60)
    return `${hours}h ${minutes}m ${seconds}s`
  } else {
    return ""
  }
}
