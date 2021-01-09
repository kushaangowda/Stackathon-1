import React, { useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";

export default function CustomModal(props) {



    return (
        <>



            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Leave Request from {props.name}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={props.handleClose}>
                        Accept
          </Button>
                    <Button variant="danger" onClick={props.handleClose}>
                        Reject
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
