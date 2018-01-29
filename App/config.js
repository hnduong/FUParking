const apiUrl = 'https://dataservices.frogparking.com/FrogParkingService.svc'

const ApplicationId = 'CBA26D79-0BB7-4812-85FB-D1E97D4EE8CF' // Frog Parking ID for UTC

const expirationBuffer = 3600

const storageKeys = {
  User: 'FUParking_User',
  Credentials: 'FUParking_Credentials',
  Permit: 'FUParking_Permit',
  Recent: 'FUParking_Recent'
}

const root = {
  Authenticated: 'authenticated',
  Authentication: 'authentication'
}

export default {
  apiUrl,
  root,
  expirationBuffer,
  ApplicationId,
  storageKeys
}
