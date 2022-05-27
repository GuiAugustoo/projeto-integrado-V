import React, { TextareaHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string;
    label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
    return (
        <div className={styles['textarea-block']}>
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest}/>
        </div>
    );
}

export default Textarea;