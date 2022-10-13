import Link from "next/link";
import { useRouter } from "next/router";
import { Divider, Icon, Message } from "semantic-ui-react";

export const HeaderMessage = () => {
  const router = useRouter();
  const signupRoute = router.path === "/signup";
  return (
    <Message
      color="teal"
      attached
      header={signupRoute ? "Get started " : "welcome back"}
      icon={signupRoute ? "settings" : "privacy"}
      content={
        signupRoute ? "Create New Account" : "Login with email and password"
      }
    />
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.path === "/signup";
  return (
    <>
      {signupRoute ? (
        <>
          <Message attached="bottom" warning>
            <Icon name="help" />
            Existing User ? <Link href="/login">Login here Instead</Link>
          </Message>
          <Divider hidden />
        </>
      ) : (
        <>
          {" "}
          <Message attached="bottom" info>
            <Icon name="lock" />
            <Link href="/reset">forgot Password</Link>
          </Message>{" "}
          <Message attached="bottom" warning>
            <Icon name="help" />
            New User ? <Link href="/signup">Signup Here </Link>Instead
          </Message>
        </>
      )}
    </>
  );
};
