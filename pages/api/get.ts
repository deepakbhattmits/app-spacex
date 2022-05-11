import {NextApiRequest,NextApiResponse} from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(!!req?.method?.match(/get/i)) {
     
  res
    .status(200)
    .send({ success: "Successfully fetched", });
 }
};
export default handler;
