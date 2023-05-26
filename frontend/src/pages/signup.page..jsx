// import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from 'react';
// import { Header, Icon, Image, Message, Segment } from "semantic-ui-react";
import ImageDropDiv from '../components/common/imageDropDrag';
// import CommonInputs from "../components/common/inputs";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Card, Col, Form, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

import {
  ButtonContainer,
  ForgotPassword,
  HorizontalRule,
  IconsContainer,
  InputContainer,
  MainContainer,
  TextInput,
} from '../styles/identify.styles';
import {
  FooterMessage,
  HeaderMessage,
} from '../components/common/WelcomeMessage';
import Input from '../components/common/Input.component';
import Button from '../components/common/button';
import Icon from '../components/common/Icon.component';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { loadUser } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { routes } from '../config';

function SignupPage() {
  const { link } = routes;
  const inputRef = useRef();
  const dispatch = useDispatch();

  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState(null);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [highlighted, setHighlighed] = useState(false);
  const [loading, setLoading] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [allsocialState, setAllSocialState] = useState({
    facebook: '',
    youtube: '',
    instagram: '',
    twitter: '',
  });
  const [authMode, setAuthMode] = useState('identify');

  const userSchema = Yup.object({
    name: Yup.string().required('Required!'),
    latname: Yup.string().required('Required!'),
    username: Yup.string().required('Required!'),
    bio: Yup.string().min(255, 'Maximum 255 characters').required('Required!'),
    email: Yup.string().email('Invalid email format').required('Required!'),
    password: Yup.string().min(5, 'Minimum 5 characters').required('Required!'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      latname: '',
      username: '',
      email: '',
      password: '',
      bio: '',
    },
    validationSchema: userSchema,
    onSubmit: async ({ name, latname, username, email, password, bio }) => {
      try {
        unwrapResult(
          await dispatch(
            addUser({ name, latname, username, email, password, bio })
          )
        );
        // dispatch(closeModal());
        dispatch(
          addNotification({
            icon: <ClipboardCheck size={25} className='me-2' />,
            content: 'user created sucessfully',
            timeout: 3,
          })
        );
      } catch (error) {
        // dispatch(closeModal());
        console.error(error.message);
      }
    },
  });
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const uploadToServer = async (event) => {
    try {
      const formData = new FormData();
      formData.append('photo', data.file);
      await fetch('http://localhost:8000/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json());
    } catch (error) {}
  };
  const onSubmit = async (event) => {
    // event.preventDefault();
    if (
      name.length > 3 &&
      username.length > 3 &&
      email.length > 3 &&
      password.length > 3
    ) {
      const body = new FormData();
      body.append('photo', image);
      body.append('name', name);
      body.append('password', password);
      body.append('email', email);
      body.append('username', username);
      body.append('bio', bio);
      await fetch('http://localhost:8000/api/users/signup', {
        method: 'POST',
        body,
      });
    } else {
      alert('Please gives all the input properly');
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
              <Form onSubmit={formik.handleSubmit}>
                <InputContainer>
                  <Input
                    type='name'
                    name='name'
                    placeholder='Name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <TextInput className='text-muted'>
                    We'll never share your email with anyone.
                  </TextInput>
                  {formik.errors.email && formik.touched.email && (
                    <p className='mt-2' style={{ color: basic.danger }}>
                      {formik.errors.email}
                    </p>
                  )}
                  <Input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className='mt-2' style={{ color: basic.danger }}>
                      {formik.errors.password}
                    </p>
                  )}
                  <Input
                    type='text'
                    placeholder='Username'
                    name='username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  <Input
                    type='text'
                    placeholder='Bio'
                    name='bio'
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                  />
                </InputContainer>
                <ButtonContainer>
                  <Button type='submit' content='Sign in' />
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
