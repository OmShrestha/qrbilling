import { Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import styles from './Tab.style';

const Tab = () => {
    const classes = styles();
    const [value, setValue] = useState(0);
    const [menuList, setMenuList] = useState({});

    function a11yProps(index) {
        return {
            id: `scrollable-prevent-tab-${index}`,
            "aria-controls": `scrollable-prevent-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // async function fetchData() {
    //     const res = await fetch(
    //         API_BASE +
    //         `company/${props.match.params.id}/menu?asset=` +
    //         query.get("table_no")
    //     );
    //     res
    //         .json()
    //         .then((res) => setMenuList(res))
    //         .catch((err) => setErrors(err));
    // }
    return (
        <Tabs
            indicatorColor='white'
            className={classes.root}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
        >
            {menuList &&
                menuList.data &&
                menuList.data.menu.map((menuData, index) => (
                    <Tab
                        label={menuData.category_name}
                        {...a11yProps(index)}
                        key={index}
                    />
                ))}
        </Tabs>
    )
}

export default Tab
