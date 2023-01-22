import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../slices/message";
import { createPlace } from "../slices/createPlace.js";
import { Link } from "react-router-dom";

const CreatePlace = () => {
  const [successfull, setSuccessfull] = useState(false);
  const [createdPlaceData, setCreatedPlaceData] = useState("");
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const creator = user.user._id;

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    name: "",
    creator: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The name must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
  });

  const handleCreatePlace = (formValue) => {
    const { name, address } = formValue;

    setSuccessfull(false);
    setCreatedPlaceData(formValue);

    dispatch(
      createPlace({
        name,
        address,
        creator,
      })
    )
      .unwrap()
      .then(() => {
        setSuccessfull(true);
      })
      .catch(() => {
        setSuccessfull(false);
      });
  };

  return (
    <div className="col-md-12 signup-form">
      <h1>{!successfull ? "Create Place" : "Place Created"}</h1>
      <div className="card card-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreatePlace}
        >
          <Form>
            <div>
              {!successfull && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">name</label>
                    <Field name="name" type="text" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">address</label>
                    <Field
                      name="address"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                      Send
                    </button>
                  </div>
                </>
              )}
            </div>
          </Form>
        </Formik>
        {successfull && (
          <>
            <div>{"Place Name: " + createdPlaceData.name}</div>
            <div>{"Creator ID: " + creator}</div>
            <Link to="/user-places">See all Your Places</Link>
          </>
        )}
      </div>

      {message && (
        <div className="form-group">
          <div
            className={
              successfull ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePlace;
