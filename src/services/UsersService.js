import ENVIRONMENT from "../config/enviroment"
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"

class UsersService {
    static async getById(userId) {
        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/users/${userId}`,
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
}

export default UsersService