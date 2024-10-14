'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPromotion, getCompany, Promotion } from '@/lib/api';
import Button from '@/app/components/button';
import InputField from '@/app/components/input-field';
import LogoUploader from '@/app/components/logo-uploader';

export type PromotionFieldValues = {
  title: string;
  description: string;
  discount: string | number;
};

const initialValues: PromotionFieldValues = {
  title: '',
  description: '',
  discount: '',
};

export interface PromotionFormProps {
  companyId: string;
  onSubmit?: (values: PromotionFieldValues) => void | Promise<void>;
}

export default function PromotionForm({
  companyId,
  onSubmit,
}: PromotionFormProps) {
  // отримуємо  queryClient
  const queryClient = useQueryClient();

  const { data: company } = useQuery({
    queryKey: ['companies', companyId],
    queryFn: () => getCompany(companyId),
    staleTime: 10 * 1000,
    enabled: Boolean(companyId),
  });

  // хук useMutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPromotion, // передача функції в хук

    onSuccess: (data) => {
      // запит - виклик ф-ції  invalidateQueries з фільтром [ключ-companyId, опції]
      // queryClient.invalidateQueries({
      //   queryKey: ['promotions', companyId],
      // });

      // як що дані в запиті на створення повертаються в тому ж вигляді, що й при отриманні, то можемо самостійно оновити список без надсилання запиту
      // перший параметр - ключ, другий -ф-ція, що повертає з cash оновлені дані
      queryClient.setQueryData(
        ['promotions', companyId],
        (oldData: Promotion[] | undefined) => {
          if (oldData) {
            return oldData.concat(data);
          }
        },
      );

      // queryClient.invalidateQueries({
      //   queryKey: ['promotions'],
      //   exact: true, // для указания того, должен ли ключ запроса точно соответствовать предоставленному массиву ключей запроса или нет.
      // Без 'exact: true' - ф-ция сделает недействительным любой запрос, начинающийся с ['promotions', '...'],
      // С 'exact: true' - будет делать недействительными только запросы, которые точно соответствуют ['promotions'], исключая любые дополнительные параметры. Например,  будет делать недействительными только запросы с ключом ['promotions']
      // });

      queryClient.setQueryData(
        ['promotions'],
        (oldData: Promotion[] | undefined) => {
          if (oldData) {
            return oldData.concat(data);
          }
        },
      );
    },
  });

  // callback submit form
  const handleSubmit = async (values: PromotionFieldValues) => {
    if (!company) {
      return;
    }
    // виклик мутації
    await mutateAsync({
      ...values,
      discount: Number(values.discount) || 0,
      companyId: company.id,
      companyTitle: company.title,
    });

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-10">
        <p className="mb-0.5 text-xl">Add new promotion</p>
        <div className="flex flex-col gap-5">
          <InputField required label="Title" placeholder="Title" name="title" />
          <InputField
            required
            label="Description"
            placeholder="Description"
            name="description"
          />
          <InputField
            required
            type="number"
            label="Discount"
            placeholder="Discount"
            name="discount"
          />
          <LogoUploader square label="Image" placeholder="Upload photo" />
        </div>
        <Button type="submit" disabled={isPending}>
          Add promotion
        </Button>
      </Form>
    </Formik>
  );
}
