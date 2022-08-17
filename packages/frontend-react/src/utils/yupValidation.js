import * as yup from 'yup'

const required = (validator,field) =>{
    return validator.required(`${field?field+':':'Это'} обязательное поле`)
}

export const emailValidator = (isRequired,field) =>{
    const validator = yup.string().email('Invalid email')
    return isRequired?required(validator,field):validator
}

export const passwordValidator = (isRequired,field) =>{
    const validator = yup.string().required('Requ').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,"Минимум 8 символов, хотя бы одна заглавная, строчная и цифра")
    return isRequired?required(validator,field):validator
}

export const phoneValidator = (isRequired,field)=>{
    const validator = yup.string().min(13,'Не правильный номер').matches(/^(\s*)?(\+)?([- ():=+]?\d[- ():=+]?){10,14}(\s*)?$/,'Не правильный номер')
    return isRequired?required(validator,field):validator
}

export const stringValidator = (isRequired, field) =>{
    const validator = yup.string()
    return isRequired?required(validator,field):validator
}