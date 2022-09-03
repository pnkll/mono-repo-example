import React from 'react';
import CardGridLayout from '../../page_layouts/CardLayout/CardGridLayout/CardGridLayout.jsx';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import moment from 'moment'

export default React.memo(function Profile(){
    const formatDate = (date) =>{
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const arr=[
        //{label: "_id", value: "631150279f0454d9d3c6f7b2"},
		{label: "Username", value: "test999"},
		{label: "Firstname", value: "Test999"},
		{label: "Lastname", value: "999Test"},
		{label: "Inn", value: "2124040602"},
		//{label: "idd", value: "+7"},
		{label: "Phone", value: 9613639666},
		{label: "Verified email", value: 'false'},
		{label: "Email", value: "test999@gmail.com"},
		{label: "Created At", value: formatDate("2022-09-02T00:36:55.765Z")},
		{label: "Updated At", value: formatDate("2022-09-02T00:36:55.765Z")},
		//{label: "uuid", value: 5},
        //{label: "shortname", value: "id5"},
    ]
   return(
       <>
       <SidebarHeaderLayout>
        <CardLayout title={'Сотрудник'}>
            <CardGridLayout array={arr}>
            </CardGridLayout>
        </CardLayout>
       </SidebarHeaderLayout>
       </>
   )
})