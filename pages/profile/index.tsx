import useUser from "../../lib/useUser";
import { Nav, Card, Button} from "react-bootstrap";
import useSWR from 'swr';
import toDateTime from '../../lib/toDateTime';

export default () => {
  const { mutateUser } = useUser({
    redirectTo: "/login",
    redirectIfFound: false,
  });

  const userdata = useSWR('/api/data/user');

  const { data, error } = useSWR('/api/data/pages/self');

  return (
    <div>
      <Nav style={{ height: "5vh", alignContent: "center" }}>
        <Nav.Item>
          <Nav.Link href="/api/logout">Logout</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/profile/createPage">Create Page</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="box bgcolor-secondary">
        <div>
          {
          data && data.length && !error? 
            data.map((item) => {
              return (
                <div style={{ padding: "1rem" }}>
                  <Card style={{ color: "black" }}>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>
                        Data:{" "}
                        {toDateTime(item.timestamp.seconds).toDateString()}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() =>
                          window.location.replace("/page/" + item.id)
                        }
                      >
                        Show
                      </Button>
                      <Button
                        style={{ marginLeft: "1rem" }}
                        variant="primary"
                        onClick={() =>
                          window.location.replace("/page/modify/" + item.id)
                        }
                      >
                        Modify
                      </Button>
                      <Button
                        style={{ marginLeft: "1rem" }}
                        variant="danger"
                        onClick={() =>
                          confirm("Sei sicuro?")
                            ? window.location.replace(
                                "/api/data/pages/delete/" + item.id
                              )
                            : null
                        }
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            }
          ) : ""
        }</div>
      </div>
    </div>
  );
};