import * as Yup from 'yup';
import { startOfHour, isBefore } from 'date-fns';
import Subscribe from '../models/Subscribe';
import Meetup from '../models/Meetup';

class SubscribeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { params, userId: user_id } = req;
    const { id: meetup_id } = params;

    const meetup = await Meetup.findByPk(meetup_id);

    if (meetup.user_id === user_id) {
      return res.status(401).json({
        error: 'This Meetup belongs to this user',
      });
    }

    const hourMeetUp = startOfHour(meetup.date);

    if (isBefore(hourMeetUp, new Date())) {
      return res.status(400).json({ error: 'Past date are not permited' });
    }

    const subscribers = await Subscribe.findOne({
      where: { meetup: meetup_id, user: user_id },
    });

    console.log(subscribers);

    /*
    const subscribe = await Subscribe.create({
      meetup_id,
      user_id,
    }); */

    return res.json({ ok: true });
  }
}

export default new SubscribeController();
