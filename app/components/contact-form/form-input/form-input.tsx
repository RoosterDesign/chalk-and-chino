import styles from './form-input.module.scss';

type FormInputType = {
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
    type: "text" | "textarea";
}

const FormInput: React.FC<FormInputType> = ({ label, name, placeholder, required, type }) => {
    return (
        <div className={styles.formInput}>
            <label htmlFor={name}>{label}{required && <span className={styles.required}>*</span>}</label>
            {
                type === "text" ?
                    <input name={name} placeholder={placeholder} required={required} type="text" />
                    :
                    <textarea name={name} placeholder={placeholder} required={required}></textarea>
            }
        </div >
    )
}

export default FormInput;
