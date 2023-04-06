import Button from 'react-bootstrap/Button';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import VideogameCreate from '../VideogameCreate/VideogameCreate';
import "./modal.css"

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ marginTop: "15px", padding:"10px" }}
        className='Modal-a'

      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Game
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VideogameCreate />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default MyVerticallyCenteredModal;

