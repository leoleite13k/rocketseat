import * as Yup from 'yup';
import { parseISO, isBefore, startOfHour } from 'date-fns';

import Meetup from '../models/Meetup';

class MeetupsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, location, date, banner } = req.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permited' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date: hourStart,
      banner,
      user_id: req.userId,
    });

    return res.json(meetup);
  }
}

export default new MeetupsController();
