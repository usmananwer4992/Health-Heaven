import { useEffect } from 'react';
// import classnames from 'classnames';
import { Form } from 'react-bootstrap';
// import FormControl from 'react-bootstrap/FormControl';
import './formik.css';
export const InputFeedback = ({ error }) =>
    error ? <div className="input-feedback">{error}</div> : null;

// const Label = ({ error, className, children, ...props }) => {
// 	return (
// 		<Form.Label className="label" {...props}>
// 			{children}
// 		</Form.Label>
// 	);
// };

export const MyTextField = ({
                                placeholder,
                                inputType,
                                fieldName,
                                onChange,
                                serverError,
                                errors,
                                inputValue,
                                fieldTouch,
                                setServerErrors,
                                apiErrors,
                                handleChange,
                                disabled,
                                style,
                                min,
                                label,
                                required,
                                fieldIcon,
                                groupClasses,
                                inputClasses,
                                labelClasses,
                            }) => {
    const customHandle = (handleChange, type, e, apiErrors) => {
        console.log('inputType', inputType);
        // call the built-in handleBur
        handleChange(e);
        if (apiErrors) {
            // and do something about e
            RemoverServerErrors(serverError, setServerErrors, type);
        }
    };
    const RemoverServerErrors = (serverError, setServerErrors, fieldName) => {
        delete serverError[fieldName];
        setServerErrors(serverError);
    };
    // const classes = classnames({
    // 	' error': !!(errors[fieldName] || serverError[fieldName]),
    // });

    useEffect(() => {
        // console.log({ serverError });
        // console.log(serverError.email);
    }, [serverError]);

    return (
        <>
            <Form.Group className={`mb-3  position-relative ${groupClasses}`}>
                <Form.Label className={labelClasses}>
                    {label} {required === true && <span style={{ color: 'red' }}>*</span>}
                </Form.Label>
                {inputType === 'textarea' ? (
                    <Form.Control
                        as="textarea"
                        rows={3}
                        autoomplete={'off'}
                        name={fieldName}
                        id={fieldName}
                        type={inputType}
                        value={inputValue}
                        onChange={(e) => {
                            customHandle(handleChange, fieldName, e, apiErrors);
                        }}
                        placeholder={placeholder}
                        className={`
						${inputClasses}
						${
                            fieldTouch && errors
                                ? 'input-field-error'
                                : serverError && serverError[fieldName]
                                    ? 'input-field-error'
                                    : 'input-field'
                        }`}
                        disabled={disabled}
                        style={style}
                        min={min}
                    />
                ) : (
                    <Form.Control
                        autoomplete={'off'}
                        name={fieldName}
                        id={fieldName}
                        type={inputType}
                        value={inputValue}
                        onChange={(e) => {
                            customHandle(handleChange, fieldName, e, apiErrors);
                        }}
                        placeholder={placeholder}
                        className={`
						${inputClasses}
						${
                            fieldTouch && errors
                                ? 'input-field-error'
                                : serverError && serverError[fieldName]
                                    ? 'input-field-error'
                                    : 'input-field'
                        }`}
                        disabled={disabled}
                        style={style}
                        min={min}
                    />
                )}
                {fieldIcon && (
                    <span className="field-icon">
						<img src={fieldIcon} alt={fieldName} />
					</span>
                )}
                {fieldTouch && errors && <div className="error-text">{errors}</div>}
                {serverError && serverError[fieldName] && (
                    <div className="error-text">{serverError[fieldName]}</div>
                )}
            </Form.Group>
        </>
    );
};
