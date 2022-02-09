import styles from "./ingredients-list-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { itemPropTypes } from "../../utils/types";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  ADD_CURRENT_INGREDIENT,
  ADD_SELECTED_INGREDIENT,
  INCREASE_COUNT,
} from "../../services/actions/types";
import { useDrag } from "react-dnd";

export const IngredientsItem = ({ ingredient }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const ingredientId = ingredient["_id"];

  const [{ isDrag }, drag] = useDrag({
    type: "place",
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const dispatch = useDispatch();
  const isBunInOrder = useSelector((state) =>
    state?.selectedIngredients.selectedIngredients.some((i) => i.type === "bun")
  );
  const handleClick = () => {
    if (ingredient.type !== "bun") {
      ingredient.count
        ? dispatch({
            type: INCREASE_COUNT,
            ingredient: ingredient,
            count: ingredient.count + 1,
          })
        : dispatch({
            type: INCREASE_COUNT,
            ingredient: ingredient,
            count: 1,
          });
    }
    if (ingredient.type === "bun" && !isBunInOrder) {
      dispatch({
        type: INCREASE_COUNT,
        ingredient: ingredient,
        count: 2,
      });
    }
    dispatch({
      type: ADD_SELECTED_INGREDIENT,
      payload: { ...ingredient, key: uuid() },
    });
    dispatch({
      type: ADD_CURRENT_INGREDIENT,
      ingredient: ingredient,
    });
    navigate(
      `/ingredients/${ingredientId}`,
      {state: { background: true }},
    );
  };

  const { image, name, price } = ingredient;

  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <article
        ref={drag}
        onClick={handleClick}
        className={`${styles.card} ${isDrag && styles.cardTransparent}`}
      >
        {ingredient?.count && (
          <Counter count={ingredient.count} size="default" />
        )}
        <img src={image} alt={name} className="mb-1" />
        <div className={`${styles.priceWrap} mb-1`}>
          <p className={`${styles.price} mr-2 text text_type_digits-default`}>
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-small`}>{name}</p>
      </article>
    </Link>
  );
};

IngredientsItem.propTypes = {
  ingredient: itemPropTypes.isRequired,
};
