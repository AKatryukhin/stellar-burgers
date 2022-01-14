import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';
import Modal from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

export const BurgerIngredients = ({
  ingredients,
  isModalOpen,
  onModalOpen,
  onModalClose,
  currentIngredient,
}) => {
  const [current, setCurrent] = useState('Булки');
  const buns = ingredients.filter((i) => i.type === 'bun');
  const sauces = ingredients.filter((i) => i.type === 'sauce');
  const mains = ingredients.filter((i) => i.type === 'main');

  return (
    (
    <section className={`${styles.section}`}>
      <h1
        className={`${styles.title} text text_type_main-large pt-10 mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.tabWrap} mb-10`}>
        <Tab value='one' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.listWrap} custom-scroll`} id='containerElement'>
        <IngredientsList filteredIngredients={buns} onModalOpen={onModalOpen} title='Булки' />
        <IngredientsList filteredIngredients={sauces} onModalOpen={onModalOpen} title='Соусы' />
        <IngredientsList
          filteredIngredients={mains}
          onModalOpen={onModalOpen}
          title='Начинки'
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        title='Детали ингредиента'
        onClose={onModalClose}
      >
        {currentIngredient && <IngredientDetails ingredient={currentIngredient} />}
      </Modal>
      </section>
    )
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};