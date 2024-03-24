//import express
const { response } = require("express");

const teacherShema = require("../Model/teacherSchema"); //import schema object
const ClassShema = require("../Model/classSchema"); //to get supervisor


exports.getIdTeacher = (request, response, next) => {
  const id = request.params.id;
  teacherShema
    .findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ data: "Teacher not found" });
      }
      res.status(200).json(data);
    })
    .catch((err) => next(err));
};

exports.getAllTeachers = (request, response, next) => {
  teacherShema
    .find()
    .then((data) => response.status(200).json(data))
    .catch((err) => next(err));
};

exports.insertTeacher = (request, response, next) => {
  const newTeacher = new teacherShema(request.body);
  newTeacher
    .save()
    .then((data) => response.status(201).json({ data }))
    .catch((err) => next(err));
};

exports.updateTeacher = (request, response, next) => {
  const id = request.body._id;
  teacherShema
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        response.status(404).json({ data: "Teacher not found" });
      }
      response.status(200).json({ data: "updated Successful" });
    })
    .catch((err) => next(err));
};

exports.deleteTeacher = (request, response, next) => {
  const id = request.params.id;
  teacherShema
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        response.status(404).json({ data: "Teacher not found" });
      }
      res.status(200).json({ data: "deleted Successful" });
    })
    .catch((err) => next(err));
};

exports.getSupervisors = (request, response, next) => {
    ClassShema.find({})
      .populate({
        path: "supervisor",
        select: { fullName: 1 },
      })
      .then((data) => {
        let supervisors = data.map((item) => item.supervisor);
        res.status(200).json({ supervisors });
      })
      .catch((err) => next(err));
};
