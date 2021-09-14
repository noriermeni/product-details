import React, {FC, useEffect, useState} from "react";
import { TabsDetails } from "../../Types/tabsDetails";
import styles from './tabs.module.scss'

interface Props {
    description: string;
    details: string;
}

const Tabs = (props: Props) => {
    const [ tabsDetails, setTabsDetails ] = useState<Array<TabsDetails>>([
        {
            id: 1,
            title: 'Description',
            content: '',
            isActive: true,
        },
        {
            id: 2,
            title: 'Details',
            content: '',
            isActive: false,
        }
    ]);

    useEffect(() => {
        let oldTabsDetails = [...tabsDetails];  
        oldTabsDetails[0].content = props.description;
        oldTabsDetails[1].content = props.details;
        setTabsDetails(oldTabsDetails)
    }, [props.description, props.details])

    const changeTabToActive = (id: number) => {
        let oldTabsDetails = [...tabsDetails];
        oldTabsDetails.map(tab => tab.id === id ? 
            tab.isActive = false : tab.isActive = true
        ); 
        setTabsDetails(oldTabsDetails);
    }

    return <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
            {React.Children.toArray(tabsDetails && tabsDetails.map(tab => <div>
                {tab.isActive ? 
                    <div onClick={() => changeTabToActive(tab.id)} 
                         className={styles.tabsTitle}>{tab.title}</div>
                    :
                    <div className={styles.tabsTitleActive}>{tab.title}</div>}
                </div>
            ))}
        </div>
        <div className={styles.tabContent}>
            {React.Children.toArray(tabsDetails && tabsDetails.map(tab => tab.isActive &&
                <div>{tab.content}</div>
            ))}
        </div>
    </div>
}

export default Tabs;