import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
moment().format();

export class FormikDatePicker extends React.Component {
    handleChange = (val) => {
        this.props.onChange(this.props.name, val);
    };
    handleBlur = (val) => {
        this.props.onBlur(this.props.name, true);
    };

    render() {
        const { name, value, className, placeholder } = this.props;
        return (
            <>
                <DatePicker
                    id={name}
                    name={name}
                    className={className}
                    selected={value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    placeholderText={placeholder}
                    dateFormat="dd-MM-yyyy"
                    // showTimeSelect
                />
            </>
        );
    }
}
