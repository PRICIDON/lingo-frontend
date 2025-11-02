import React from 'react'
import {
	SimpleForm,
	Edit,
	TextInput,
	required,
	ReferenceInput, NumberInput
} from 'react-admin'

export default function UnitEdit() {
	return (
		<Edit>
			<SimpleForm>
				<TextInput source="title" validate={[required()]} label="Title"/>
				<TextInput source="description" validate={[required()]} label="Description"/>
				<ReferenceInput source="courseId" reference="courses" />
				<NumberInput source="order" validate={[required()]} label="Order"/>
			</SimpleForm>
		</Edit>
	)
}
