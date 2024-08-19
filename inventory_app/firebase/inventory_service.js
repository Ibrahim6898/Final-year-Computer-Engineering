import { getFirestore, collection, addDoc,  doc, getDoc, getDocs, updateDoc, deleteDoc, } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config"; // Import the configured Firebase instance


// Function to upload image to Firebase Storage
export const uploadImage = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const storageRef = ref(storage, `images/${new Date().toISOString()}`);
  try {
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (e) {
    console.log(e); // Logs the error to the console
  }
};

// Function to save item details to Firestore
export const saveItemDetails = async (item) => {
  try {
    let imageUrl = "";
    if (item.image) {
      imageUrl = await uploadImage(item.image);
    }

    await addDoc(collection(db, "items"), {
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      category: item.category,
      price: item.price,
      image: imageUrl,
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Rethrow to handle in the caller function
  }
};



// Function to get all items from Firestore
export const getAllItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};

// Function to delete an item by ID from Firestore
export const deleteItemById = async (itemId) => {
  try {
    const itemRef = doc(db, "items", itemId);
    await deleteDoc(itemRef);
    console.log("Document deleted with ID: ", itemId);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

// Function to update an item by ID in Firestore
export const updateItemById = async (itemId, updatedItem) => {
  try {
    const itemRef = doc(db, "items", itemId);

    // Handle image update if a new image is provided
    let imageUrl = updatedItem.image || ""; // Use existing image if no new image URI
    if (updatedItem.imageUri && updatedItem.imageUri.trim() !== "") { // Ensure imageUri is valid
      imageUrl = await uploadImage(updatedItem.imageUri); // Reuse the uploadImage function
    }
    // Update the item details
    await updateDoc(itemRef, {
      name: updatedItem.name,
      description: updatedItem.description,
      quantity: updatedItem.quantity,
      category: updatedItem.category,
      price: updatedItem.price,
      image: imageUrl, // Update the image URL if applicable
    });
    console.log("Document updated with ID: ", itemId);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};
