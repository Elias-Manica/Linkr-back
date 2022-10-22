import postSchema from '../schemas/postSchema.js';

async function validatePostSchema(req, res, next){
    const { link, text } = req.body;


    try {
    
      const model = postSchema.validate(req.body, {
        abortEarly: false,
      });
      if (model.error) {
        const postError = model.error.details.map((e) => e.message);
       return res.status(400).send("Houve um erro ao publicar o seu link");
      }
      
    } catch (error) {
      console.error(error);
      return res.status(500).send("Deu ruim")
    }
    next();
  }
  
export default validatePostSchema;