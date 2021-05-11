import useUser from "../../../lib/useUser";
import { Nav, Button, Dropdown, Form } from "react-bootstrap";
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from "react-hook-form";
import fetchJson from "../../../lib/fetchJson";
import conf_errors from "../../../app_config/error.json"

export default () => {
  const { mutateUser } = useUser({
    redirectTo: "/login",
    redirectIfFound: false,
  });

  const editorRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const submit = (data) => {
	  if(errors.title) {
		alert('Inserisci il titolo per continuare');
		return;
	  }
	  if (editorRef.current) {
		fetchJson("/api/data/pages/create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: editorRef.current.getContent(),
				title: data.title,
				category: ""
			}),
		  })
			.then((value) => window.location.replace("/profile"))
			.catch(
			  (err) => alert(
				conf_errors[err.data.statusText || 'generic'] || conf_errors.generic
			  )
			);
	  }
  }

  return (
    <div>
      <Nav style={{ height: "5vh", alignContent: "center" }}>
        <Nav.Item>
          <Nav.Link href="/api/logout">Logout</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <Form onSubmit={handleSubmit(submit)} style={{ marginLeft: "1rem" }}>
        <Form.Group style={{ display: "flex" }}>
          <Form.Control
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            {...register("title", {
              required: "Please enter an title",
            })}
            style={{
              width: "70vw",
              marginRight: "1rem",
            }}
          />
          <Button type="submit">Add</Button>
        </Form.Group>
        {errors.title ? <span>{errors.title.message}</span> : ""}
      </Form>
      <div className="box bgcolor-secondary">
        <Editor
          apiKey="i6w0qj8vrafv6xrlwtpd61lo81hv9x5hvlg7gqjzfn6nvrgw"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>Create your document.</p>"
          init={{
            height: 100 + "%",
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            menubar: "file edit view insert format tools table tc help",
            skin: "oxide",
          }}
        />
      </div>
    </div>
  );
};

