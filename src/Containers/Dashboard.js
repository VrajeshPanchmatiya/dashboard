import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import View from "../Containers/Assets/view.png";
import Delete from "../Containers/Assets/delete.png";
import Modal from "react-modal";
import Edit from "../Containers/Assets/editing.png";
import {
  userFormAction,
  searchAction,
  sortingAction,
  sortingCharacterAction,
  deleteAction,
  userEditFormAction,
} from "../Redux/UserForm/userFormAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [display, showDisplay] = useState("");
  const [find, setFind] = useState("");
  const [check, setCheck] = useState([]);
  const [table, showTable] = useState(true);
  const [currentsort, setCurrentSort] = useState(true);
  const [config, setConfig] = useState(true);
  const formikRef = useRef();
  const [imag, setImag] = useState();
  const [editModalIsOpen, setEditIsOpen] = useState(false);
  const [edt, setEdt] = useState("");
  const [startingValues, setStartingValues] = useState({
    Id: "",
    FirstName: "",
    LastName: "",
    Age: "",
    Email: "",
    Photo1: "",
  });
  const [currentMode, setCurrentMode] = useState(true);
  // User Information
  const info = useSelector((state) => {
    return state?.detail?.data;
  });
  console.log(info);
  // Searched Information
  const searched = useSelector((state) => {
    return state?.detail?.search;
  });

  useEffect(() => {
    setCheck(searched);
  }, [searched, display, imag]);
  // Search the Value
  const search = () => {
    showTable(false);
    dispatch(searchAction(find));
  };

  const onSortChange = () => {
    dispatch(sortingAction(currentsort));
    setCurrentSort(!currentsort);
  };
  // For Sorting A-z or z-A
  const requestSort = (key) => {
    dispatch(sortingCharacterAction(key, config));
    setConfig(!config);
  };

  const dispatch = useDispatch();
  const openModal = () => {
    setIsOpen(true);
  };
  const openEditModal = () => {
    setEditIsOpen(true);
  };
  const closeEditModal = () => {
    setEditIsOpen(false);
    setEdt("");
  };
  const closeModal = () => {
    setIsOpen(false);
    setStartingValues({});
  };
  const handleView = (item) => {
    showDisplay(item);
    showModal();
  };
  // For Delete the selected user
  const handleDelete = (id) => {
    dispatch(deleteAction(id));
  };
  const showModal = () => {
    setViewModal(true);
  };
  const hideModal = () => {
    setViewModal(false);
  };
  const searchinput = (e) => {
    setFind(e.target.value.toLowerCase());
    showTable(true);
  };

  const handleEdit = (detail) => {
    console.log(detail);
    setStartingValues({
      Id: detail.Id,
      FirstName: detail.FirstName,
      LastName: detail.LastName,
      Age: detail.Age,
      Email: detail.Email,
      Photo1: detail.Photo1,
    });
    setCurrentMode(false);
    openModal();
    // openEditModal();
  };
  const AddUser = () => {
    setCurrentMode(true);
    openModal();
  };
  // useEffect(() => {}, [startingValues]);
  return (
    <>
      <div className="main-contain">
        <div className="topnav">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search.."
              onChange={searchinput}
              name="search"
            />
            <button type="submit" onClick={search}>
              Submit
            </button>
          </div>
        </div>
        <div className="aside">
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <p onClick={AddUser}>Add User</p>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>
        </div>

        <div className="container">
          <table>
            <tbody>
              <tr>
                <th>Id</th>
                <th colSpan="2" onClick={() => requestSort("FirstName")}>
                  FirstName
                </th>
                <th colSpan="2" onClick={() => requestSort("LastName")}>
                  LastName
                </th>
                <th colSpan="1" onClick={() => onSortChange()}>
                  Age
                </th>
                <th colSpan="2">Email</th>
                <th colSpan="2">Photo</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {table === true ? (
                info?.map(({ Id, FirstName, LastName, Age, Email, Photo1 }) => {
                  return (
                    <tr key={Id}>
                      <td>{Id}</td>
                      <td colSpan={2}>{FirstName}</td>
                      <td colSpan={2}>{LastName}</td>
                      <td>{Age}</td>
                      <td colSpan={2}>{Email}</td>
                      <td colSpan={2}>
                        <img src={Photo1} height="50px" width="50px" />
                      </td>
                      <td>
                        <img
                          src={View}
                          height="25px"
                          width="25px"
                          onClick={() =>
                            handleView({
                              Id,
                              FirstName,
                              LastName,
                              Age,
                              Email,
                              Photo1,
                            })
                          }
                        />
                      </td>
                      <td>
                        <img
                          src={Edit}
                          height="25px"
                          width="25px"
                          onClick={() =>
                            handleEdit({
                              Id,
                              FirstName,
                              LastName,
                              Age,
                              Email,
                              Photo1,
                            })
                          }
                        />
                      </td>
                      <td>
                        <img
                          src={Delete}
                          height="25px"
                          width="25px"
                          onClick={() => handleDelete(Id)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : check.length > 0 ? (
                check.map(({ Id, FirstName, LastName, Age, Email, Photo1 }) => {
                  return (
                    <tr key={Id}>
                      <td>{Id}</td>
                      <td colSpan={2}>{FirstName}</td>
                      <td colSpan={2}>{LastName}</td>
                      <td>{Age}</td>
                      <td colSpan={2}>{Email}</td>
                      <td colSpan={2}>
                        <img src={Photo1} height="50px" width="50px" />
                      </td>
                      <td>
                        <img
                          src={View}
                          height="25px"
                          width="25px"
                          onClick={() =>
                            handleView({
                              Id,
                              FirstName,
                              LastName,
                              Age,
                              Email,
                              Photo1,
                            })
                          }
                        />
                      </td>
                      <td>
                        <img
                          src={Edit}
                          height="25px"
                          width="25px"
                          onClick={() =>
                            handleEdit({
                              Id,
                              FirstName,
                              LastName,
                              Age,
                              Email,
                              Photo1,
                            })
                          }
                        />
                      </td>
                      <td>
                        <img
                          src={Delete}
                          height="25px"
                          width="25px"
                          onClick={() => handleDelete(Id)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h3>No Records Found</h3>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={viewModal}
        onRequestClose={hideModal}
        className="content"
        ariaHideApp={false}
      >
        <>
          <div className="containr">
            <div className="left-column">
              <img src={display.Photo1} alt="ok" />
            </div>

            {/* <!-- Right Column --> */}
            <div className="right-column">
              {/* <!-- Product Description --> */}
              <div className="product-description">
                <span>Id: {display.Id}</span>
                <h2>
                  {display.FirstName} {display.LastName}
                </h2>
                <h3>AGE: {display.Age}</h3>
                <h5>Email: {display.Email}</h5>
                <p>
                  A human is a member of the species Homo sapiens, which means
                  'wise man' in Latin. Carolus Linnaeus put humans in the
                  mammalian order of primates. ... Humans have a very complex
                  brain, which is much larger than that of the other living
                  apes. They use language, make ideas, and feel emotions.
                </p>
              </div>
            </div>
          </div>
        </>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="content"
        ariaHideApp={false}
      >
        <div className="cont">
          <h1>Add User</h1>
          <Formik
            enableReinitialize
            innerRef={formikRef}
            initialValues={startingValues}
            validationSchema={Yup.object().shape({
              Email: Yup.string()
                .email("Please Enter Valid Email")
                .required("Please Enter Email"),
              FirstName: Yup.string()
                .max(
                  30,
                  "First name is too long, can not be greater than 30 characters"
                )
                .required("First name is required"),
              LastName: Yup.string()
                .max(
                  30,
                  "Last name is too long, can not be greater than 30 characters"
                )
                .required("Last name is required"),
              Age: Yup.string().required("Age required"),
              Photo1: Yup.mixed().required(),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              if (currentMode === true) {
                values.Id = new Date().getUTCMilliseconds();
                console.log(values.Photo1);

                const { Id, FirstName, LastName, Age, Email, Photo1 } = values;
                // const { FirstName, } = values;
                var formData = new FormData();
                formData.append("Id", Id);
                formData.append("FirstName", FirstName);
                formData.append("LastName", LastName);
                formData.append("Age", Age);
                formData.append("Email", Email);
                formData.append("Photo1", Photo1);
                const formEntry = formData.entries();
                const lol = Object.assign(
                  ...Array.from(formEntry, ([name, values]) => ({
                    [name]: values,
                  }))
                );

                showTable(true);
                dispatch(userFormAction(lol));
              }
              if (currentMode === false) {
                values.Id = startingValues?.Id;
                console.log(values);
                const { Id, FirstName, LastName, Age, Email, Photo1 } = values;
                // const { FirstName, } = values;
                console.log(Id);
                var formData = new FormData();
                formData.append("Id", Id);
                formData.append("FirstName", FirstName);
                formData.append("LastName", LastName);
                formData.append("Age", Age);
                formData.append("Email", Email);
                formData.append("Photo1", Photo1);
                const formEntry = formData.entries();
                const lol = Object.assign(
                  ...Array.from(formEntry, ([name, values]) => ({
                    [name]: values,
                  }))
                );
                console.log(lol);
                showTable(true);
                dispatch(userEditFormAction(lol));
              }
              setSubmitting(false);
              resetForm({});
              closeModal();
              setImag("");
              setStartingValues({});
            }}
          >
            {(formProps) => (
              <Form>
                <div>
                  <Field
                    name="FirstName"
                    placeholder="First Name"
                    type="text"
                    // value={startingValues.FirstName}
                    // onChange={(e) => {
                    //   setStartingValues({ FirstName: e.target.value });
                    // }}
                  />
                  <ErrorMessage name="FirstName" />
                  <Field name="LastName" placeholder="Last Name" type="text" />
                  <ErrorMessage name="LastName" />
                  <Field name="Age" placeholder="Age" type="text" />
                  <ErrorMessage name="Age" />
                  <Field name="Email" placeholder="Email" type="text" />
                  <ErrorMessage name="Email" />
                </div>
                <div>
                  <Field
                    name="file"
                    type="file"
                    // onChange={(e) => {
                    //   setStartingValues({
                    //     Photo1: (
                    //       window.URL || window.webkitURL
                    //     ).createObjectURL(e.target.files[0]),
                    //   });
                    // }}
                    onChange={(e) => {
                      // setImag(e.target.files[0].name);
                      setImag(
                        (window.URL || window.webkitURL).createObjectURL(
                          e.target.files[0]
                        )
                      );
                      formProps.setFieldValue(
                        "Photo1",
                        (window.URL || window.webkitURL).createObjectURL(
                          e.target.files[0]
                        )
                      );
                    }}
                  />
                  <ErrorMessage name="Photo1" />

                  <p>
                    {imag ? (
                      <img src={imag} height="50px" width="50px" />
                    ) : startingValues.Photo1 ? (
                      <img
                        src={startingValues.Photo1}
                        height="50px"
                        width="50px"
                      />
                    ) : (
                      "No File Choosen"
                    )}
                  </p>
                </div>
                <div>
                  <input type="submit" value="Submit" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};
export default Dashboard;
