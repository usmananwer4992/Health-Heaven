import Select from 'react-select';

export const FormikReactSelect = (props) => {
    const handleChange = (value) => {
        props.onChange(props.name, value);
    };
    const handleBlur = () => {
        props.onBlur(props.name, true);
    };
    const style = {
        control: (base, state) => ({
            ...base,
            border: props.errors ? '1px solid red' : '1px solid #3c36a0',
            backgroundColor: 'white',
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            '&:hover': {
                border: props.errors ? '1px solid red' : '1px solid #3c36a0',
                backgroundColor: 'white',
                cursor: 'pointer',
            },
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: props.errors ? 'red' : '#3C36A0', // Custom colour
            '&:hover': {
                color: props.errors ? 'red' : '#3C36A0',
                cursor: 'pointer',
            },
        }),
        // option: provided => ({
        //     ...provided,
        //     color: '#9E9BD0'
        // }),
        // control: provided => ({
        //     ...provided,
        //     color: '#9E9BD0'
        // }),
        singleValue: (provided) => ({
            ...provided,
            color: '#716ea3',
        }),
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: '#9e9bd0',
            };
        },
    };
    return (
        <>
            <Select
                className="custome-select"
                styles={style}
                options={props.options}
                isMulti={props.isMulti}
                onChange={handleChange}
                onBlur={handleBlur}
                value={props.value}
                noOptionsMessage={() => 'No result found'}
                touched={props.touched}
                placeholder={props.placeholder}
                isDisabled={props.disabled}
                components={{
                    IndicatorSeparator: () => null,
                }}

                // isClearable={true}
            />
        </>
    );
};
