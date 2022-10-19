import React from "react";
import { Helmet } from "react-helmet";

const HeadTags = () => {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="inital-scale=1.0, width=device-width" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.png" sizes="16*16" type="image/png" />
        <link rel="stylesheet" type="text/css" href="/listMessages.css" />
        <link rel="stylesheet" type="text/css" href="/styles.css" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        <title>Mini social media</title>
      </Helmet>
    </>
  );
};

export default HeadTags;
