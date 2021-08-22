export default function generateAuthHeader(cookieToken) {
  return { Authorization: `Basic ${cookieToken}` }
}
