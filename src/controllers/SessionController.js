import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import bcrypt from "bcrypt"
import Client from "../schemas/Client"

import authConfig from '../../config/auth';

class SessionController {
  async store(request, response) {
    const errors = []
    
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("Wrong e-mail format")
        .required("Required"),
      password: Yup.string().required("Required"),
    });

    const { email, password } = request.body;

    try {
      await schema.validate({ email, password }, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push({
          field: error.path,
          message: error.message
        });
      });
    }

    if (errors.length) {
      return response.status(400).json(errors);
    }

    const client = await Client.findOne({ email });

    if (!client) {
      return response.status(400).json({ message: "Email or password does not match" })
    }

    if (!(await bcrypt.compare(password, client.password))) {
      return response.status(400).json({ message: "Email or password does not match" })
    }

    const token = jwt.sign({
      clientId: client.id
    }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return response.status(200).json({
      client, token
    })
  }
}

export default new SessionController();
