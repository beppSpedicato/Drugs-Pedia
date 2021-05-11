import { useState } from "react";
import { Form, Nav } from "react-bootstrap";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import fetchJson from "../lib/fetchJson";

const List = () => {
  const submit = async (e) => {
    e.preventDefault();
    if (selectedItem.length) window.location.replace("/search/" + selectedItem);
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
    <div className="box">
      <Nav style={{ height: "5vh", alignContent: "center" }}>
        <Nav.Item>
          <Nav.Link href="/login">Profile</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="box centerAlignment bgcolor-secondary">
        <Form onSubmit={submit}>
          <div className="title centerAlignment">DrugsPedia</div>
          <Autocomplete
            className="centerAlignment searchForm"
            freeSolo
            autoComplete
            autoHighlight
            options={myOptions}
            renderInput={(params) => (
              <div className="input centerAlignment">
                <TextField
                  {...params}
                  onChange={changeField}
                  onSelect={changeField}
                  label="Find..."
                  style={{
                    marginLeft: "1rem",
                    marginRight: "1rem",
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-light button"
                  style={{ width: "4rem", height: "4rem" }}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            )}
          />
        </Form>
      </div>
    </div>
  );
};

export default List;

