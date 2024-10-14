import * as Yup from 'yup';

export const SignInValidation = Yup.object().shape({
    password: Yup.string()
        .required("Password can't be blank")
        .min(2, 'Password should atleast 2 char!')
        .max(50, 'Password should maximum x char Long!'),
    emailAddress: Yup.string()
        .email('Email should be in format')
        .required("Email can't be blank"),
});
