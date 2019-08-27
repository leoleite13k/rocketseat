import * as Yup from 'yup';
import { startOfHour, isBefore, differenceInHours } from 'date-fns';
import Subscriber from '../models/Subscriber';
import Meetup from '../models/Meetup';

class SubscriberController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { params, userId: user_id } = req;
    const { id: meetup_id } = params;

    // verifica se voce que criou esse Meetup
    const meetup = await Meetup.findByPk(meetup_id);

    if (meetup.user_id === user_id) {
      return res.status(400).json({
        error: 'This Meetup belongs to this user',
      });
    }

    const hourMeetUp = startOfHour(meetup.date);

    if (isBefore(hourMeetUp, new Date())) {
      return res.status(400).json({ error: 'Past date are not permited' });
    }

    // verifica se ja esta cadastrado no mesmo Meetup
    const subscribers = await Subscriber.findOne({
      where: {
        meetup_id,
        user_id,
      },
    });

    if (subscribers) {
      return res
        .status(400)
        .json({ error: 'Your has ben subscriber in this Meetup' });
    }

    // Verifica se ja tem outor Meetup no mesmo horario
    const subscribersAll = await Subscriber.findAll({
      where: {
        user_id,
      },
    });

    if (subscribersAll) {
      subscribersAll.forEach(async sub => {
        const hour = await Meetup.findOne({
          where: {
            id: sub.dataValues.meetup_id,
          },
        });

        if (differenceInHours(hourMeetUp, hour.date) <= 0) {
          return res.status(400).json({
            error: 'You already have a meetup scheduled for this time',
          });
        }
      });
    }

    const subscriber = await Subscriber.create({
      meetup_id,
      user_id,
    });

    return res.json(subscriber);
  }
}

export default new SubscriberController();
