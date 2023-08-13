const events = require('express').Router();
const db = require('../models');
const { Event } = db;
const { Op } = require('sequelize');


// FIND ALL EVENTS
events.get("/", async (req, res) => {
    try {
      const foundEvents = await Event.findAll({
        order: [["data", "ASC"]],
        where: {
          name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
        },
      });
      res.status(200).json(foundEvents);
    } catch (error) {
      res.status(500).json(error);
    }
  });

//   //GET ONE EVENT
//   events.get('/:name', async (req, res) => {
//     try {
//         const foundEvent = await Event.findOne({
//             where: { name: req.params.name }
//         })
//         res.status(200).json(foundEvent)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// });

//* GET ONE EVENT
events.get("/:name", async (req, res) => {
    try {
      const foundEvent = await Event.findOne({
        where: { name: req.params.name },
        include: [ 
          { 
              model: Stage, 
              as: "stage",
              include: { 
                  model: Event, 
                  as: "event",
                  where: { name: { 
                      [Op.like]: `%${req.query.event ? req.query.event : ''}%` 
                  } }
              } 
          },
          { 
              model: Set_Time,
              as: "set_times",
              include: { 
                  model: Event, 
                  as: "event",
                  where: { name: { 
                      [Op.like]: `%${req.query.event ? req.query.event : ''}%` 
                  } }
              }
          }
      ] ,
      });
      res.status(200).json(foundEvent);
    } catch (e) {
      res.status(500).json(e);
    }
  });

//CREATE EVENT
events.post("/", async (req, res) => {
    try {
      const newEvent = await Event.create(req.body);
      res.status(200).json({
        message: 'Successfully inserted a new event',
        data: newEvent
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

  // UPDATE A EVENT
events.put("/:id", async (req, res) => {
    try {
      const updatedEvents = await Event.update(req.body, {
        where: {
          event_id: req.params.id,
        },
      });
      res.status(200).json({
        message: `Successfully updated ${updatedEvents} event(s)`,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

  // DELETE A EVENT
events.delete("/:id", async (req, res) => {
    try {
      const deletedEvents = await Event.destroy({
        where: {
          event_id: req.params.id,
        },
      });
      res.status(200).json({
        message: `Successfully deleted ${deletedEvents} event(s)`,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

module.exports = events