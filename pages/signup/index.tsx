import { useForm } from "react-hook-form";
import "firebase/auth";
import fetchJson from "../../lib/fetchJson";
import useUser from "../../lib/useUser";
import conf_errors from "../../app_config/error.json";
import { Nav, Form, Button } from "react-bootstrap";

const SignUpForm: React.FC = () => {
  const { mutateUser } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true,
  } as any);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetchJson("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((value) => window.location.replace("/login"))
      .catch(
        (err) => alert(
          conf_errors[err.data.statusText || 'generic'] || conf_errors.generic
        )
      );
  };
  return (
    <>
      <Nav style={{ height: "5vh", alignContent: "center" }}>
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="box bgcolor-secondary">
        <Form 
          onSubmit={handleSubmit(onSubmit)} 
          style={{
            padding: "1rem"
          }}
        >
          <Form.Group>
            <Form.Label htmlFor="name">Name: </Form.Label>
            <Form.Control
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              {...register("name", {
                required: "Please enter an name",
              })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email address</Form.Label>
            <div>
              <Form.Control
                id="email"
                type="email"
                name="email"
                placeholder="E-Mail"
                {...register("email", {
                  required: "Please enter an email",
                  /* pattern: {
                    value: /^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/,
                    message: "Not a valid email",
                  }, */
                })}
              />
              {errors.email && <div>{errors.email.message}</div>}
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <div>
              <Form.Control
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                {...register("password", {
                  required: "Please enter a password",
                  minLength: {
                    value: 6,
                    message: "Should have at least 6 characters",
                  },
                })}
              />
              {errors.password && <div>{errors.password.message}</div>}
            </div>
          </Form.Group>
          <div className="mt-6">
            <span>
              <Button type="submit">Sign up</Button>
            </span>
          </div>
        </Form>
      </div>
      
    </>
  );
};
export default SignUpForm;
