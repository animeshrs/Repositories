/** @format */

import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import {
	Button,
	ButtonGroup,
	Card,
	Grid,
	Header,
	Image,
	Tab,
} from "semantic-ui-react";
import PhotoWidgetUpload from "../../app/common/imageUpload/PhotoWidgetUpload";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
	profile: Profile;
}

function ProfilePhotos({ profile }: Props) {
	const {
		profileStore: {
			isCurrentUser,
			uploadPhoto,
			uploading,
			loading,
			setMainPhoto,
			deletePhoto,
		},
	} = useStore();
	const [addPhotoMode, setAddPhotoMode] = useState(false);
	const [target, setTarget] = useState("");

	function handlePhotoUpload(file: Blob) {
		uploadPhoto(file).then(() => setAddPhotoMode(false));
	}

	function handleSetMainPhoto(
		photo: Photo,
		e: SyntheticEvent<HTMLButtonElement>
	) {
		setTarget(e.currentTarget.name);
		setMainPhoto(photo);
	}

	function handleDeletePhoto(
		photo: Photo,
		e: SyntheticEvent<HTMLButtonElement>
	) {
		setTarget(e.currentTarget.name);
		deletePhoto(photo);
	}

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header icon="image" content="Photos" floated="left" />
					{isCurrentUser && (
						<Button
							floated="right"
							basic
							content={addPhotoMode ? "Cancel" : "Add Photo"}
							onClick={() => setAddPhotoMode(!addPhotoMode)}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{addPhotoMode ? (
						<PhotoWidgetUpload
							uploadPhoto={handlePhotoUpload}
							loading={uploading}
						/>
					) : (
						<Card.Group itemsPerRow={5}>
							{profile.photos?.map((photo) => (
								<Card key={photo.id}>
									<Image src={photo.url} />
									{isCurrentUser && (
										<ButtonGroup fluid widths={2}>
											<Button
												basic
												color="green"
												content="Main"
												name={"main" + photo.id}
												disabled={photo.isMain}
												loading={target === "main" + photo.id && loading}
												onClick={(e) => handleSetMainPhoto(photo, e)}
											/>
											<Button
												basic
												color="red"
												icon="trash"
												loading={target === photo.id && loading}
												onClick={(e) => handleDeletePhoto(photo, e)}
												disabled={photo.isMain}
												name={photo.id}
											/>
										</ButtonGroup>
									)}
								</Card>
							))}
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
}

export default observer(ProfilePhotos);