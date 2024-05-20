import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Button,
	Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ECommerceApp = () => {
	const [products, setProducts] = useState([
		{ id: "1", name: "Poco M5s", price: 35000 },
		{ id: "2", name: " Q - Tab", price: 12999 },
		{ id: "3", name: "Cupboard", price: 94899},
	]);

	const [cart, setCart] = useState([]);
	const [isModalVisible, setModalVisible] = useState(false);

	const addToCart = (product) => {
		setCart([...cart, product]);
	};

	const removeFromCart = (productId) => {
		const updatedCart = cart.filter((item) => item.id !== productId);
		setCart(updatedCart);
	};

	const calculateTotal = () => {
		return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
	};

	const renderProductItem = ({ item }) => (
		<View style={styles.productItemContainer}>
			<Text style={styles.productItemName}>{item.name}</Text>
			<Text style={styles.productItemPrice}>
				Rs.{item.price.toFixed(0)}
			</Text>
			<TouchableOpacity
				style={styles.addButton}
				onPress={() => addToCart(item)}
			>
				<Text style={styles.addButtonText}>Add to Cart</Text>
				<Ionicons name="cart-outline" size={20} color="white" />
			</TouchableOpacity>
		</View>
	);

	const renderCartItem = ({ item }) => (
		<View style={styles.cartItemContainer}>
			<View>
				<Text style={styles.cartItemName}>{item.name}</Text>
				<Text style={styles.cartItemPrice}>
					Rs.{item.price.toFixed(0)} 
				</Text>
			</View>
			<TouchableOpacity
				style={styles.removeButton}
				onPress={() => removeFromCart(item.id)}
			>
				<Ionicons name="trash-outline" size={20} color="white" />
			</TouchableOpacity>
		</View>
	);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const handleCheckout = () => {
		if (cart.length === 0) {
			toggleModal();
		} else {
			toggleModal();
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>MJ_Been Outlet</Text>

			<FlatList
				data={products}
				keyExtractor={(item) => item.id}
				renderItem={renderProductItem}
			/>

			<View style={styles.cartContainer}>
				<Text style={styles.cartHeading}>To Buy</Text>
				{cart.length === 0 ? (
					<Text style={styles.emptyCartMessage}>
						Add at least one product to the cart.
					</Text>
				) : (
					<FlatList
						data={cart}
						keyExtractor={(item) => item.id}
						renderItem={renderCartItem}
					/>
				)}
				<View style={styles.totalContainer}>
					<Text style={styles.totalText}>
						Total: Rs.{calculateTotal() } 
					</Text>
					<TouchableOpacity
						style={styles.checkoutButton}
						onPress={handleCheckout}
					>
						<Text style={styles.checkoutButtonText}>
							Proceed to Checkout
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={toggleModal}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalText}>
							{cart.length === 0
? "Add at least one product to the cart before proceeding."
: "Congratulations! Your order is placed successfully."}
						</Text>
						<Button title="Close" onPress={toggleModal} />
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: "#333",
	},
	productItemContainer: {
		marginBottom: 10,
		borderRadius: 10,
		backgroundColor: "#fff",
		padding: 15,
		elevation: 3,
	},
	productItemName: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
		color: "#333",
	},
	productItemPrice: {
		fontSize: 16,
		marginBottom: 10,
		color: "#666",
	},
	addButton: {
		backgroundColor: "#4caf50",
		padding: 10,
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	addButtonText: {
		color: "white",
		marginRight: 5,
	},
	cartContainer: {
		marginTop: 20,
	},
	cartHeading: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
		color: "#333",
	},
	cartItemContainer: {
		borderRadius: 10,
		backgroundColor: "#fff",
		padding: 15,
		elevation: 3,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	cartItemName: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
		color: "#333",
	},
	cartItemPrice: {
		fontSize: 14,
		color: "#666",
	},
	removeButton: {
		backgroundColor: "#e53935",
		padding: 10,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	totalContainer: {
		marginTop: 10,
		alignItems: "flex-end",
	},
	totalText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	checkoutButton: {
		backgroundColor: "#2196F3",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 10,
	},
	checkoutButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},

	
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
		elevation: 5,
		alignItems: "center",
	},
	modalText: {
		fontSize: 18,
		marginBottom: 20,
		textAlign: "center",
	},

	emptyCartMessage: {
		fontSize: 16,
		textAlign: "center",
		marginVertical: 10,
	},
});

export default ECommerceApp;
