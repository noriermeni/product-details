import React from "react";
import styles from "./price.module.scss";
import classNames from "classnames";

interface Props {
    regularPrice: string | number | undefined;
    retailPrice?: string | number | undefined;
    fontSize?: 'lg' | 'md' | 'sm'
}

export function Price(props: Props) {
    return <div className={classNames({
        [styles.largeSize]: props.fontSize === 'lg',
        [styles.mediumSize]: props.fontSize === 'md' || !props.fontSize,
        [styles.smallSize]: props.fontSize === 'sm',
    })}>
        {props.retailPrice ? <>
                <span className={classNames({
                    [styles.retailPrice]: true,
                })}>${props.retailPrice}</span>
                <span className={classNames({
                    [styles.regularPrice]: true,
                })}>${props.regularPrice}</span>
            </> : <span className={classNames({
            [styles.retailPrice]: true,
        })}>${props.regularPrice}</span>
        }
    </div>;
}