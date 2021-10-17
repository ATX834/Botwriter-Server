import { Request, Response } from "express";
import UserModel from "../models/User";

export const create = (req: Request, res: Response) => {
    UserModel.create(req.body)
      .then((result) => {
        res.json({
          success: true,
          result: result,
          message: `Username ${req.body.username} has been created.`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const find = (req: Request, res: Response) => {
  UserModel.find()
    .then((result) => {
      res.json({
        success: true,
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err: err,
      });
    });
};

export const findOneBy = (req: Request, res: Response) => {
  UserModel.findOne(req.params)
    .then((result) => {
      res.json({
        success: true,
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err: err,
      });
    });
};

export const update = (req: Request, res: Response) => {
  UserModel.findOneAndUpdate(req.params, req.body)
    .then(() => {
      res.json({
        success: true,
        message: `Username ${req.params.username} has been updated.`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const remove = (req: Request, res: Response) => {
    UserModel.findOneAndDelete(req.params)
      .then(() => {
        res.json({
          success: true,
          message: `Username ${req.params.username} has been deleted.`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }