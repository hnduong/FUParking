import axios from 'axios'
import config from '../config'

const { apiUrl } = config

const api = axios.create({ baseURL: `${apiUrl}` })

api.interceptors.response.use((response) => {
  if (response.status > 299) {
    response.ok = false
  } else {
    response.ok = true
  }
  return response
})

/**
 *
  {
    "ApplicationId": "CBA26D79-0BB7-4812-85FB-D1E97D4EE8CF",
    "UID": "user@email.com",
    "Password": "password",
    "ApplicationDetails": "null"
  }
 *
 *
  {
    "Success": true,
    "Errors": [],
    "SID": "WqFJmMgAMQeEm_PGLjNvdOrNEO3HP4Nt1jpI500lfmtDZZ3O70ccYMuaj2z1toNuXh-IDNgg4GOAQsN5Fm4q7A",
    "ExpiresOn": "/Date(1516396802034)/",
    "UserRoles": [
        "public-user"
    ],
    "OrganizationId": "5a6b16a7-340a-40d9-9426-08e692b8177a",
    "AlternativeAccounts": null,
    "CustomFields": [],
    "ExternalProviderKey": null
  }
 */
const authorize = ({ ApplicationId = config.ApplicationId, UID, Password, ApplicationDetails }) =>
  api.post('/Authorize', { ApplicationId, UID, Password, ApplicationDetails })

const getPublicUserAccountsDetails = ({ SID, ApplicationDetails }) =>
  api.post('/GetPublicUserAccountDetails', { SID, ApplicationDetails })

export default {
  authorize,
  getPublicUserAccountsDetails
}
