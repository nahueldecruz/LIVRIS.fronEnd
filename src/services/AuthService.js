import ENVIRONMENT from '../config/enviroment.js'
import { HTTP_METHODS, HEADERS, CONTENT_TYPE_VALUES } from '../constants/http.js'

class AuthService {
    static async register ({ name, email, password }) {
        const user = {
            email,
            name,
            password
        }

        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/auth/register`, {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(user)
        })
        
        const responseData = await responseHttp.json()
        if(!responseData.ok){
            throw responseData
        }
        return responseData
    }

    static async login ({ email, password }) {
        const user = {
            email,
            password
        }

        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/auth/login`, {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            },
            body: JSON.stringify(user)
        })

        const responseData = await responseHttp.json()

        if(!responseData.ok){
            throw responseData
        }
        return responseData
    }
    
    static async forgotPassword({ email }) {
        const body = {
            email: email
        }
        
        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/auth/forgot-password`, {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            },
            body: JSON.stringify(body)
        })

        const responseData = await responseHttp.json()

        if(!responseData.ok){
            throw responseData
        }
        return responseData
    }

    static async resetPassword({ newPassword, confirmPassword }, resetToken) {
        const body = {
            "newPassword": newPassword,
            "confirmPassword": confirmPassword
        }
        
        const responseHttp = await fetch(`${ENVIRONMENT.URL_API}/api/auth/reset-password/${resetToken}`, {
            method: HTTP_METHODS.PUT,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            },
            body: JSON.stringify(body)
        })

        const responseData = await responseHttp.json()

        if(!responseData.ok){
            throw responseData
        }
        return responseData
    }
}

export default AuthService