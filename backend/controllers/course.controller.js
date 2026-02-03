import Course from "../models/course.model.js";
import courseValidation from "../validations/course.validation.js";

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('author', 'firstName lastName email');
    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('author', 'firstName lastName email');
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const createCourse = async (req, res) => {
  try {
    const { body } = req;
    if (!body) {
      return res.status(400).json({ message: "No data in the request" });
    }

    const { error } = courseValidation(body).courseCreate;
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const newCourse = new Course({
      ...body,
      author: req.user.id // Assuming user ID is attached to req by auth middleware
    });

    const savedCourse = await newCourse.save();
    return res.status(201).json(savedCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { body } = req;
    const { error } = courseValidation(body).courseUpdate;
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(updatedCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

export { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
