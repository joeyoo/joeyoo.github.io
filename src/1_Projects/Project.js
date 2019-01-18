import React from 'react';
import { Container, Header, Item, Icon} from 'semantic-ui-react';

export default function Project(props) {
	const {
		title,
		desc,
		thumb,
		link
	} = props;

	return (
    <Item>
      <Item.Content>
    		<Item.Header as='p'>{title}</Item.Header>
 				<Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
        <Item.Description>
          <p>{desc || "This is just some sample text in case I have nothing to say. I have nothing to say."}</p>
          <a href={link}>Source <Icon name='code' /></a>
        </Item.Description>
      </Item.Content>
    </Item>
	);
}