import * as yup from 'yup'

export const SignInSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required')
})
export const SignUpSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  password: yup.string().min(7).required('Password is required')
})
