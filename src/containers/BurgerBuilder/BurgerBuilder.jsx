import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 1.3,
  meat: 0.7
};

const INGREDIENTS_EMPTY = {
  salad: 0,
  cheese: 0,
  bacon: 0,
  meat: 0
};
class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }

  state = {
    ingredients: {
      ...INGREDIENTS_EMPTY
    },
    totalPirce: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchasable = expectedingredients => {
    const ingredients = {
      ...expectedingredients
    };

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => (sum += el), 0);

    this.setState({ purchasable: sum > 0 });
  };

  resetHandler = () => {
    this.setState({
      ingredients: {
        ...INGREDIENTS_EMPTY
      },
      totalPirce: 4
    });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updateCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPirce;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPirce: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchasable(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updateCount;
    const priceSubtraction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPirce;
    const newPrice = oldPrice - priceSubtraction;
    this.setState({
      totalPirce: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchasable(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('You continue!');
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdd={this.addIngredientHandler}
          ingredientsRemove={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPirce}
          reset={this.resetHandler}
          purchasable={!this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
