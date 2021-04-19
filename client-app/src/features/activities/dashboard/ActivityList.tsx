/** @format */

import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, ButtonGroup, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ActivityList = () => {
	const { activityStore } = useStore();

	const { deleteActivity, activitiesByDate, loading } = activityStore;

	const [target, setTarget] = useState("");

	function handleActivityDelete(
		e: SyntheticEvent<HTMLButtonElement>,
		id: string
	) {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	}

	return (
		<Segment>
			<Item.Group divided>
				{activitiesByDate.map((activity) => (
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
										as={NavLink}
										to={`/activities/${activity.id}`}
										widths="1"
										basic
										content="View"
										color="blue"
									/>
									<Button
										name={activity.id}
										widths="1"
										loading={loading && target === activity.id}
										negative
										onClick={(e) => handleActivityDelete(e, activity.id)}
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

export default observer(ActivityList);
