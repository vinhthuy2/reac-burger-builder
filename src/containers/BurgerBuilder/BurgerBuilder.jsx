import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spiner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentWillMount() {
		console.log('[BurgerBuilder] componentWillMount');
	}

	componentDidMount() {
		console.log('[BurgerBuilder] componentDidMount');
		axios
			.get('https://react-my-burger-2e665.firebaseio.com/ingredients.json')
			.then((res) => {
				this.setState({ ingredients: res.data });
			})
			.catch((err) => {
				this.setState({ error: err });
			});
	}

	updatePurchasable = (expectedIngredients) => {
		const ingredients = {
			...expectedIngredients
		};

		const sum = Object.keys(ingredients)
			.map((igKey) => {
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
			totalPrice: 4
		});
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updateCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};

		updatedIngredients[type] = updateCount;
		const priceAddition = INGREDIENTS_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});

		this.updatePurchasable(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
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
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceSubtraction;
		this.setState({
			totalPrice: newPrice,
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
		// alert('You continue!');
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Vinh Thuy',
				address: {
					street: 'Teststreet 1',
					zipCode: 123456,
					country: 'Viet Nam'
				},
				email: 'test@mail.com'
			},
			deliveryMethod: 'fastest'
		};
		axios
			.post('/orders.json', order)
			.then((res) => {
				this.setState({ loading: false, purchasing: false });
			})
			.catch((err) => {
				this.setState({ loading: false, purchasing: false });
				console.log(err);
			});
	};

	render() {
		// disabledInfo
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		// orderSummary
		let orderSummary = null;
		if (this.state.ingredients) {
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.state.totalPrice}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		// burger
		let burger = this.state.error ? <p>{this.state.error.toString()}</p> : <Spinner />;
		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientsAdd={this.addIngredientHandler}
						ingredientsRemove={this.removeIngredientHandler}
						disabled={disabledInfo}
						price={this.state.totalPrice}
						reset={this.resetHandler}
						purchasable={!this.state.purchasable}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);
		}

		return (
			<Aux>
				<Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
					{orderSummary}
				</Modal>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column' }}>
					{burger}
				</div>
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
