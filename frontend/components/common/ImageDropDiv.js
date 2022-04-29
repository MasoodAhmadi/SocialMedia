import React from "react";
import { Form, Header, Icon, Image, Segment } from "semantic-ui-react";

function ImageDropDiv({
  highlighed,
  inputRef,
  handleChange,
  setMedia,
  setHighlighed,
  createObjectURL,
  setCreateObjectURL,
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
                <Segment color="green" placeholder basic>
                  <Image
                    src={createObjectURL}
                    size="mediam"
                    centerd
                    style={{ cursor: "pointer" }}
                    onClick={() => inputRef.current.click()}
                  />
                </Segment>
              </>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
}

export default ImageDropDiv;
