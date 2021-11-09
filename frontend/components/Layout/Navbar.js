import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Navbar() {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;
  return (
    <Menu fluid>
      <Container text>
        <Link href="/login">
          <Menu.Item header active={isActive("/login")}>
            <Icon size="large" name="sign in" />
            login
          </Menu.Item>
        </Link>
        <Link href="/signup">
          <Menu.Item header active={isActive("/signup")}>
            <Icon size="large" name="signup" />
            sign up
          </Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
}
