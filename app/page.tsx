'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  firstName: string
  lastName: string
  email: string
  linkedIn: string
  visas: string[]
  resume: FileList
  additional: string
}

const LeadForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null)

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
      } else {
        setSubmissionStatus('Submission failed.')
      }
    } catch (error) {
      setSubmissionStatus('Error submitting lead.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          {...register('firstName', { required: 'First Name is required' })}
          placeholder="First Name"
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div>
        <input
          type="text"
          {...register('lastName', { required: 'Last Name is required' })}
          placeholder="Last Name"
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      <div>
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

      <div>
        <input
          type="text"
          {...register('linkedIn', { required: 'LinkedIn profile is required' })}
          placeholder="LinkedIn Profile"
        />
        {errors.linkedIn && <p>{errors.linkedIn.message}</p>}
      </div>

      <div>
        <select
          multiple
          {...register('visas', { required: 'At least one visa option is required' })}
        >
          <option value="H1B">H1B</option>
          <option value="L1">L1</option>
          <option value="O1">O1</option>
        </select>
        {errors.visas && <p>{errors.visas.message}</p>}
      </div>

      <div>
        <input
          type="file"
          {...register('resume', { required: 'Resume is required' })}
        />
        {errors.resume && <p>{errors.resume.message}</p>}
      </div>

      <div>
        <textarea
          {...register('additional')}
          placeholder="Additional Information"
        />
      </div>

      <button type="submit">Submit</button>

      {submissionStatus && <p>{submissionStatus}</p>}
    </form>
  )
}

export default LeadForm
