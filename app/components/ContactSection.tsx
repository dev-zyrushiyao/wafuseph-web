"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import PrimaryButton from "./PrimaryButton";

type ContactFormProp = {
  senderName: string;
  email: string;
  message: string;
};

type Validation = Partial<Record<keyof ContactFormProp, string>>;

//spring boot response entity return (controller)
type ContactStatus = { contactStatus: string };

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ContactFormProp>();

  const onSubmit: SubmitHandler<ContactFormProp> = async (data) => {
    const res = await fetch("http://localhost:8080/api/contact/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 409) {
      const errorBody = (await res.json()) as ContactStatus;

      alert(errorBody.contactStatus);
      return;
    }

    if (!res.ok) {
      const errorBody = (await res.json()) as Validation;
      Object.entries(errorBody).forEach(([field, message]) => {
        if (message) {
          setError(field as keyof ContactFormProp, { type: "server", message });
        }
      });

      return;
    }

    const successBody = (await res.json()) as ContactStatus;
    await alert(successBody.contactStatus);
    reset();
  };

  return (
    <section
      id="contact"
      className="contact min-h-dvh/2 w-full bg-gray-200 p-20 flex flex-col items-center"
    >
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
              // aria-invalid={errors.email ? "true" : "false"}
              {...register("email")}
            />
            {errors.email && (
              <p role="alert" className="text-red-500 text-base">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="senderName">Name</label>
            <input
              id="senderName"
              type="text"
              // aria-invalid={errors.senderName ? "true" : "false"}
              {...register("senderName")}
            />
            {errors.senderName && (
              <p role="alert" className="text-red-500 text-base">
                {errors.senderName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register("message")}
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
            <PrimaryButton disabled={isSubmitting} label={`Submit`} />
          </div>
        </form>
      </div>
    </section>
  );
}
