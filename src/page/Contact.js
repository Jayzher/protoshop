import '../components/comp.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import UserContext from '../userContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';


export default function Contact() {

  const {user, setUser} = useContext(UserContext);

	useEffect(() => {
		document.getElementById("sideNav").style.display = "flex";
		document.getElementById("sideNav").style.height = "100vh";
		document.getElementById("sideNav").style.marginTop = "92vh";

    if (user.id !== null && user.id !== undefined) {
        document.getElementById("topNav").style.display = "none";
      } else {
        <Navigate to="/Logout" />
      }
	})

	return (
    <Container style={{height: "92vh"}}>
      <div style={{marginTop: "0vh", marginBottom: "3vh"}} className="d-flex text-center flex-row justify-content-center">
		<Form style={{background: "rgba(0, 0, 0, 0.2)", width: "30vw"}}
			 className="col-3 p-5 m-5 d-flex flex-column align-items-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control style={{width: "20vw"}} type="text" placeholder="Enter Name" />
          </Form.Group>
           <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control style={{width: "20vw"}} type="number" placeholder="" />
          </Form.Group>
           <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control style={{width: "20vw"}} type="email" placeholder="Enter Email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Message</Form.Label>
            <Form.Control style={{height: "20vh", width: "20vw", resize: "none"}} as="textarea" aria-label="Enter your Concerns"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}