import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PutUpdateUser } from '../Services/UserService';
import { toast } from 'react-toastify';

function ModalEditUser(props) {
  const { show, handleClose, dataUserEdit } = props;
  const [name, setName] = useState("");
  const [e_mail, set_e_mail] = useState("");
  const [pass_word, set_pass_word] = useState("");
  // console.log("check: ", dataUserEdit)

  const handleEditUser = async () => {
    try {
      let res = await PutUpdateUser(dataUserEdit.id,e_mail, name, pass_word)
      if (res && res.data) {
        handleClose();
        setName('');
        set_e_mail('');
        set_pass_word('');
        toast.success("Create success")
        // window.location.reload();
      } else {
        toast.error("Create success")
      }
    } catch (error) {
      toast.error("Error!")
      console.error("Error:", error)
    }
  }
  useEffect(() => {
    if (show) {
      set_e_mail(dataUserEdit.email)
      setName(dataUserEdit.username)
      set_pass_word(dataUserEdit.password)
    }
  }, [dataUserEdit])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" readOnly
                value={e_mail}
                onChange={(event) => set_e_mail(event.target.value)} />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Enter username"
                value={name}
                onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password"
                value={pass_word}
                onChange={(event) => set_pass_word(event.target.value)} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;
