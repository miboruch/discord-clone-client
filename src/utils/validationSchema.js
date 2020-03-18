import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - 8 chars minimum')
    .required('Password is required')
});

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is too short - 8 chars minimum')
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,25}$/,
      'Password must contain at least 1 number'
    ),
  name: Yup.string()
    .strict()
    .min(2, 'Name too short - 2 chars minimum')
    .required('Name is required'),
  lastName: Yup.string()
    .strict()
    .min(2, 'Last name too short - 2 chars minimum')
    .required('Last name is required')
});

export const CreateRoomSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Room name is too short - 2 chars minimum')
    .required('Room name is required'),
  isPrivate: Yup.bool(),
  password: Yup.string()
    .min(3, 'Password is too short - 3 chars minimum')
});
