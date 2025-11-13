import { useState } from "react"

const useForm = ({ initialFormState, onSubmit }) => {
    const [ formState, setFormState ] = useState(initialFormState)

    const handleInputChange = (event) => {
        setFormState(
            (currentFormState) => {
                const fieldName = event.target.name
                const fieldValue = event.target.value
                return {...currentFormState, [fieldName]: fieldValue }
            }
        )
    } 

    const setFormField = (fieldName, fieldValue) => {
        setFormState((currentFormState) => ({
            ...currentFormState,
            [fieldName]: fieldValue,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(formState)
    }

    return {
        formState,
        handleInputChange,
        handleSubmit,
        setFormField
    }
}

export default useForm