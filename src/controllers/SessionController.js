class SessionController {
  async store(request, response) {

    return response.status(201).json({ response: "login" });
  }
}

export default new SessionController();
