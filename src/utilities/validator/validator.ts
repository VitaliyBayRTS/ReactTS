export const required = (value: any) => {
    if(value) return undefined;
    return "Field is required"
}

export const maxLength = (length: number) => (value: any) => {
    if(value.length > length) return `Max length is ${length} symbols`;
    return undefined;
}