/* eslint-disable import/prefer-default-export */
import Model from '../models';

const { Location } = Model;

export const validatePopulation = (req, res, next) => {
  if (req.body.parentLocationId !== undefined && Number.isNaN(req.body.parentLocationId) === false) {
    return Location.findOne({ where: { id: req.body.parentLocationId } })
      .then(parentLocation => {
        if (!parentLocation) {
          return res.status(404).send({ status: 'Error', message: 'Parent location not found' });
        }

        if (Number(parentLocation.malePopulation) < Number(req.body.malePopulation) ||
          Number(parentLocation.femalePopulation) < Number(req.body.femalePopulation)) {
          return res.status(400).send({
            status: "Error",
            message: "Location populations should not be greater than that of parent location",
            data: {
              parentLocation,
            },
          });
        }
        return next();
      });
  }
  return next();
};

export const validatePopulationforUpdateLocation = (req, res, next) => {
  if (req.body.parentLocationId !== undefined) {
    return validatePopulation(req, res, next);
  }
  return next();
};

export const validateAddLocationDetails = (req, res, next) => {
  const {
    name, malePopulation, femalePopulation, parentLocationId
  } = req.body;

  if (name === undefined || name.trim().length === 0) {
    return res.status(400).send({
      status: 'Error',
      message: "Name of location is required",
    });
  }

  if (malePopulation === undefined ||
    Number.isInteger(Number(malePopulation.trim()) === false)) {
    return res.status(400).send({
      status: 'Error',
      message: "Valid male population is required",
    });
  }

  if (femalePopulation === undefined ||
    Number.isInteger(Number(femalePopulation.trim()) === false)) {
    return res.status(400).send({
      status: 'Error',
      message: "Valid female population is required",
    });
  }


  if (parentLocationId !== undefined &&
    Number.isInteger(Number(parentLocationId.trim())) === false) {
    return res.status(400).send({
      status: 'Error',
      message: "Valid parent location id is required.",
    });
  }

  if (malePopulation !== undefined && malePopulation.trim().length === 0) {
    return res.status(400).send({
      status: 'Error',
      message: "Male population value id should not be empty",
    });
  }

  if (femalePopulation !== undefined && femalePopulation.trim().length === 0) {
    return res.status(400).send({
      status: 'Error',
      message: "Female population value id should not be empty",
    });
  }

  if (parentLocationId !== undefined && parentLocationId.trim().length === 0) {
    return res.status(400).send({
      status: 'Error',
      message: "Parent location id should not be empty",
    });
  }

  return next();
};

export const validateUpdateLocationDetails = (req, res, next) => {
  const {
    name, malePopulation, femalePopulation, parentLocationId
  } = req.body;

  if (name !== undefined && name.trim().length === 0) {
    return res.status(400).send({
      status: 'Error',
      message: "Invalid name of location",
    });
  }

  if (malePopulation !== undefined &&
    Number.isInteger(Number(malePopulation.trim())) === false) {
    return res.status(400).send({
      status: 'Error',
      message: "Valid male population is required",
    });
  }

  if (femalePopulation !== undefined &&
    Number.isInteger(Number(femalePopulation.trim())) === false) {
    return res.status(400).send({
      status: 'Error',
      message: "Valid female population is required",
    });
  }

  if (parentLocationId !== undefined &&
    Number.isInteger(Number(parentLocationId.trim())) === false) {
    return res.status(400).send({
      status: 'Error',
      message: "Valid parent location id is required",
    });
  }

  if (parentLocationId !== undefined &&
    Number.isInteger(Number(parentLocationId.trim())) === false) {
    return res.status(400).send({
      status: 'Error',
      message: "Valid parent location id is required.",
    });
  }

  if (malePopulation !== undefined && malePopulation.trim().length === 0) {
    return res.status(400).send({
      status: 'Error',
      message: "Male population value id should not be empty",
    });
  }

  if (femalePopulation !== undefined && femalePopulation.trim().length === 0) {
    return res.status(400).send({
      status: 'Error',
      message: "Female population value id should not be empty",
    });
  }

  return next();
};

