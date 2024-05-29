import Jimp from "jimp";

const resizeImage = async (filePath) => {
  try {
    const image = await Jimp.read(filePath);
    await image.resize(250, 250).writeAsync(filePath);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default resizeImage;
