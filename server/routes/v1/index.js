import LocationController from '../../controllers/locationController';
import {
  validatePopulation,
  validateAddLocationDetails,
  validateUpdateLocationDetails,
  validatePopulationforUpdateLocation,
} from "../../middlewares/validation";

const routes = (app) => {
  app.route('/')
    .get((req, res) => res.redirect("/api/v1"));

  app.route('/api/v1')
    .get((req, res) => res.send({ title: 'Welcome to my Population Management System' }));

  app.route('/api/v1/locations')
    .get(LocationController.getAllLocations)
    .post(validateAddLocationDetails, validatePopulation, LocationController.addLocation);

  app.route('/api/v1/locations/:id')
    .get(LocationController.getLocation)
    .put(validateUpdateLocationDetails, validatePopulationforUpdateLocation, LocationController.updateLocation)
    .delete(LocationController.deleteLocation);

  app.all("*", (req, res) =>
    res.status(404).send({
      status: "Error",
      message: "Sorry, resource not found"
    }));
};

export default routes;
