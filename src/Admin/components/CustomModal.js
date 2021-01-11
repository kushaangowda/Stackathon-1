import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function CustomModal(props) {
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{props.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.body}</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={() => props.accept(props.id)}>
						Accept
					</Button>
					<Button variant="danger" onClick={() => props.reject(props.id)}>
						Reject
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
