import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './LoginPage.module.css';
import { BsFillPersonFill, BsKeyFill } from 'react-icons/bs';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { useState } from 'react';
import { LoginSchema } from '../../validationSchemas/LoginSchema';

export default function LoginPage() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const onButtonEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleSubmitLogin = (values, actions) => {
    console.log('values', values);
    actions.resetForm();
  };

  return (
    <div className={css.wrapper}>
    <div className={css.page}>
      <h1 className={css.header}>Вхід</h1>
      <p className={css.text}>Welcome to Assist CONTROL</p>

      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmitLogin}
      >
        <Form className={css.form}>
          <div className={css.inputWrapper}>
            <label htmlFor="login" className={css.loginLabel}>
              Логін*
            </label>
            <div className={css.inputWithIconWrapper}>
              <BsFillPersonFill className={css.inputIcon} />
              <Field
                name="login"
                type="text"
                className={css.input}
                placeholder="0733291544"
              />
            </div>
            <ErrorMessage
              name="login"
              component="div"
              className={css.errorMsg}
            />
          </div>
          <div className={css.inputWrapper}>
            <label htmlFor="password" className={css.loginLabel}>
              Пароль*
            </label>
            <div className={css.inputWithIconWrapper}>
              <BsKeyFill className={css.inputIcon} />
              <Field
                name="password"
                type={isPasswordShown ? 'text' : 'password'}
                className={css.input}
                placeholder="password"
              />
              {isPasswordShown ? (
                <ImEye className={css.eyeIcon} onClick={onButtonEyeClick} />
              ) : (
                <ImEyeBlocked
                  className={css.eyeIcon}
                  onClick={onButtonEyeClick}
                />
              )}
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={css.errorMsg}
            />
          </div>
          <p className={css.link}>Забули пароль?</p>
          <button type="submit" className={css.submitBtn}>
            Увійти
          </button>
        </Form>
      </Formik>
      </div>
      </div>
  );
}
