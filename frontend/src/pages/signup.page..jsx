// import { useRouter } from "next/router";
import React, { useRef, useState } from 'react';
// import { Divider, Form } from "semantic-ui-react";
// import { Header, Icon, Image, Message, Segment } from "semantic-ui-react";
import ImageDropDiv from '../components/common/imageDropDrag';
// import CommonInputs from "../components/common/inputs";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import {
  FacebookButton,
  ForgotPasswordButton,
  LoginButton,
  LoginFormContainer,
} from '../styles/identify.styles';
import {
  FooterMessage,
  HeaderMessage,
} from '../components/common/WelcomeMessage';
import { CardImage, Facebook } from 'react-bootstrap-icons';

function SignupPage() {
  const inputRef = useRef();
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setAllSocialState((prev) => ({ ...prev, [name]: value }));
  // };

  const userSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required!'),
    password: Yup.string().min(5, 'Minimum 5 characters').required('Required!'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const response = unwrapResult(await dispatch(signInUser(values)));
        history.push(link);
        dispatch(
          addNotification({
            identifier: 'user',
            timeout: 5,
            icon: <UnlockFill className='text-success' />,
            content: response?.name
              ? `${localize('Welcome')} ${response?.name}`
              : localize('Welcome'),
          })
        );
      } catch (error) {
        console.log('error: ', error);
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

  return (
    <div>
      <LoginFormContainer>
        <Form
          loading={formLoading}
          error={errorMsg !== null}

          // onSubmit={formik.handleSubmit}
        >
          <Row className='mt-4'>
            <Col>
              <HeaderMessage />
              <Alert
                color='warmmidgrey'
                error
                header='Oops!'
                content={errorMsg}
                onDismiss={() => setErrorMsg(null)}
              >
                <div>
                  <Alert.Heading style={{ fontSize: '1rem' }}></Alert.Heading>
                </div>
              </Alert>
              <Form>
                {/* <ImageDropDiv
                  setMedia={setMedia}
                  handleChange={uploadToClient}
                  highlighted={highlighted}
                  setHighlighted={setHighlighted}
                  inputRef={inputRef}
                  createObjectURL={createObjectURL}
                  setCreateObjectURL={setCreateObjectURL}
                /> */}
                <Card>
                  <div>
                    <input
                      style={{ display: 'none' }}
                      type='file'
                      accept='image/*'
                      onChange={uploadToClient}
                      name='media'
                      ref={inputRef}
                    />
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setHighlighed(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setHighlighed(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setHighlighed(true);
                        const droppedFile = Array.from(e.dataTransfer.files);
                        setMedia(droppedFile[0]);
                        setCreateObjectURL(URL.createObjectURL(droppedFile[0]));
                        console.log(e.dataTransfer.files);
                      }}
                    >
                      {createObjectURL === null ? (
                        <div
                          style={
                            highlighted
                              ? { backgroundColor: '#D0F0C0' }
                              : { background: '' }
                          }
                        >
                          <div className='d-flex justify-content-center'>
                            <CardImage
                              className='d-flex justify-content-center'
                              name='file image outline'
                              style={{
                                cursor: 'pointer',
                                // display: 'flex',
                                // justifyItems: 'center',
                                // justifyContent: 'center',
                              }}
                              onClick={() => inputRef.current.click()}
                            />
                          </div>
                          <h4
                            className='d-flex justify-content-center'
                            onClick={() => inputRef.current.click()}
                          >
                            Drag n drop or click to upload image
                          </h4>
                        </div>
                      ) : (
                        <div>
                          <div className='d-flex justify-content-center my-3'>
                            <Button
                              onClick={() => inputRef.current.click()}
                              variant='none'
                              className='position-relative p-0 border-0'
                            >
                              <img
                                src={createObjectURL}
                                className='rounded w-100'
                              />
                              {/* <input
                            placeholder='masood'
                            type='file'
                            name='myImage'
                            onChange={uploadToClient}
                          /> */}
                            </Button>
                          </div>
                        </div>
                      )}
                      {/* <button
                      className='btn btn-primary'
                      type='submit'
                      onClick={uploadToServer}
											>
                      {' '}
                      Send to server
                    </button>{' '} */}
                    </div>
                  </div>
                </Card>
              </Form>

              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  placeholder='Enter email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone.
                </Form.Text>
                {formik.errors.email && formik.touched.email && (
                  <p className='mt-2' style={{ color: basic.dark }}>
                    {formik.errors.email}
                  </p>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  placeholder='Enter password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  aria-label='Password for access admin'
                />
                {formik.errors.password && formik.touched.password && (
                  <p className='' style={{ color: 'black' }}>
                    {formik.errors.password}
                  </p>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              {' '}
              <LoginButton type='submit'>login</LoginButton>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              {' '}
              <ForgotPasswordButton>forgot password</ForgotPasswordButton>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FooterMessage />
            </Col>
          </Row>
          <div>
            <FacebookButton>
              <Row>
                <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                  sign in with
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Facebook width={22} height={22} />
                </Col>
              </Row>
            </FacebookButton>
            <FacebookButton>
              {' '}
              <Row>
                {' '}
                <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                  sign in with
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Facebook width={22} height={22} />
                </Col>
              </Row>
            </FacebookButton>
          </div>
          <br />
        </Form>
      </LoginFormContainer>
    </div>

    /* <HeaderMessage /> 
        {/* <Divider hidden />
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={async () => {
          await onSubmit();
          await router.push("/home");
        }}
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />

        <ImageDropDiv
          setMedia={setMedia}
          handleChange={uploadToClient}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          inputRef={inputRef}
          createObjectURL={createObjectURL}
          setCreateObjectURL={setCreateObjectURL}
        />

        <Segment>
          <Form.Input
            label="name"
            placeholder="type your name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            // loading={usernameLoading}
            // error={!usernameAvailable}
            label="username"
            name="username"
            placeholder="type your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // onChange={(e) => {
            //   setCheckUsername(e.target.value);
            //   if (resgexUserName.test(e.target.value)) {
            //     setUsernameAvailable(true);
            //   } else {
            //     setUsernameAvailable(false);
            //   }
            // }}
            fluid
            // icon={usernameAvailable ? "check" : "close"}
            icon={"check"}
            iconPosition="left"
            required
          />

          <CommonInputs
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
            handleChange={handleChange}
            setAllSocialState={setAllSocialState}
            bio={bio}
            setBio={setBio}
            allsocialState={allsocialState}
          />
          <Divider hidden />

          <Divider hidden />
          <Button
            // content="Signup here "
            type="submit"
            color="orange"
            // disabled={submitDisabled || !usernameAvailable}
          >
            {intl.formatMessage({ id: "identify.signIn" })}
          </Button>
        </Segment>
      </Form> 
         <FooterMessage /> */
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

{
  /* <div>
          <h4>name</h4>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div> */
}
{
  /* <div>
          <h4>username</h4>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div> */
}
{
  /* <div>
          <h4>password</h4>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div> */
}
{
  /* <div>
          <h4>email</h4>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div> */
}
{
  /* <div>
          <h4>bio</h4>
          <input
            type="text"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </div> */
}
{
  /* <button
          className="btn btn-primary"
          type="submit"
          onClick={async () => {
            await router.push("/home");
            await onSubmit();
          }}
        >
          Create User
        </button> */
}
{
  /* <div>
          <img src={createObjectURL} />
          <h4>Select Image</h4>
          <input type="file" name="myImage" onChange={uploadToClient} />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={async () => {
              await router.push("/home");
              await onSubmit();
            }}
          >
            Create User
          </button>
        </div> */
}
