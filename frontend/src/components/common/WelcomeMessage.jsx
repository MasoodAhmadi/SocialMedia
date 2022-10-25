import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const HeaderMessage = () => {
  const location = useLocation();
  const signupRoute = location.pathname === "/home";

  return (
    <Alert color="teal" attached>
      {location.pathname === "/home" ? (
        <div>
          <Alert.Heading>
            {signupRoute ? "Get started " : "welcome back"}
          </Alert.Heading>
          <p>
            Aww yeah, you successfully read this important alert message. This
            example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p>
          <hr />
        </div>
      ) : (
        <Alert.Heading>
          {signupRoute ? "Create New Account" : "Login with email and password"}
        </Alert.Heading>
      )}
    </Alert>
  );
};

export const FooterMessage = () => {
  const location = useLocation();

  return (
    <>
      <Alert color="teal" attached>
        {location.pathname === "/signup" ? (
          <div>
            <Alert.Heading>
              Existing User ? <Link href="/login">Login here Instead</Link>
            </Alert.Heading>
          </div>
        ) : (
          <Alert.Heading>
            New User ? <Link href="/signup">Signup Here </Link>Instead
          </Alert.Heading>
        )}
      </Alert>
    </>
  );
};
