import { Form, Nav, Button } from "react-bootstrap";
import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";

export default () => {
  const { mutateUser } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // Get form data
    let email = e.currentTarget.email.value;
    let password = e.currentTarget.password.value;

    const body = {
      email: email,
      password: password,
    };
    fetchJson("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(() => mutateUser())
      .catch((err) => {});
  }

  return (
    <div>
      <Nav style={{ height: "5vh", alignContent: "center" }}>
        <Nav.Item>
          <Nav.Link href="/signup">Sign up</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="box bgcolor-secondary">
        <Form onSubmit={handleSubmit} style={{  padding: "1rem"  }}>
          <Form.Group >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              id="email"
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control             
              name="password"             
              id="password"             
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
};
