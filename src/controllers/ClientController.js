import * as Yup from "yup"
import bcrypt from "bcrypt"
import Client from '../schemas/Client'

class ClientController {
  async store(request, response) {
    const { name, email, password } = request.body;

    const errors = []
    
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("Wrong e-mail format")
        .required("Required"),
      password: Yup.string().required("Required"),
      name: Yup.string().required("Required")
    });

    try {
      await schema.validate({ email, password, name }, { abortEarly: false });
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

    const clientExists = await Client.findOne({ email });

    if (clientExists) {
      return response.status(400).json({ message: "Account already created" })
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const client = new Client({
      name, email, password: hashedPassword
    });

    try {
      const savedClient = await client.save();
      return response.status(201).json(savedClient);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async update(request, response) {
    const { name, newPassword, oldPassword } = request.body;
    const { client } = request;

    if (name) {
      client.name = name;
    }

    if (newPassword && oldPassword) {
      if ((await bcrypt.compare(oldPassword, client.password))) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        client.password = hashedPassword;

      } else {
        return response.status(400).json({ message: "Old Password does not match" })
      }
    }

    try {
      const savedClient = await client.save();
      return response.status(201).json(savedClient);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async findOne(request, response) {
    const { id } = request.params;

    try {
      const client = await Client.findById(id);
      return response.status(200).json(client);
    } catch (error) {
      return response.status(404).json({ message: "Client does not found" });
    }
  }

  async destroy(request, response) {
    const { client } = request;

    await client.remove();

    return response.status(204).json();
  }

  async findAll(request, response) {
    try {
      const clients = await Client.find()
      return response.status(200).json(clients);
    } catch (error) {
      return response.status(500).json({ message: error.message })
    }
  }

  async findSelf(request, response) {
    const { client } = request;

    return response.status(201).json(client);
  }
}

export default new ClientController();
