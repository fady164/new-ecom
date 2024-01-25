import { useFormik } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import * as Yup from "yup";
import { useAppDispatch } from "../../../store/hooks";
import { register } from "../../../store/user/authSlice";

const MyForm = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: "",
    onSubmit: (values) => {
      if (pathname === "/register") {
        dispatch(register(values)).then(() => {
          navigate("/");
        });
      } else {
        console.log(values, "Login");
      }
    },
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        {
          // If the pathname is '/register', then show the username field
          pathname === "/register" && (
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={formik.handleChange("username")}
                value={formik.values.username}
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>
          )
        }
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={formik.handleChange("email")}
            value={formik.values.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default MyForm;
