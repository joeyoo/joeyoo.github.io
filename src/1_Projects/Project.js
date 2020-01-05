import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

export default function Project(props) {
	const {
		title,
		desc,
		note,
		src,
		link
	} = props;

	return (
    <Table.Row>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>{desc || "This is just some sample text in case I have nothing to say. I have nothing to say."}</Table.Cell>
      <Table.Cell>{note || "Note"}</Table.Cell>
      <Table.Cell selectable><a href={src} target='_blank'><Icon name='code' /></a>{link ? (<a href={src} target='_blank'><Icon name='linkify' /></a>) : ''}</Table.Cell>
    </Table.Row>
	);
}