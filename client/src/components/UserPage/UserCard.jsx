import { MoreVert } from "@mui/icons-material";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import React from "react";
import { stringAvatar } from "../../utils/avatar";

const UserCard = ({ name, subhead, action }) => {
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar
						className="account-page__avatar"
						{...stringAvatar(`${name}`)}
						style={{
							border: "2px solid white",
						}}
					/>
				}
				action={
					<IconButton aria-label="" onClick={action}>
						<MoreVert />
					</IconButton>
				}
				title={name}
				subheader={subhead}
			/>
		</Card>
	);
};

export default UserCard;
