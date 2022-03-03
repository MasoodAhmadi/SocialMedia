import React from "react";
import { Form, Header, Icon, Image, Segment } from "semantic-ui-react";

function ImageDropDiv({
  highlighed,
  setHighlighted,
  inputRef,
  handleChange,
  mediaPreview,
  setMediaPreview,
  setMedia,
}) {
  return (
    <>
      <Form.Field>
        <Segment placeholder basic secondary>
          {" "}
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleChange}
            name="media"
            ref={inputRef}
          />
          <div>
            {mediaPreview === null} ? (
            <>
              <Segment color={highlighed ? "green" : ""} placeholder basic>
                <Header icon>
                  <Icon
                    name="file image outline"
                    style={{ cursor: "pointer" }}
                    onClick={() => inputRef.current.click()}
                  />
                  Drag n drop or click to upload image
                </Header>
              </Segment>
            </>
            ) : (
            <>
              <Segment color="green">
                {" "}
                <Image
                  src={mediaPreview}
                  size="mediam"
                  centerd
                  style={{ cursor: "pointer" }}
                  onClick={() => inputRef.current.click()}
                />
              </Segment>
            </>
            )
          </div>
        </Segment>
      </Form.Field>
    </>
  );
}

export default ImageDropDiv;
