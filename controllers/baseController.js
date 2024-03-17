/**
 * Base controller class for handling common CRUD operations.
 */
export default class BaseController {
  /**
   * Creates an instance of BaseController.
   * @param {Object} model - The model object to be used for CRUD operations.
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Retrieves all records from the model.
   * @param {Object} c - The context object for handling the HTTP response.
   * @returns {Object} - The JSON response containing the retrieved data or an error message.
   */
  async getAll(c) {
    try {
      const data = await this.model.findAll();
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }
}
