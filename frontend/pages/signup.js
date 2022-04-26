import React, { useEffect, useRef, useState } from "react";
import { Segment, TextArea, Divider } from "semantic-ui-react";
import { Form, Button, Message } from "semantic-ui-react";
import { HeaderMessage } from "../components/common/WelcomeMessage";
import { FooterMessage } from "../components/common/WelcomeMessage";
import CommonInputs from "../components/common/commonInputs";
import { endPoints } from "../components/config/endPoints";
import ImageDropDiv from "../components/common/ImageDropDiv";
import { registerUser } from "../utils/authUser";
import axios from "axios";
import uploadPic from "../utils/uploadpicCloudinary";
const resgexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

let cancel;

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });
  const { getallUsers, addUsers } = endPoints;
  const { name, email, password, bio } = user;
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const isUser = Object.values({ name, email, password, bio }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const checkUserName = async () => {
    setUsernameLoading(true);
    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const res = axios.get(
        `http://localhost:8000/api/users/username/${username}`,
        {
          cancelToken: new CancelToken((canceler) => {
            cancel = canceler;
          }),
        }
      );
      if (res === "Available") {
        setUsername(true);
        setUser((prev) => ({ ...prev, username }));
      }
    } catch (error) {
      setErrorMsg("user not available");
    }
    setUsernameLoading(false);
  };

  useEffect(() => {
    username === "" ? setUsernameAvailable(false) : checkUserName();
  }, [username]);

  const handleSubmit = async (value) => {};

  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <ImageDropDiv
          mediaPreview={mediaPreview}
          setMediaPreview={setMediaPreview}
          setMedia={setMedia}
          handleChange={handleChange}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          inputRef={inputRef}
        />

        <Segment>
          <Form.Input
            label="name"
            placeholder="type your name"
            name="name"
            value={name}
            onChange={handleChange}
            fluid
            icon="user"
            iconPosition="left"
            required
          />
          <Form.Input
            label="Email"
            name="email"
            placeholder="type you email"
            value={email}
            onChange={handleChange}
            fluid
            icon="envelope"
            iconPosition="left"
            type="email"
            required
          />
          <Form.Input
            label="Password"
            name="password"
            placeholder="type you password"
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: "eye",
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? `text` : "password"}
            required
          />

          <Form.Input
            loading={usernameLoading}
            error={!usernameAvailable}
            label="Username"
            name="Username"
            placeholder="type your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (resgexUserName.test(e.target.value)) {
                setUsernameAvailable(true);
              } else {
                setUsernameAvailable(false);
              }
            }}
            fluid
            icon={usernameAvailable ? "check" : "close"}
            iconPosition="left"
            required
          />
          <CommonInputs
            user={user}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
            handleChange={handleChange}
          />

          <Divider hidden />
          <Button
            content="Signup"
            type="submit"
            color="orange"
            disabled={submitDisabled || !usernameAvailable}
          />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
}
export default Signup;
