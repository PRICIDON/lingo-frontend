import React from 'react'
import {
	Datagrid,
	List,
	NumberField,
	ReferenceField,
	TextField
} from 'react-admin'

export default function LessonList() {
	return (
		<List>
			<Datagrid rowClick="edit">
				<NumberField source="id"/>
				<TextField source="title"/>
				<ReferenceField source="unitId" reference="units"/>
				<NumberField source="order"/>
			</Datagrid>
		</List>
	)
}
