const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(express.json());

let rooms = [
  {
    room_id: 1,
    room_name: "large",
    seats: 160,
    amenities: "wifi,projection screen,AC",
    price_hr: 1600,
  },
  {
    room_id: 2,
    room_name: "extra large",
    seats: 230,
    amenities: "wifi,projection screen,tv,AC",
    price_hr: 2300,
  },
];

let bookingdetails = [
  {
    customername: "san",
    room_name: "large",
    room_id: 1,
    date: "2022-11-07",
    start_time: "12:00 AM",
    end_time: "12:00 PM",
    status: "booked",
  },
  {
    customername: "chris",
    room_name: "extra large",
    room_id: 2,
    date: "2022-11-17",
    start_time: "12:00 AM",
    end_time: "12:00 PM",
    status: "booked",
  },
];

app.get("/", (req, res) => {
  res.status(200).json({ rooms });
});

app.post("/createroom", (req, res) => {
  let id = rooms.length + 1;
  req.body.room_id = id;
  let roomcreate = {
    room_id: req.body.room_id,
    room_name: req.body.room_name,
    seats: req.body.seats,
    amenities: req.body.amenities,
    price_hr: req.body.price_hr,
  };
  rooms.push(roomcreate);
  res.status(200).json({ message: "Room created successfully" });
});

app.post("/bookroom", (req, res) => {
  let id = bookingdetails.length + 1;
  req.body.room_id = id;
  let booking_details = {
    customername: req.body.customername,
    room_name: req.body.room_name,
    room_id: req.body.room_id,
    date: req.body.date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    status: "booked",
  };
  for (const booking of bookingdetails) {
    if (booking.date == req.body.dtae) {
      return res.status(400).json({ message: "this room is already booked" });
    } else {
      bookingdetails.push(booking_details);
      return res.status(200).json({ message: "room is successfully booked" });
    }
  }
});

app.get("/roomsdetails", (req, res) => {
  let roomsdetails = [];

  bookingdetails.forEach((customer) => {
    let room = {};

    room.room_name = customer.room_name;
    room.customername = customer.customername;
    room.date = customer.date;
    room.start_time = customer.start_time;
    room.end_time = customer.end_time;
    room.staus = customer.status;
    roomsdetails.push(room);
  });
  res.status(200).json({ listrooms });
});


app.listen(process.env.PORT || 3001);
