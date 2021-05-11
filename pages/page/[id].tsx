import { Nav } from "react-bootstrap";
import useSWR from 'swr';
import toDateTime from '../../lib/toDateTime';
import { useRouter } from 'next/router';

export default () => {

  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR('/api/data/pages/' + id);

  return (
    <div>
      <Nav style={{ height: "5vh", alignContent: "center" }}>
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
          data && data.timestamp && !error?
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
        {
          (() => {
            if(error || JSON.stringify(data) == "{}") {
              window.location.replace('/profile');
              return;
            }
            return data && data.content?
              <div
                style={{
                  margin: "2rem",
                  border: "1px solid gray",
                  borderRadius: "0.5rem",
                  height: "80vh",
                  padding: "1rem",
                  overflowX: "auto",
                  overflowY: "auto",
                }} 
                dangerouslySetInnerHTML={{ __html: data.content }} />
              : ""
          })()
        }
    </div>
  );
};