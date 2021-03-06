import styles from "./form.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import React, { FC, FormEvent, useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";
import { useSelector, useDispatch } from "../services/hooks";
import { changePasswordRequest } from "../services/actions/actionsPassword";


export const ResetPassword: FC = () => {
  const { values, handleChange } =
    useFormAndValidation({password: ''});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { password, code } = values;

  const changePasswordFailed = useSelector(
    (state) => state?.password.changePasswordFailed
  );
  const isChangePasswordSuccess = useSelector(
    (state) => state?.password.isChangePasswordSuccess
  );
  const { accessToken } = useSelector(
    (state) => state?.auth);

  useEffect(() => {
    changePasswordFailed && navigate("/forgot-password", { replace: true });
  }, [changePasswordFailed]);

  useEffect(() => {
    isChangePasswordSuccess && navigate("/", { replace: true });
  }, [isChangePasswordSuccess]);

  useEffect(() => {
    accessToken && navigate("/");
  }, [accessToken]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(changePasswordRequest(password, code));
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit} name="login-form">
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <PasswordInput
            value={password || ""}
            name={"password"}
            onChange={handleChange}
          />
        </div>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            value={code || ""}
            name={"code"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}