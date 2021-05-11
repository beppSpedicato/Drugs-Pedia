import useUser from "../../../lib/useUser";
import { Nav, Card, Button } from "react-bootstrap";
import useSWR from 'swr';
import toDateTime from '../../../lib/toDateTime';
import { useRouter } from 'next/router';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import fetchJson from '../../../lib/fetchJson';

export default (req) => {
  const userdata = useSWR('/api/data/user');

  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR('/api/data/pages/' + id);


  const editorRef = useRef(null);
  
  const submit = () => {
	  if (editorRef.current && data && confirm("Sei sicuro?")) {
      fetchJson("/api/data/pages/modify/" + id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: editorRef.current.getContent(),
          title: data.title,
          category: "",
          timestamp: toDateTime(data.timestamp.seconds),
        }),
      })
        .then((value) => {
          window.location.replace("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
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
          <Nav.Link href="/profile/createPage">Create Page</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <h1 style={{marginLeft: "2rem"}}>
        {
          data && data.title && !error?
            data.title : ""
        }
      </h1>
      <div style={{margin: "0rem 2rem 0rem 2rem"}}>
        {
          (() => {
            if(error || JSON.stringify(data) == "{}") {
              window.location.replace('/profile');
              return;
            }
            return data && data.timestamp && !error?
              "Created at: " + toDateTime(data.timestamp.seconds).toDateString() : ""
          })()
        }
      </div>
      <div style={{margin: "0rem 2rem 2rem 2rem"}}>
        {
          (() => {
            if(error || JSON.stringify(data) == "{}") {
              window.location.replace('/profile');
              return;
            }
            return data && data.modifiedAt && !error?
              "Last modify: " + toDateTime(data.modifiedAt.seconds).toDateString() : ""
          })()
        }
      </div>

      <Button style={{margin: "0rem 2rem 2rem 2rem"}} onClick={submit}>Modify</Button>
      <div className="box bgcolor-secondary">
        <Editor
          apiKey="i6w0qj8vrafv6xrlwtpd61lo81hv9x5hvlg7gqjzfn6nvrgw"
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={data && data.content && !error? data.content : ""}
          init={{
            resize_img_proportional: true,
            height: 100 + "%",
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            menubar: 'file edit view insert format tools table tc help',
            skin: 'oxide'
          }}
        />
      </div>
    </div>
  );
};