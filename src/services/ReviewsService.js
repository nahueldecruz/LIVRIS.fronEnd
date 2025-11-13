import ENVIRONMENT from "../config/enviroment"
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"

class ReviewsService {

    static async getByBookId(bookId) {
        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/reviews/book/${bookId}`,
            {
                method: HTTP_METHODS.GET,
                headers: {
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

    static async getByUserId(userId) {
        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/reviews/user/${userId}`,
            {
                method: HTTP_METHODS.GET,
                headers: {
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

    static async getByUserIdAndBookId({ userId, bookId }) {
        
        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/reviews/${userId}/${bookId}`,
            {
                method: HTTP_METHODS.GET,
                headers: {
                    [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
                }
            }
        )

        const responseData = await responseHttp.json()

        if (!responseData.ok) {
            throw responseData
        }

        return responseData
    }

    static async create({ userId, bookId, rating, content }) {
        const review = {
            user_id: userId,
            book_id: bookId,
            rating: rating,
            content: content
        }

        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/reviews/new-review`, {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(review)
        })
        const responseData = await responseHttp.json()
        console.log(responseData)

        if(!responseData.ok){
            throw responseData
        }
        console.log(responseData)
        return responseData
    }
}

export default ReviewsService