import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { Button, Divider, Form } from "semantic-ui-react";
import CommonInputs from "../components/common/commonInputs";
import ImageDropDiv from "../components/common/imageDropDiv";
import { Header, Icon, Image, Message, Segment } from "semantic-ui-react";
import {
  FooterMessage,
  HeaderMessage,
} from "../components/common/welcomeMessage";

function Signup() {
  const inputRef = useRef();
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState(null);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [loading, setLoading] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [allsocialState, setAllSocialState] = useState({
    facebook: "",
    youtube: "",
    instagram: "",
    twitter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllSocialState((prev) => ({ ...prev, [name]: value }));
  };

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
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
      body.append("photo", image);
      body.append("name", name);
      body.append("password", password);
      body.append("email", email);
      body.append("username", username);
      body.append("bio", bio);
      await fetch("http://localhost:8000/api/users/signup", {
        method: "POST",
        body,
      });
    } else {
      alert("Please gives all the input properly");
    }
  };

  return (
    <>
      <HeaderMessage />
      <Divider hidden />
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
            content="Signup"
            type="submit"
            color="orange"
            // disabled={submitDisabled || !usernameAvailable}
          />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
}
export default Signup;

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

//   const uploadToClient = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       const i = event.target.files[0];

//       setImage(i);
//       setCreateObjectURL(URL.createObjectURL(i));
//     }
//   };
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
