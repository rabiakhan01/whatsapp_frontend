export type CountryType = {
    code: string,
    flag: string,
    name: string
}

export type PhoneDataType = {
    phone: string,
    country: CountryType
}

export type StepPhonePropsType = {
    onNext: (data: PhoneDataType) => void
}

export type StepOtpPropsType = {
    data: PhoneDataType
    onNext: () => void
}
export type StepProfilePropsType = {
    onNext: (name: string) => void
}
export type StepSuccessPropsType = {
    name: string
}