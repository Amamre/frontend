"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/app/actions";
import {
  AppButton,
  BodyCopy,
  FieldError,
  FieldTitle,
  FormGrid,
} from "@/components/ui/Primitives";
import { type ContactFormData, contactFormSchema } from "@/lib/validation";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormData) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("subject", values.subject);
    formData.set("message", values.message);

    startTransition(async () => {
      const result = await submitContact({ ok: false, message: "" }, formData);
      setMessage(result.message);

      if (result.ok) {
        reset();
      }
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "grid", gap: 2 }}
    >
      <FormGrid>
        <Box component="label">
          <FieldTitle>Name</FieldTitle>
          <TextField {...register("name")} autoComplete="name" />
          {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
        </Box>
        <Box component="label">
          <FieldTitle>Email</FieldTitle>
          <TextField {...register("email")} autoComplete="email" type="email" />
          {errors.email ? (
            <FieldError>{errors.email.message}</FieldError>
          ) : null}
        </Box>
      </FormGrid>
      <Box component="label">
        <FieldTitle>Subject</FieldTitle>
        <TextField {...register("subject")} />
        {errors.subject ? (
          <FieldError>{errors.subject.message}</FieldError>
        ) : null}
      </Box>
      <Box component="label">
        <FieldTitle>Message</FieldTitle>
        <TextField {...register("message")} multiline minRows={5} />
        {errors.message ? (
          <FieldError>{errors.message.message}</FieldError>
        ) : null}
      </Box>
      <AppButton disabled={isPending} type="submit" variant="primary">
        {isPending ? "Sending" : "Send message"}
      </AppButton>
      {message ? <BodyCopy>{message}</BodyCopy> : null}
    </Box>
  );
}
