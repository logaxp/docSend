import React from 'react';
import { useForm } from 'react-hook-form';

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = data => {
    console.log(data);
    // Here you would handle the submission, e.g., sending the data to an API
    reset(); // Reset the form after successful submission
  };

  return (
    <div className="container w-1/3 bg-gray-50 mt-20 mb-40 mx-auto p-8 rounded-xl">
      <h1 className="text-3xl font-semibold text-center mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
        <div className="mb-4">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Your Name"
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <input
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }})}
            placeholder="Your Email"
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <input
            {...register("subject", { required: "Subject is required" })}
            placeholder="Subject"
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.subject && <p className="text-red-500 text-xs italic">{errors.subject.message}</p>}
        </div>
        <div className="mb-4">
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Your Message"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 h-32"
          />
          {errors.message && <p className="text-red-500 text-xs italic">{errors.message.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
