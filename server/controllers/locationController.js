/* eslint-disable function-paren-newline */
import Model from '../models';

const { Location } = Model;

class LocationController {
  static addLocation(req, res) {
    const {
      name, malePopulation, femalePopulation, parentLocationId
    } = req.body;

    return Location.findOne({ where: { name: name.toLowerCase().trim(), parentLocationId: parentLocationId && parentLocationId.trim() } })
      .then(existingLocation => {
        if (existingLocation) {
          return res.status(409).send({
            status: 'Fail',
            message: 'Location already exists',
            data: {
              name: `${existingLocation.name[0].toUpperCase()}${existingLocation.name.slice(1)}`,
              malePopulation: existingLocation.malePopulation,
              femalePopulation: existingLocation.femalePopulation,
              totalPopulation: existingLocation.totalPopulation,
              parentLocationId: existingLocation.parentLocationId,
              createdAt: existingLocation.createdAt,
              updatedAt: existingLocation.updatedAt,
            }
          });
        }

        return Location.create({
          name: name.toLowerCase(),
          malePopulation,
          femalePopulation,
          totalPopulation: Number(malePopulation) + Number(femalePopulation),
          parentLocationId,
        }).then(savedLocation => res.status(200).send({
          status: 'Success',
          message: 'Location created',
          data: {
            id: savedLocation.id,
            name: `${savedLocation.name[0].toUpperCase()}${savedLocation.name.slice(1)}`,
            malePopulation: savedLocation.malePopulation,
            femalePopulation: savedLocation.femalePopulation,
            totalPopulation: savedLocation.totalPopulation,
            parentLocationId: savedLocation.parentLocationId,
            createdAt: savedLocation.createdAt,
            updatedAt: savedLocation.updatedAt,
          },
        }));
      }).catch(
        /* istanbul ignore next */
        e => res.status(500).send({
          status: 'Error',
          message: "There was an error in saving the location. Pls try again"
        }));
  }

  static updateLocation(req, res) {
    const {
      name, malePopulation, femalePopulation, parentLocationId
    } = req.body;
    const { id } = req.params;
    Location.findOne({
      where: {
        id,
      }
    }).then(existingLocation => {
      if (!existingLocation) {
        return res.status(404).send({ status: 'Error', message: 'Location not found' });
      }
      Location.update({
        name: name || existingLocation.name,
        malePopulation: malePopulation || existingLocation.malePopulation,
        femalePopulation: femalePopulation || existingLocation.femalePopulation,
        totalPopulation: (Number(malePopulation) + Number(femalePopulation)) ||
        Number(existingLocation.malePopulation) + Number(existingLocation.femalePopulation),
        parentLocationId: parentLocationId || existingLocation.parentLocationId,
      }, {
        where: {
          id: id,
        }
      }).then(updated => res.status(200).send({
        status: 'Success',
        message: 'Location Updated',
        data: updated[0] === 1 ?
          { id } : existingLocation

      }));
    }).catch(
      /* istanbul ignore next */
      e => res.status(500).send({
        status: ' Server Error',
        message: 'Cannot update location'
      }));
  }

  static getAllLocations(req, res) {
    Location.findAll()
      .then(locations => {
        res.status(200).send({
          status: 'Success',
          message: 'All Locations retrieved',
          data: locations
        });
      }).catch(
        /* istanbul ignore next */
        e => res.status(500).send({
          status: ' Server Error',
          message: 'Cannot retrieve all locations',
        }));
  }

  static getLocation(req, res) {
    const { id } = req.params;
    Location.findOne({
      where: { id },
      include: [{
        model: Location,
        as: 'childLocations'
      }]
    })
      .then(location => {
        if (!location) {
          return res.status(404).send({ status: 'Error', message: 'Location does not exist' });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'Location found',
          data: {
            id: location.id,
            name: `${location.name[0].toUpperCase()}${location.name.slice(1)}`,
            malePopulation: location.malePopulation,
            femalePopulation: location.femalePopulation,
            totalPopulation: location.totalPopulation,
            parentLocationId: location.parentLocationId,
            createdAt: location.createdAt,
            updatedAt: location.updatedAt,
            childLocations: location.childLocations,
          },
        });
      }).catch(
        /* istanbul ignore next */
        e => res.status(500).send({
          status: ' Server Error',
          message: 'Cannot retrieve location'
        }));
  }

  static deleteLocation(req, res) {
    const { id } = req.params;
    Location.findOne({ where: { id } })
      .then(location => {
        if (!location) {
          return res.status(404).send({ status: 'Error', message: 'Location does not exist' });
        }
        Location.destroy({ where: { id } })
          .then(updated => res.status(200).send({
            status: updated === 1 ? 'Success' : "Error",
            message: updated === 1 ?
              "Location deleted successfully" : "Location not deleted successfully"
          }));
      }).catch(
        /* istanbul ignore next */
        e => res.status(500).send({
          status: ' Server Error',
          message: 'Cannot delete location',
          data: {
            id,
          }
        }));
  }
}

export default LocationController;
