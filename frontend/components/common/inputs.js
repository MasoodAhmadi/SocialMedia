import React from "react";
import { Divider, Form, Message, TextArea, Button } from "semantic-ui-react";

function CommonInputs({
  allsocialState: { facebook, instagram, youtube, twitter },
  handleChange,
  bio,
  setBio,
  showSocialLinks,
  setShowSocialLinks,
}) {
  return (
    <>
      <Form.Field
        reguired
        control={TextArea}
        name="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="bio"
      />
      <Button
        content="Add social link"
        color="red"
        icon="at"
        type="button"
        onClick={() => {
          setShowSocialLinks(!showSocialLinks);
        }}
      />
      {showSocialLinks && (
        <>
          {" "}
          <Divider />{" "}
          <Form.Input
            icon="facebook"
            iconPosition="left"
            name="facebook"
            value={facebook}
            onChange={handleChange}
          />
          <Form.Input
            icon="twitter"
            iconPosition="left"
            name="twitter"
            value={twitter}
            onChange={handleChange}
          />
          <Form.Input
            icon="instagram"
            iconPosition="left"
            name="instagram"
            value={instagram}
            onChange={handleChange}
          />
          <Form.Input
            icon="youtube"
            iconPosition="left"
            name="youtube"
            value={youtube}
            onChange={handleChange}
          />
          <Message
            icon="attention"
            info
            size="small"
            header="Social Media Links are optional"
          />
        </>
      )}
    </>
  );
}

export default CommonInputs;