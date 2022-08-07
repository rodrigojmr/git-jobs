import dbConnect from 'utils/dbConnect';
import Job from 'models/Job';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session?.user?.email) res.status(401);
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const jobs = await Job.find({
          user_email: session.user.email
        }); /* find all the data in our database */
        res.status(200).json({ success: true, data: jobs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { description, ...rest } = req.body;
        const jobData = { user_email: session.user.email, ...rest };
        const job = await Job.create(
          jobData
        ); /* create a new model in the database */
        console.log('job: ', job);
        res.status(201).json({ success: true, data: job });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        const deletedJob = await Job.deleteOne({
          id: id,
          user_email: session.user.email
        }); /* find all the data in our database */
        if (!deletedJob) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
