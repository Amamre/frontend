"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/app/actions";
import {
  AppButton,
  BodyCopy,
  FieldError,
  FieldTitle,
  FormGrid,
} from "@/components/ui/Primitives";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import {
  type ContactFormData,
  createContactFormSchema,
} from "@/lib/validation";

export function ContactForm() {
  const t = useTypedTranslations("forms");
  const contactFormSchema = useMemo(
    () =>
      createContactFormSchema({
        cityRequired: t("validation.cityRequired"),
        consentRequired: t("validation.consentRequired"),
        countryRequired: t("validation.countryRequired"),
        emailInvalid: t("validation.emailInvalid"),
        firstNameRequired: t("validation.firstNameRequired"),
        lastNameRequired: t("validation.lastNameRequired"),
        messageMin: t("validation.messageMin"),
        nameMin: t("validation.nameMin"),
        passwordMin: t("validation.passwordMin"),
        passwordsMatch: t("validation.passwordsMatch"),
        postalCodeRequired: t("validation.postalCodeRequired"),
        reviewMin: t("validation.reviewMin"),
        searchRequired: t("validation.searchRequired"),
        stateRequired: t("validation.stateRequired"),
        streetRequired: t("validation.streetRequired"),
        subjectMin: t("validation.subjectMin"),
        titleMin: t("validation.titleMin"),
      }),
    [t],
  );
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
          <FieldTitle>{t("contact.name")}</FieldTitle>
          <TextField {...register("name")} autoComplete="name" />
          {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
        </Box>
        <Box component="label">
          <FieldTitle>{t("contact.email")}</FieldTitle>
          <TextField {...register("email")} autoComplete="email" type="email" />
          {errors.email ? (
            <FieldError>{errors.email.message}</FieldError>
          ) : null}
        </Box>
      </FormGrid>
      <Box component="label">
        <FieldTitle>{t("contact.subject")}</FieldTitle>
        <TextField {...register("subject")} />
        {errors.subject ? (
          <FieldError>{errors.subject.message}</FieldError>
        ) : null}
      </Box>
      <Box component="label">
        <FieldTitle>{t("contact.message")}</FieldTitle>
        <TextField {...register("message")} multiline minRows={5} />
        {errors.message ? (
          <FieldError>{errors.message.message}</FieldError>
        ) : null}
      </Box>
      <AppButton disabled={isPending} type="submit" variant="primary">
        {isPending ? t("contact.sending") : t("contact.send")}
      </AppButton>
      {message ? <BodyCopy>{message}</BodyCopy> : null}
    </Box>
  );
}
