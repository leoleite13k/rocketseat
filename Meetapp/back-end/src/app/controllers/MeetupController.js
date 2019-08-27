import * as Yup from 'yup';
import { parseISO, isBefore, startOfHour } from 'date-fns';

import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner: Yup.number().required(),
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

  async update(req, res) {
    // Valida schema
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      banner: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verifica Usuario que pertence o meetup
    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to alter this meetup" });
    }

    // Atualiza
    const {
      id,
      title,
      description,
      location,
      date,
      banner,
    } = await meetup.update(req.body);

    return res.json({
      id,
      title,
      description,
      location,
      date,
      banner,
    });
  }

  async delete(req, res) {
    try {
      // Verifica Usuario que pertence o meetup
      const meetup = await Meetup.findByPk(req.params.id);

      if (!meetup) {
        return res.status(401).json({ error: 'This meetup not exists !' });
      }

      if (meetup.user_id !== req.userId) {
        return res
          .status(401)
          .json({ error: "You don't have permission to cancel this meetup" });
      }

      await meetup.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.json({
        message: 'Meetup has been canceled !',
      });
    } catch (error) {
      return res.status(501).json({ error: `Internal error ${error}` });
    }
  }
}

export default new MeetupController();
