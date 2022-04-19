import axios from "axios";

const uploadPic = async (media) => {
  const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "maso");
    form.append("cloud_name", "masoodahmadi");
    const res = await axios.post(cloudinaryConfig, form);
    return res.data.url;
  } catch (error) {
    return;
  }
};
export default uploadPic;
