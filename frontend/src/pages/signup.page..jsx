// import ImageDropDiv from '../components/common/imageDropDrag';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import Button from '../components/common/button';
import { routes } from '../config';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'react-bootstrap-icons';
import Icon from '../components/common/Icon.component';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Input from '../components/common/Input.component';
import { addUser, loadUser } from '../redux/slices/userSlice';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { addNotification } from '../redux/slices/addNotificationSlice';
import { TextInput, ButtonContainer } from '../styles/identify.styles';
import { InputContainer, MainContainer } from '../styles/identify.styles';
import {
  ForgotPassword,
  HorizontalRule,
  IconsContainer,
} from '../styles/identify.styles';
import {
  FooterMessage,
  HeaderMessage,
} from '../components/common/WelcomeMessage';

const INITIAL_FORM = {
  id: '',
  name: '',
  email: '',
  password: '',
  username: '',
  bio: '',
  showPassword: false,
};

function SignupPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(INITIAL_FORM);
  const { link } = routes;
  const [authMode, setAuthMode] = useState('identify');
  const history = useHistory();
  const onChangeHandler = (prop, value) => {
    setForm({ ...form, [prop]: value });
  };

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = {
        name: form.name,
        email: form.email,
        password: form.password,
        username: form.username,
        bio: form.bio,
      };
      unwrapResult(await dispatch(addUser(data)));
      history.push(link);
      dispatch(
        addNotification({
          identifier: 'user',
          timeout: 5,
          icon: <CheckCircle className='me-2 text-success' />,
          content: `${form.name} successfully`,
        })
      );
    } catch (error) {
      console.error('error: ', error);
      // dispatch(
      //   addNotification({
      //     identifier: 'user',
      //     timeout: 5,
      //     icon: <CheckCircle className='me-2 text-success' />,
      //     content: (
      //       <span className='d-flex'>
      //         user <h4>{form.name} </h4>already exists
      //       </span>
      //     ),
      //   })
      // );
    }
  };

  const FacebookBackground =
    'linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)';
  const InstagramBackground =
    'linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)';
  const TwitterBackground =
    'linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)';
  return (
    <>
      <Container className='p-5'>
        <Row className=''>
          <Col></Col>
          <Col>Variable width content</Col>
          <Col>
            <MainContainer>
              <HeaderMessage />
              <Form onSubmit={handleSubmit}>
                <InputContainer>
                  <Input
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={form.name}
                    onChange={(e) => onChangeHandler('name', e.target.value)}
                  />
                  <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={form.email}
                    onChange={(e) => onChangeHandler('email', e.target.value)}
                  />
                  <TextInput className='text-muted'>
                    We'll never share your email with anyone.
                  </TextInput>
                  <Input
                    placeholder='Password'
                    name='password'
                    autoComplete='new-password'
                    type={form.showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) =>
                      onChangeHandler('password', e.target.value)
                    }
                  />

                  <Input
                    type='text'
                    placeholder='Username'
                    name='username'
                    value={form.username}
                    onChange={(e) =>
                      onChangeHandler('username', e.target.value)
                    }
                  />
                  <Input
                    type='text'
                    placeholder='Bio'
                    name='bio'
                    value={form.bio}
                    onChange={(e) => onChangeHandler('bio', e.target.value)}
                  />
                </InputContainer>
                <ButtonContainer>
                  <Button type='submit'>sign up</Button>
                </ButtonContainer>
                <HorizontalRule />
                <IconsContainer>
                  <Icon color={FacebookBackground}>
                    <FaFacebookF />
                  </Icon>
                  <Icon color={InstagramBackground}>
                    <FaInstagram />
                  </Icon>
                  <Icon color={TwitterBackground}>
                    <FaTwitter />
                  </Icon>
                </IconsContainer>
                <ForgotPassword>Forgot Password ?</ForgotPassword>
              </Form>
              <FooterMessage authMode={authMode} />
            </MainContainer>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default SignupPage;

// import React, { useEffect, useRef, useState } from "react";
// import { Segment, TextArea, Divider } from "semantic-ui-react";
// import { Form, Button, Message } from "semantic-ui-react";
// import { HeaderMessage } from "../components/common/WelcomeMessage";
// import { FooterMessage } from "../components/common/WelcomeMessage";
// //import CommonInputs from "../components/common/commonInputs";
// import { endPoints } from "../components/config/endPoints";
// import ImageDropDiv from "../components/common/ImageDropDiv";
// //import { registerUser } from "../utils/authUser";
// import axios from "axios";
// //import uploadPic from "../utils/uploadpicCloudinary";
// const resgexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
// import Router from "next/router";

// let cancel;

// function Signup() {
//   const [user, setUser] = useState({
//     username: "",
//     name: "",
//     email: "",
//     password: "",
//     bio: "",
//     facebook: "",
//     youtube: "",
//     twitter: "",
//     instagram: "",
//     profilePicUrl: null,
//   });
//   const { getallUsers, addUsers } = endPoints;
//   const { profilePicUrl, username, name, email, password, bio } = user;

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "media") {
//       setMedia(files[0]);
//       setMediaPreview(URL.createObjectURL(files[0]));
//     }

//     setUser((prev) => ({ ...prev, [name]: value }));
//   };
//   const [image, setImage] = useState(null);
//   const [createObjectURL, setCreateObjectURL] = useState(null);

//   const [showSocialLinks, setShowSocialLinks] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);
//   const [submitDisabled, setSubmitDisabled] = useState(true);
//   const [checkUsername, setCheckUsername] = useState("");
//   const [usernameLoading, setUsernameLoading] = useState(false);
//   const [usernameAvailable, setUsernameAvailable] = useState(false);

//   const [media, setMedia] = useState(null);
//   const [mediaPreview, setMediaPreview] = useState(null);
//   const [highlighted, setHighlighted] = useState(false);
//   const inputRef = useRef();

//   useEffect(() => {
//     const isUser = Object.values({
//       email,
//     }).every((item) => Boolean(item));
//     isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
//   }, [user]);

//   const checkUser = async () => {
//     setUsernameLoading(true);
//     try {
//       cancel && cancel();
//       const CancelToken = axios.CancelToken;
//       const res = await axios.get(
//         `http://localhost:8000/api/users/username/${email}`,
//         {
//           cancelToken: new CancelToken((canceler) => {
//             cancel = canceler;
//           }),
//         }
//       );
//       if (res === "Available") {
//         setCheckUsername(true);
//         setUser((prev) => ({ ...prev, email }));
//       }
//       console.log("username is", email);
//     } catch (error) {
//       setErrorMsg("user not available");
//     }
//     setUsernameLoading(false);
//   };

//   useEffect(() => {
//     checkUsername === "" ? setUsernameAvailable(false) : checkUser();
//   }, [checkUsername]);

// const uploadToClient = (event) => {
//   if (event.target.files && event.target.files[0]) {
//     const i = event.target.files[0];

//     setImage(i);
//     setCreateObjectURL(URL.createObjectURL(i));
//   }
// };
//   console.log("this is an image", image);

//   const uploadToServer = async (event) => {
//     try {
//       const formData = new FormData();
//       formData.append("photo", data.file);
//       await fetch("http://localhost:8000/api/users/signup", {
//         method: "POST",
//         body: JSON.stringify(user),
//         headers: { "Content-Type": "application/json" },
//       }).then((res) => res.json());
//     } catch (error) {}
//   };
//   const handleSubmit = async (event) => {
//     // e.preventDefault();
//     // let profilePicUrl;
//     // if (media !== null) {
//     //   profilePicUrl = await uploadPic(media);
//     // }
//     // if (media !== null && !profilePicUrl) {
//     //   setFormLoading(false);
//     //   return setErrorMsg("Error Uploading Image");
//     // }
//     // await registerUser(user, profilePicUrl, setErrorMsg, setFormLoading);
//     try {
//       const data = new FormData();
//       const { files } = event.target;
//       data.append("photo", files[0]);
//       data.append("upload_preset", "maso");

//       await fetch("http://localhost:8000/api/users/signup", {
//         method: "POST",
//         body: JSON.stringify(user),
//         headers: { "Content-Type": "application/json" },
//       })
//         .then((res) => res.json())
//         .then((data) =>
//           setUser({
//             username: data.username,
//             password: data.password,
//             profilePicUrl: data.url,
//             bio: data.bio,
//             email: data.email,
//             name: data.name,
//           })
//         );
//     } catch (error) {
//       console.log("error");
//     }
//   };
//   return (
//     <>
//       <HeaderMessage />
//       <Form
//         loading={formLoading}
//         error={errorMsg !== null}
//         onSubmit={handleSubmit}
//       >
//         <Message
//           error
//           header="Oops!"
//           content={errorMsg}
//           onDismiss={() => setErrorMsg(null)}
//         />
//         {/* <ImageDropDiv
//           mediaPreview={mediaPreview}
//           setMediaPreview={setMediaPreview}
//           setMedia={setMedia}
//           handleChange={handleChange}
//           highlighted={highlighted}
//           setHighlighted={setHighlighted}
//           inputRef={inputRef}
//         /> */}
//         <div>
//           <div>
//             <img src={createObjectURL} />
//             <h4>Select Image</h4>
//             <input type="file" name="myImage" onChange={uploadToClient} />
//             <button
//               className="btn btn-primary"
//               type="submit"
//               onClick={uploadToServer}
//             >
//               Send to server
//             </button>
//           </div>
//         </div>

//         <Segment>
//           <Form.Input
//             label="name"
//             placeholder="type your name"
//             name="name"
//             value={name}
//             onChange={handleChange}
//             fluid
//             icon="user"
//             iconPosition="left"
//             required
//           />
//           <Form.Input
//             label="Email"
//             name="email"
//             placeholder="type you email"
//             value={email}
//             onChange={handleChange}
//             fluid
//             icon="envelope"
//             iconPosition="left"
//             type="email"
//             required
//           />
//           <Form.Input
//             label="Password"
//             name="password"
//             placeholder="type you password"
//             value={password}
//             onChange={handleChange}
//             fluid
//             icon={{
//               name: "eye",
//               circular: true,
//               link: true,
//               onClick: () => setShowPassword(!showPassword),
//             }}
//             iconPosition="left"
//             type={showPassword ? `text` : "password"}
//             required
//           />

//           <Form.Input
//             loading={usernameLoading}
//             error={!usernameAvailable}
//             label="username"
//             name="username"
//             placeholder="type your username"
//             value={username}
//             onChange={handleChange}
//             // onChange={(e) => {
//             //   setCheckUsername(e.target.value);
//             //   if (resgexUserName.test(e.target.value)) {
//             //     setUsernameAvailable(true);
//             //   } else {
//             //     setUsernameAvailable(false);
//             //   }
//             // }}
//             fluid
//             icon={usernameAvailable ? "check" : "close"}
//             iconPosition="left"
//             required
//           />
//           {/* <CommonInputs
//             user={user}
//             showSocialLinks={showSocialLinks}
//             setShowSocialLinks={setShowSocialLinks}
//             handleChange={handleChange}
//           /> */}

//           <Divider hidden />
//           <Button
//             content="Signup"
//             type="submit"
//             color="orange"
//             // disabled={submitDisabled || !usernameAvailable}
//           />
//         </Segment>
//       </Form>
//       <FooterMessage />
//     </>
//   );
// }
// export default Signup;
