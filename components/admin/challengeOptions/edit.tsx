import React from 'react'
import {
	SimpleForm,
	Edit,
	TextInput,
	required,
	ReferenceInput,
	BooleanInput
} from 'react-admin'

export default function ChallengeOptionEdit() {
	return (
		<Edit>
			<SimpleForm>
				<TextInput source="text" validate={[required()]} label="Text"/>
				<BooleanInput source="correct" validate={[required()]} label="Correct option"/>
				<ReferenceInput source="challengeId" reference="challenges" />
				<TextInput source="imageSrc" label="Image"/>
				<TextInput source="audioSrc" label="Audio"/>
			</SimpleForm>
		</Edit>
	)
}
