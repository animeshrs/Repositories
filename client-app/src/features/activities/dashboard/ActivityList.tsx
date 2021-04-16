/** @format */

import { Button, ButtonGroup, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
	activities: Activity[];
	selectActivity: (id: string) => void;
	deleteActivity: (id: string) => void;
}

const ActivityList = ({
	activities,
	selectActivity,
	deleteActivity,
}: Props) => {
	return (
		<Segment>
			<Item.Group divided>
				{activities.map((activity) => (
					<Item key={activity.id}>
						<Item.Content>
							<Item.Header as="a">{activity.title}</Item.Header>
							<Item.Meta>{activity.date}</Item.Meta>
							<Item.Description>
								<div>{activity.description}</div>
								<div>
									{activity.city},{activity.venue}
								</div>
							</Item.Description>
							<Label basic content={activity.category} />
							<Item.Extra>
								<ButtonGroup floated="right" widths="2">
									<Button
										widths="1"
										basic
										onClick={() => selectActivity(activity.id)}
										content="View"
										color="blue"
									/>
									<Button
										widths="1"
										negative
										onClick={() => deleteActivity(activity.id)}
										content="Delete"
										color="red"
									/>
								</ButtonGroup>
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
};

export default ActivityList;
