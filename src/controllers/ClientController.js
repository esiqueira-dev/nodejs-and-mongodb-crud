class ClientController {
  async store(request, response) {

    return response.status(201).json({ response: "Store" });
  }

  async update(request, response) {

    return response.status(201).json({ response: "update" });
  }

  async findOne(request, response) {

    return response.status(201).json({ response: "find one" });
  }

  async destroy(request, response) {

    return response.status(201).json({ response: "destroy" });
  }

  async findAll(request, response) {

    return response.status(201).json({ response: "find all" });
  }

  async findSelf(request, response) {

    return response.status(201).json({ response: "find self" });
  }
}

export default new ClientController();
