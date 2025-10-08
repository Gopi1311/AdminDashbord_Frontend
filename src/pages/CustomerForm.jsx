import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { customerValidation } from "../utils/validationRules";
import {
  RoleRadio,
  RadioGroup,
  SelectField,
  InputField,
} from "../components/FormResuable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../utils/BaseURL";

const CustomerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const password = watch("password");

  const handlePincodeChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 6) value = value.slice(0, 6);
    setValue("pincode", value);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage("");
    try {
      console.log("Customer data:", data);

      await axios.post(`${BaseURL}addcustomer`, data);
      setSubmitMessage("Customer added successfully!");
      navigate("/customers");
      reset();
    } catch (error) {
      console.log(error);
      setSubmitMessage("Error adding customer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Add New Customer</h1>
            <p className="text-indigo-200 mt-1">
              Create a new customer account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                id="firstName"
                label="First Name"
                placeholder="Enter first name"
                error={errors.firstName}
                register={register("firstName", customerValidation.firstName)}
              />
              <InputField
                id="lastName"
                label="Last Name"
                placeholder="Enter last name"
                error={errors.lastName}
                register={register("lastName", customerValidation.lastName)}
              />
            </div>

            {/* Contact Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                id="phone"
                label="Phone Number"
                placeholder="Enter phone number"
                error={errors.phone}
                register={register("phone", customerValidation.phone)}
              />
              <InputField
                id="email"
                label="Email Address"
                placeholder="Enter email address"
                error={errors.email}
                register={register("email", customerValidation.email)}
              />
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Address Information
              </h3>

              <InputField
                id="streetAddress"
                label="Street Address"
                placeholder="Enter street address"
                error={errors.streetAddress}
                register={register(
                  "streetAddress",
                  customerValidation.streetAddress
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField
                  id="city"
                  label="City"
                  placeholder="Enter city"
                  error={errors.city}
                  register={register("city", customerValidation.city)}
                />
                <InputField
                  id="state"
                  label="State"
                  placeholder="Enter state"
                  error={errors.state}
                  register={register("state", customerValidation.state)}
                />
                <InputField
                  id="pincode"
                  label="Pincode"
                  placeholder="Enter 6-digit pincode"
                  error={errors.pincode}
                  register={register("pincode", customerValidation.pincode)}
                  onChange={handlePincodeChange}
                />
              </div>

              {/* Country */}
              <SelectField
                id="country"
                label="Country"
                options={[
                  "India",
                  "United States",
                  "United Kingdom",
                  "Canada",
                  "Australia",
                  "Germany",
                  "Other",
                ]}
                error={errors.country}
                register={register("country", customerValidation.country)}
              />

              {/* Address Type */}
              <RadioGroup
                label="Address Type"
                name="addressType"
                options={["Home", "Office", "Other"]}
                defaultValue="Home"
                register={register("addressType")}
              />
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Account Security
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  error={errors.password}
                  register={register("password", customerValidation.password)}
                />
                <InputField
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm password"
                  error={errors.confirmPassword}
                  register={register(
                    "confirmPassword",
                    customerValidation.confirmPassword(password)
                  )}
                />
              </div>
            </div>

            {/* Role Selection */}
            <RoleRadio register={register} error={errors.role} />

            {/* Submit Message */}
            {submitMessage && (
              <div
                className={`p-4 rounded-md ${
                  submitMessage.includes("successfully")
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Adding Customer..." : "Add Customer"}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
// InputField.jsx
