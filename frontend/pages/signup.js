import React, { useEffect, useRef, useState } from "react";
import { Segment, TextArea, Divider } from "semantic-ui-react";
import { Form, Button, Message } from "semantic-ui-react";
import { HeaderMessage } from "../components/common/WelcomeMessage";
import { FooterMessage } from "../components/common/WelcomeMessage";
//import CommonInputs from "../components/common/commonInputs";
import { endPoints } from "../components/config/endPoints";
import ImageDropDiv from "../components/common/ImageDropDiv";
//import { registerUser } from "../utils/authUser";
import axios from "axios";
//import uploadPic from "../utils/uploadpicCloudinary";
const resgexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

let cancel;

function Signup() {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instagram: "",
    profilePicUrl: null,
  });
  const { getallUsers, addUsers } = endPoints;
  const { profilePicUrl, username, name, email, password, bio } = user;

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
  const [checkUsername, setCheckUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const isUser = Object.values({
      user,
    }).every((item) => Boolean(item));
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const checkUser = async () => {
    setUsernameLoading(true);
    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const res = await axios.get(
        `http://localhost:8000/api/users/username/${checkUsername}`,
        {
          cancelToken: new CancelToken((canceler) => {
            cancel = canceler;
          }),
        }
      );
      if (res === "Available") {
        setCheckUsername(true);
        setUser((prev) => ({ ...prev, checkUsername }));
      }
      console.log("username is", username);
    } catch (error) {
      setErrorMsg("user not available");
    }
    setUsernameLoading(false);
  };

  useEffect(() => {
    checkUsername === "" ? setUsernameAvailable(false) : checkUser();
  }, [checkUsername]);

  const handleSubmit = async (data) => {
    // e.preventDefault();
    // let profilePicUrl;
    // if (media !== null) {
    //   profilePicUrl = await uploadPic(media);
    // }
    // if (media !== null && !profilePicUrl) {
    //   setFormLoading(false);
    //   return setErrorMsg("Error Uploading Image");
    // }
    // await registerUser(user, profilePicUrl, setErrorMsg, setFormLoading);
    const formData = new FormData();
    formData.append("photo", data.file);
    const res = await fetch("http://localhost:8000/api/users/addprofile", {
      method: "POST",
      body: { user },
    }).then((res) => res.json());

    console.log(user);
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));

    // await axios({
    //   method: "POST",
    //   url: "http://localhost:8000/api/users/addprofile",
    //   data: user,
    //   headers: { "Content-Type": "application/json" },
    // }).then((response) => {
    //   console.log(response);
    // });
  };

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
            value={checkUsername}
            onChange={(e) => {
              setCheckUsername(e.target.value);
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
          {/* <CommonInputs
            user={user}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
            handleChange={handleChange}
          /> */}

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
