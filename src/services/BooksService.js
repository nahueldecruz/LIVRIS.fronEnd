import ENVIRONMENT from "../config/enviroment"
import { CONTENT_TYPE_VALUES, getAuthorizationHeader, HEADERS, HTTP_METHODS } from "../constants/http"

class BooksService {
    static async getAll({ page }) {
        const maxResults = 9

        const responseHttp = await fetch(`
            ${ENVIRONMENT.URL_API}/api/books?page=${page}&maxResults=${maxResults}
        `,
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

    static async getByQuery({ query, page = 1 }) {
        const maxResults = 9
        
        const responseHttp = await fetch(`
                ${ENVIRONMENT.URL_API}/api/books/search?q=${encodeURIComponent(query)}&page=${page}&maxResults=${maxResults}
            `,
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

    static async getById(bookId) {
        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/books/${bookId}`,
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
    
    static async save(book) {
        const body = {
            book
        }

        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/books/save-book`, {
                method: HTTP_METHODS.POST,
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
}

export default BooksService