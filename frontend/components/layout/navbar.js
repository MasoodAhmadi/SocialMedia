import { Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
export default function Navbar() {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  return (
    <Menu size="huge">
      <Menu.Item
        name="home"
        // active={isActive === "home"}
        // onClick={this.handleItemClick}
      />
      <Menu.Item
        name="messages"
        // active={activeItem === "messages"}
        // onClick={this.handleItemClick}
      />

      <Menu.Menu position="right">
        <Dropdown item text="Language">
          <Dropdown.Menu>
            <Dropdown.Item>English</Dropdown.Item>
            <Dropdown.Item>Russian</Dropdown.Item>
            <Dropdown.Item>Spanish</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item>
          <Button primary onClick={() => router.push("/signup")}>
            Sign Up
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
/*
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
      </Container> *
*/
