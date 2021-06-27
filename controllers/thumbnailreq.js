import express from 'express';
import imageDownloader from "node-image-downloader";
import resizer from "node-image-resizer";


let router = express.Router();


export const thumbnailReq = async (req, res) => {
    try {
      const info = await imageDownloader({
      imgs: [
        {
          uri: req.body.uri,
          filename: "image",
        },
      ],
      dest: "./images",
    })
        
    const setup = {
      all: {
        path: "./thumbnails/",
        quality: 80,
      },
      versions: [
        {
          quality: 100,
          prefix: "small_",
          width: 50,
          height: 50,
        },
      ],
    };

    // create thumbnails
    const thumbs = await resizer("./images/image.jpg", setup);
    res
      .status(200)

      .json({ status: "ok", message: "image resized succesfully", thumbs});
  } catch (err) {
    res.status(400).json({ message: "error saving image" });
  }
};

export default router;

