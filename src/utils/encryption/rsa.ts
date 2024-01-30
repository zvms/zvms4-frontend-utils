import JSEntrypt from 'jsencrypt'

export function generatePayload(password: string) {
  return JSON.stringify({
    password,
    timestamp: Date.now()
  })
}

export function encrypt(payload: string, publicKey: string) {
  const encryptor = new JSEntrypt()
  encryptor.setPublicKey(publicKey)
  const credential = encryptor.encrypt(payload)
  return credential
}

export function encryptPassword(password: string, publicKey: string) {
  const payload = generatePayload(password)
  const credential = encrypt(payload, publicKey)
  return credential
}
