import type { NextApiResponse } from "next";

interface Query {
  id: string;
  maxResults: string;
  [x: string]: any;
}

const handler = async (req: Query, res: NextApiResponse) => {
  var id = req.query.id;
  var maxResults = req.query.maxResults;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=${maxResults}`
    );
    const data = await response.json();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ error: true, message: "No Search Result" });
  }
};

export default handler;

//   `https://jsonplaceholder.typicode.com/photos`
