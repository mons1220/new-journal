import type { NextApiResponse } from "next";
import { get } from "https";

interface Query {
  id: string;
  [x: string]: any;
}

const handler = async (req: Query, res: NextApiResponse) => {
  var id = req.query.id;

  function urlToBuffer(url: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const data: Uint8Array[] = [];
      get(url, (res) => {
        res
          .on("data", (chunk: Uint8Array) => {
            data.push(chunk);
          })
          .on("end", () => {
            resolve(Buffer.concat(data));
          })
          .on("error", (err) => {
            reject(err);
          });
      });
    });
  }

  try {
    const imageBuffer = await urlToBuffer(id);
    res.setHeader("Content-Type", "image/jpg");
    res.send(imageBuffer);
  } catch (e) {
    res.status(400).json({ error: true, message: "Image not found" });
  }
};

export default handler;
