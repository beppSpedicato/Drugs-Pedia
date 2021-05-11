import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { Nav, Card, Button, Form } from "react-bootstrap";
import toDateTime from "../../lib/toDateTime";
import fetchJson from "../../lib/fetchJson";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export default () => {
  const router = useRouter();
  const { search } = router.query;

  const { data, error } = useSWR("/api/data/pages?search=" + search);

  const submit = async (e) => {
    e.preventDefault();
    if(selectedItem.length)
      window.location.replace("/search/" + selectedItem);
  };

  const [myOptions, setMyOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const changeField = (data) => {
    setSelectedItem(data.target.value);
    fetchJson("/api/data/pages?count=10&search=" + data.target.value, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        myOptions.splice(0, myOptions.length);
        for (var i of data) myOptions.push(i.title);
        setMyOptions(myOptions);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Nav style={{ height: "5vh", alignContent: "center" }}>
        <Nav.Item>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <Form onSubmit={submit} style={{ marginBottom: '1rem' }}>
        <Autocomplete
          freeSolo
          autoComplete
          autoHighlight
          options={myOptions}
          renderInput={(params) => (
            <div
              style={{
                width: "90vw",
                display: "flex",
                backgroundColor: "white",
                padding: "2px",
                borderRadius: "1rem 0rem 0rem 0rem",
              }}
            >
              <TextField
                {...params}
                onChange={changeField}
                onSelect={changeField}
                label="Find..."
                style={{
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  borderColor: "white",
                }}
                value={search}
              />

              <Button variant="primary" type="submit">
                <i className="fas fa-search"></i>
              </Button>
            </div>
          )}
        />
      </Form>
      <div className="box bgcolor-secondary">
        <div>
          {data && data.length && !error
            ? data.map((item) => {
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
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};
