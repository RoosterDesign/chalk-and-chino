import { forwardRef } from 'react';

import styles from './form-input.module.scss';

type FormInputProps = {
    error?: string;
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    required?: boolean;
    type: 'text' | 'textarea';
    value: string;
};

const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
    ({ label, name, placeholder, required, type, value, onChange, error }, ref) => {
        return (
            <div className={styles.formInput}>
                <label htmlFor={name}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
                {type === 'text' ? (
                    <input
                        id={name}
                        name={name}
                        onChange={onChange}
                        placeholder={placeholder}
                        ref={ref as React.RefObject<HTMLInputElement>}
                        required={required}
                        type="text"
                        value={value}
                    />
                ) : (
                    <textarea
                        id={name}
                        name={name}
                        onChange={onChange}
                        placeholder={placeholder}
                        ref={ref as React.RefObject<HTMLTextAreaElement>}
                        required={required}
                        value={value}
                    />
                )}
                {error && <span className={styles.error}>{error}</span>}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';

export default FormInput;
