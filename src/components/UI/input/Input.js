import React from 'react';

import styles from './Input.css';

const input = ( props ) => {
    let element = null;
    const inputClasses = [styles.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) 
        inputClasses.push(styles.Invalid);

    switch (props.elementType) {
        case 'input':
            element = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                onChange={props.changed}
                value={props.value} />;
            break;

        case 'textarea':
            element = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                onChange={props.changed}
                value={props.value} />
            break;

        case 'select':
            element = (
            <select 
                className={inputClasses.join(' ')} 
                value={props.value}
                onChange={props.changed}>
                 {props.elementConfig.options.map(option => (
                     <option key={option.value} value={option.value}>{option.label}</option>
                 ))}   
            </select>);
            break;

        default:
            break;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {element}
        </div>
    );
}

export default input;