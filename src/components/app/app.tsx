import React, { FC, useCallback, useEffect } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { useDispatch, useSelector } from "react-redux";
import Main from "../main/main";
import {
  Register,
  Login,
  NotFound,
  Profile,
  ForgotPassword,
  ResetPassword,
} from "../../pages";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";

import { IngredientPage } from "../../pages/ingredient-page";
import Preloader from "../preloader/preloader";
import { fetchIngredients } from "../../services/actions/actionsIngredient";

export const App: FC = () => {
  const dispatch = useDispatch();

  const { ingredientsRequest, loaded } = useSelector(
    // @ts-ignore
    (state) => state?.ingredients // store пока не типизируем
  );
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      {ingredientsRequest && <Preloader />}
      {!ingredientsRequest && loaded && (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientPage />}
          />
        </Routes>
      )}
    </div>
  );
};