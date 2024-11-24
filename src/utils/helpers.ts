import * as Yup from "yup";

export function prepareYupMsg(error: Yup.ValidationError): string {
    const msg = error.errors.join(", ").replace('_',' ')
    return `validation failed : ${msg}`
}
