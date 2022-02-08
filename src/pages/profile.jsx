import styles from "./profile.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormAndValidation from "../hooks/useFormAndValidation";
import {
  GET_LOGOUT_REQUEST, GET_USER_INFO_REQUEST,
  UPDATE_USER_INFO_REQUEST
} from "../services/actions/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "../utils/cookie";

export const Profile = () => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const { name, email, password } = values;
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);

  const refreshToken = getCookie("refreshToken");
  const accessToken = getCookie("accessToken");
  console.log(accessToken)
  const navigate = useNavigate();
  const stateName = useSelector((state) => state?.auth.name);
  const stateEmail = useSelector((state) => state?.auth.email);
  useEffect(() => {
    setValues({
      name: stateName,
      email: stateEmail,
    });
  }, [stateName, stateEmail]);

  useEffect(() => {
    dispatch({
      type: GET_USER_INFO_REQUEST,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }, []);

  useEffect(() => {
    !accessToken && navigate("/login", { replace: true });
  }, [accessToken]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: UPDATE_USER_INFO_REQUEST,
      email: email,
      name: name,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  };
  const onReset = (e) => {
    e.preventDefault();
    resetForm();
  };
  const handleLogout = () => {
    dispatch({
      type: GET_LOGOUT_REQUEST,
      token: refreshToken,
    });
  };

  return (
    <section className={styles.wrap}>
      <div className={`mr-15 ${styles.menu}`}>
        <nav>
          <ul className={styles.list}>
            <li className="pt-6 pb-4">
              <Link to="/profile" className={styles.link}>
                <p
                  className={`text text_type_main-medium ${
                    location.pathname !== "/profile"
                      ? "text_color_inactive"
                      : `${styles.textColor}`
                  }`}
                >
                  Профиль
                </p>
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <Link to="/profile/orders" className={styles.link}>
                <p
                  className={`text text_type_main-medium ${
                    location.pathname !== "/profile/orders"
                      ? "text_color_inactive"
                      : `${styles.textColor}`
                  }`}
                >
                  История заказов
                </p>
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <Link to="/profile" className={styles.link}>
                <p
                  onClick={handleLogout}
                  className={`text text_type_main-medium text_color_inactive`}
                >
                  Выход
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете &nbsp; изменить свои персональные данные
        </p>
      </div>
      <form
        noValidate
        onSubmit={onSubmit}
        className={styles.form}
        name="profile-form"
      >
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            icon={"EditIcon"}
            value={name || ""}
            name={"name"}
            error={false}
            disabled={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"email"}
            placeholder={"Логин"}
            onChange={handleChange}
            icon={"EditIcon"}
            value={email || ""}
            name={"email"}
            error={false}
            disabled={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`mb-6 ${styles.inputWrap}`}>
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={handleChange}
            icon={"EditIcon"}
            value={password || ""}
            name={"password"}
            error={false}
            disabled={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        {isValid && (
          <div className={`${styles.buttons} mt-6`}>
            <Button type="primary" size="medium" onClick={onReset}>
              Отмена
            </Button>
            <Button type="primary" size="medium" onClick={onSubmit}>
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </section>
  );
};
