import React from 'react'
import {
	Datagrid,
	List,
	NumberField,
	ReferenceField,
	TextField
} from 'react-admin'

export default function UnitList() {
	return (
		<List>
			<Datagrid rowClick="edit">
				<NumberField source="id"/>
				<TextField source="title"/>
				<TextField source="description"/>
				<ReferenceField source="courseId" reference="courses"/>
				<TextField source="order"/>
			</Datagrid>
		</List>
	)
}
