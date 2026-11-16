import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import PrimaryButton from "./PrimaryButton";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <section className="contact min-h-dvh/2 w-full bg-gray-200 p-20 flex flex-col items-center">
      <div className="min-w-100">
        <h2>Contact me</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p role="alert" className="text-red-500 text-base">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Name</label>
            <input
              id="name"
              type="text"
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p role="alert" className="text-red-500 text-base">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              aria-invalid={errors.message ? "true" : "false"}
              {...register("message", { required: "message is required" })}
              rows={5}
              cols={33}
              maxLength={500}
            />
            {errors.message && (
              <p role="alert" className="text-red-500 text-base">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex flex-row justify-center">
            <PrimaryButton label="Submit" />
          </div>
        </form>
      </div>
    </section>
  );
}
