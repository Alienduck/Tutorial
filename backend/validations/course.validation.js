import joi from "joi";

export default function courseValidation(body) {
  const courseCreate = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    content: joi.string().required(),
    category: joi.string().required(),
    isPremium: joi.boolean(),
    duration: joi.number(),
    difficulty: joi.string().valid('beginner', 'intermediate', 'advanced'),
    thumbnail: joi.string(),
    author: joi.string(), // Assuming ObjectId is passed as string
    order: joi.number()
  });

  const courseUpdate = joi.object({
    title: joi.string(),
    description: joi.string(),
    content: joi.string(),
    category: joi.string(),
    isPremium: joi.boolean(),
    duration: joi.number(),
    difficulty: joi.string().valid('beginner', 'intermediate', 'advanced'),
    thumbnail: joi.string(),
    author: joi.string(),
    order: joi.number()
  });

  return {
    courseCreate: courseCreate.validate(body),
    courseUpdate: courseUpdate.validate(body)
  };
}
