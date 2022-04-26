import React from "react";
import { Form, Header, Icon, Image, Segment, Input } from "semantic-ui-react";

function ImageDropDiv({
  highlighed,
  inputRef,
  handleChange,
  mediaPreview,
  setMediaPreview,
  setMedia,
  setHighlighed,
}) {
  return (
    <>
      <Form.Field>
        <Segment>
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
              setMediaPreview(URL.createObjectURL(droppedFile[0]));
              console.log(e.dataTransfer.files);
            }}
          >
            {mediaPreview === null ? (
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
                    src={mediaPreview}
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
