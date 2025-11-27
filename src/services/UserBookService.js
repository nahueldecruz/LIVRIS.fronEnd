import ENVIRONMENT from "../config/enviroment"
import { CONTENT_TYPE_VALUES, getAuthorizationHeader, HEADERS, HTTP_METHODS } from "../constants/http"

class UserBookService {

    static async setStatus({ status, bookId }) {
        const body = {
            status
        }

        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/books/${bookId}/status`,
            {
                method: HTTP_METHODS.PATCH,
                headers: {
                    [HEADERS.AUTHORIZATION]: getAuthorizationHeader(),
                    [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
                },
                body: JSON.stringify(body)
            }
        )
        
        const responseData = await responseHttp.json()

        if (!responseData.ok){
            throw responseData
        }
        
        return responseData
    }

    static async getByUserIdAndBookId(bookId) {

        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/books/${bookId}/status`,
            {
                method: HTTP_METHODS.GET,
                headers: {
                    [HEADERS.AUTHORIZATION]: getAuthorizationHeader(),
                    [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
                }
            }
        )
        
        const responseData = await responseHttp.json()

        if (!responseData.ok){
            throw responseData
        }
        
        return responseData
    }

    static async getByUserIdAndStatus({ userId, status }) {

        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/users/${userId}/books/${status}`,
            {
                method: HTTP_METHODS.GET,
                headers: {
                    [HEADERS.AUTHORIZATION]: getAuthorizationHeader(),
                    [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
                }
            }
        )
        
        const responseData = await responseHttp.json()

        if (!responseData.ok){
            throw responseData
        }
        
        return responseData
    }

    static async deleteById(statusId) {
        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/user_book/${statusId}`, {
            method: HTTP_METHODS.DELETE,
            headers: {
                [HEADERS.AUTHORIZATION]: getAuthorizationHeader(),
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            }
        })

        const responseData = await responseHttp.json()

        if(!responseData.ok){
            throw responseData
        }
        return responseData
    }
}

export default UserBookService