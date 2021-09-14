import React from "react";
import classNames from "classnames";
import styles from './productDescription.module.scss';

interface Props {
    text: string | undefined;
    cutText?: boolean;
    fontSize?: 'lg' | 'md' | 'sm';
}

export function ProductDescription(props: Props) {
    return <p title={props.text}
        className={classNames({
            [styles.description]: true,
            [styles.cutText]: props.cutText,
            [styles.largeFont]: props.fontSize === 'lg',
            [styles.mediumFont]: props.fontSize === 'md',
            [styles.smallFont]: props.fontSize === 'sm',
    })}>{props.text}</p>;
}