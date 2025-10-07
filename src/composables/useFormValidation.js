import { useForm, useField } from "vee-validate";
import * as yup from "yup";


export function useFormValidation(schemaDefinition){
    //Define o schema yup.
    const schema = yup.object(schemaDefinition)

    //Cria o contexto do formulário.
    const { handleSubmit, resetForm, errors} = useForm({
        validationSchema: schema,
    })

    //Cria campos reativos com value e errorMessage
    const createField = (name) => {
        const { value, errorMessage } = useField(name, undefined, {
            validateOnMount: false,
        })
        return { value, errorMessage }
    }

    return {
        handleSubmit,
        resetForm,
        errors,
        createField
    }
}