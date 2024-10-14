import * as Yup from "yup";

export const formValidtorSignUp = {
    email: Yup.string()
        .email("Email must be valid")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password is too short - should be 6 characters minimum.")
        .required("Password is required")
        .matches(
            /^.*(?=.{8,})(?=.*\d)((?=.*[A-Z]){1}).*$/,
            "Password must contain at least one uppercase character and one number"
        ),
    passwordConfirm: Yup.string()
        .required("Re-type password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),

    checkBox: Yup.string().required("Terms and Conditions is required"),
};
