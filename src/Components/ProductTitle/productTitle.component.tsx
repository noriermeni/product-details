import React from "react";
import classNames from "classnames";
import styles from './productTitle.module.scss';

interface Props {
    text: string | undefined;
    fontSize?: 'lg' | 'md' | 'sm'
}

export function ProductTitle(props: Props) {
    return <h2 className={classNames({
        [styles.title]: true,
        [styles.largeFont]: props.fontSize === 'lg',
        [styles.mediumFont]: props.fontSize === 'md',
        [styles.smallFont]: props.fontSize === 'sm',
    })}>{props.text}</h2>;
}