'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import styles from './form.module.css'

interface FormData {
  firstName: string
  lastName: string
  email: string
  linkedIn: string
  visas: string[]
  resume: FileList
  additional: string
}

export const LeadForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null)

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('firstName', data.firstName)
      formDataToSubmit.append('lastName', data.lastName)
      formDataToSubmit.append('email', data.email)
      formDataToSubmit.append('linkedIn', data.linkedIn)
      formDataToSubmit.append('visas', data.visas.join(','))
      formDataToSubmit.append('resume', data.resume[0])
      formDataToSubmit.append('additional', data.additional)

      const response = await fetch('/api/leads', {
        method: 'POST',
        body: formDataToSubmit,
      })

      if (response.ok) {
        setSubmissionStatus('Lead submitted successfully!')
        router.push('/form-submitted');
      } else {
        setSubmissionStatus('Submission failed.')
      }
    } catch (error) {
      setSubmissionStatus('Error submitting lead.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.leadsForm}>
      <div className={styles.formField}>
        <input
          type="text"
          {...register('firstName', { required: 'First Name is required' })}
          placeholder="First Name"
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div className={styles.formField}>
        <input
          type="text"
          {...register('lastName', { required: 'Last Name is required' })}
          placeholder="Last Name"
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      <div className={styles.formField}>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: 'Please enter a valid email',
            }
          })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className={styles.formField}>
        <input
          type="text"
          {...register('linkedIn', { required: 'LinkedIn profile is required' })}
          placeholder="LinkedIn Profile"
        />
        {errors.linkedIn && <p>{errors.linkedIn.message}</p>}
      </div>

      <div className={styles.visas}>
        <span>
          Visa categories of interest?
        </span>
        <div className={styles.formField}>
          {['O-1', 'EB-1A', 'EB-2 NIW', 'I don\'t know'].map((visa) => (
            <label key={visa} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={visa}
                {...register('visas', { required: 'At least one visa option is required' })}
              />
              {visa}
            </label>
          ))}
          {errors.visas && <p className={styles.errorText}>{errors.visas.message}</p>}
        </div>
      </div>


      <div className={styles.formField}>
        <input
          type="file"
          {...register('resume', { required: 'Resume is required' })}
        />
        {errors.resume && <p>{errors.resume.message}</p>}
      </div>

      <div className={styles.visas}>
        <span>How can we help you?</span>
        <div className={styles.formField}>
          <textarea
            {...register('additional')}
            placeholder="Additional Information..."
          />
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>Submit</button>

      {submissionStatus && <p className={styles.status}>{submissionStatus}</p>}
    </form>
  )
}