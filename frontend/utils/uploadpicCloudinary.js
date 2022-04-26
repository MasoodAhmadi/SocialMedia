import axios from "axios";

const uploadPic = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "maso");
    form.append("cloud_name", "masoodahmadi");
    const cloudinaryConfig = cloudinary.config({
      cloud_name: "ahmadimasood",
      api_key: "483589172997211",
      api_secret: "qGfb6WbmcaO1GvNUU5lJEVkp1rI",
      secure: true,
    });
    const res = await axios.post(cloudinaryConfig, form);
    return res.data.url;
  } catch (error) {
    return;
  }
};
export default uploadPic;
