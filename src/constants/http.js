import LOCAL_STORAGE_KEYS from "./localStorage"

export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

export const HEADERS = {
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: 'Authorization'
}

export const CONTENT_TYPE_VALUES = {
    JSON: 'application/json'
}

export function getAuthorizationHeader() {
    const authorizationToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHORIZATION_TOKEN)
    return `Bearer ${authorizationToken}`
}