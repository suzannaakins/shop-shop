import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from "./actions";

// import { useReducer } from 'react';

// const [state, setState] = useState('hello');

// //class based React
// class App extends React.Component{
//     //methods and a state
//     state={page: 1, obj: {a:1, b:2}}
//     componentDidMount() {
//         //api call or something to run as soon as function starts
//         //don't handle state HERE
//         //can cause an endless reloading loop
//         //changing state causes a reload
//     }
//     changePage() {
//         //methods are function w/out function keyword
//         this.setState({
//             //change the state here
//             // if you have OBJECT inside you're state, need to use spread operator
//             obj: {...this.state.obj, a: 7},
//             //state holds EVERYTHING in the state, in the single object. so no multiple use.
//             page: this.state.page + 1

//         })
//     }
//     render() {
//         return (
//             <button onClick={this.changePage}>
//                 {this.state.page}
//             </button>
//         )
//     }
// }

const initialState = { products: [], categories: [], currentCategory: "", cart: [], cartOpen: false};

export const reducers = (state=initialState, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };

        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };

        // if action type value is the value of `UPDATE_CURRENT_CATEGORY`, return a new state object with an updated current category string
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };

        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            };

        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };

        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                })
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
            
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        // if it's none of these actions, do not update state at all and keep things the same!
        default:
            return state;
    }
};

export default reducers;

// export function useProductReducer(initialState) {
//     return useReducer(reducer, initialState);
// }