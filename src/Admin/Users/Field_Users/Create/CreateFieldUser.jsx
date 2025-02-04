// import React from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import Header from "../../../../Components/Header/Header";

// const CreateFieldUser = () => {
//   return (
//     <>
//       <Header />
//       <div className="main-header-box mt-4">
//         <div className="pages-box">
//           <div className="">
//           <div
//               className="form-header mb-4"
//               style={{
//                 backgroundColor: "#8d28dd",
//                 color: "white",
//                 padding: "10px 20px",
//                 borderRadius: "8px",
//               }}
//             >
//               <h4 className="mb-0">Enter Field User Details</h4>
//             </div>
//             <Form>
//               <Row>
//                 <Col md={6}>
//                   <Form.Group className="mb-3" controlId="formName">
//                     <Form.Label>Name<span className="text-danger">*</span></Form.Label>
//                     <Form.Control type="text" placeholder="Enter Name" required />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <Form.Group className="mb-3" controlId="formEmail">
//                     <Form.Label>Email<span className="text-danger">*</span></Form.Label>
//                     <Form.Control type="email" placeholder="Enter Email" required />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <Form.Group className="mb-3" controlId="formUsername">
//                     <Form.Label>Username<span className="text-danger">*</span></Form.Label>
//                     <Form.Text className="d-block mb-1 text-muted">
//                       Field User can login via this Username
//                     </Form.Text>
//                     <Form.Control type="text" placeholder="Enter Username" required />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <Form.Group className="mb-3" controlId="formPassword">
//                     <Form.Label>Password<span className="text-danger">*</span></Form.Label>
//                     <Form.Text className="d-block mb-1 text-muted">
//                       Field User can login via this Password
//                     </Form.Text>
//                     <Form.Control type="password" placeholder="Enter Password" required />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <Form.Group className="mb-3" controlId="formContactNumber">
//                     <Form.Label>Contact Number<span className="text-danger">*</span></Form.Label>
//                     <Form.Control type="tel" placeholder="Enter Contact Number" required />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <Form.Group className="mb-3" controlId="formProfilePicture">
//                     <Form.Label>Profile Picture</Form.Label>
//                     <Form.Control type="file" />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <Form.Group className="mb-3" controlId="formCountry">
//                     <Form.Label>Country<span className="text-danger">*</span></Form.Label>
//                     <Form.Select required>
//                       <option>Select Country</option>
//                       <option>USA</option>
//                       <option>Canada</option>
//                       <option>India</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <Form.Group className="mb-3" controlId="formAddress">
//                     <Form.Label>Address<span className="text-danger">*</span></Form.Label>
//                     <Form.Control as="textarea" rows={2} placeholder="Enter Address" required />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <div className="text-center">
//                 <Button  type="submit" className="me-2" style={{
//                   backgroundColor: "#8d28dd",
//                   border:"none"
//                 }}>
//                   Save
//                 </Button>
//                 <Button variant="secondary" type="button">
//                   Cancel
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateFieldUser;

import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../../../Components/Header/Header";
import { create_FieldUser } from "../../../../lib/store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateFieldUser = () => {
  const navigate=useNavigate();
  const token = localStorage.getItem("UserToken");
 const company_id=localStorage.getItem("companyId")||null;
 const created_by=localStorage.getItem("name")||null;
 const created_by_id=localStorage.getItem("userId")||null;
  // Formik initial values and validation schema
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      contact_number: "",
      email: "",
      password: "",
      profilePicture: null,
      country: "",
      address: "",
      company_id: company_id,
      created_by: created_by,
      created_by_id:created_by_id,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      username: Yup.string().required("Username is required"),
      contact_number: Yup.string().required("Contact number is required").matches(/^[0-9]+$/, "Contact number must be digits only"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"), 
      country: Yup.string().required("Country is required"),
      address: Yup.string().required("Address is required"),
      
    }),
    onSubmit:  async(values) => {

      const formData = new FormData();
      for (const key in values) {
        if (key === "profilePicture") {
          if (values[key]) formData.append(key, values[key]);
        } else {
          formData.append(key, values[key]);
        }
      }
      console.log('Form', values);
      
      const response =await create_FieldUser(values,token);
        if(response.success){
           Swal.fire({
            title: 'Success',
            text: 'Field User Created Successfully',
            icon: 'success',
            timer: 1400, // Time in milliseconds (1400 ms = 1.4 seconds)
            showConfirmButton: false, // Optional: Hide the confirm button
          });
          formik.resetForm()
          formik.values.profilePicture = null;
          setTimeout(()=>{
           navigate(`/users/field/list`)
          },1600)
        }else{
          Swal.fire('Error',response.message,"error");
        }
      console.log('Response', response);
    },
  });
// console.log('formik.errors',formik.errors)
  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <div className="">
            <div
              className="form-header mb-4"
              style={{
                backgroundColor: "#2e2e32",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              <h4 className="mb-0">Enter Field User Details</h4>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.name && formik.errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.email && formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username<span className="text-danger">*</span></Form.Label>
                    <Form.Text className="d-block mb-1 text-muted">
                      Field User can login via this Username
                    </Form.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.username && formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                    <Form.Text className="d-block mb-1 text-muted">
                      Field User can login via this Password
                    </Form.Text>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.password && formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formContactNumber">
                    <Form.Label>Contact Number<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter Contact Number"
                      name="contact_number"
                      value={formik.values.contact_number}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.contact_number && formik.errors.contact_number}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.contact_number}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* <Col md={6}>
                  <Form.Group className="mb-3" controlId="formProfilePicture">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      name="profilePicture"
                      onChange={(e) => formik.setFieldValue("profilePicture", e.target.files[0])}
                    />
                  </Form.Group>
                </Col> */}

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formCountry">
                    <Form.Label>Country<span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.country && formik.errors.country}
                    >
                      <option value="">Select Country</option>
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="India">India</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Enter Address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.address && formik.errors.address}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center">
                <Button type="submit" className="me-2" style={{ backgroundColor: "#8d28dd", border: "none" }}>
                  Save
                </Button>
                <Button variant="secondary" type="button">
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFieldUser;
