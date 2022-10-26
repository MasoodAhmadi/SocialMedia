import { Alert, Badge, Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";

export const HeaderMessage = ({ changeAuthMode }) => {
  const location = useLocation();
  const signupRoute = location.pathname === "/login";

  return (
    <Alert color="teal" attached>
      {/* {location.pathname === "/login" ? ( */}
      {/* {signupRoute === "/login" ? ( */}
      <div>
        <Alert.Heading style={{ width: "", fontSize: "1rem" }}>
          {signupRoute ? "Get started " : "welcome back"}
        </Alert.Heading>
      </div>
      {/* ) : ( */}
      <Alert.Heading style={{ width: "", fontSize: "1rem" }}>
        {location.pathname !== "/login"
          ? "Create New Account"
          : "Login with email and password"}
      </Alert.Heading>
      {/* )} */}
    </Alert>
  );
};

export const FooterMessage = ({ changeAuthMode }) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <Alert color="teal" attached>
        {location.pathname === "/signup" ? (
          <div>
            <Alert.Heading style={{ width: "", fontSize: "1rem" }}>
              Existing User ? <Link href="/login">Login here Instead</Link>
            </Alert.Heading>
          </div>
        ) : (
          <Alert.Heading style={{ width: "", fontSize: "1rem" }}>
            New User ?{" "}
            <Badge
              bg="light"
              text="dark"
              style={{ cursor: "pointer" }}
              onClick={changeAuthMode}
            >
              Signup Here{" "}
            </Badge>
            Instead
          </Alert.Heading>
        )}
      </Alert>
    </>
  );
};
