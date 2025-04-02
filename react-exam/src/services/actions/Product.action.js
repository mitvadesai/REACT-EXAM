
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs,  updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


export const addProduct = () => {
    return {
        type: "Add_Product",
    }
}
export const updateProduct = () => {
    return {
        type: "Update_Product",
    }
}
export const getAllProduct = (data) => {
    return {
        type: "Get_All_Product",
        payload: data
    }
}


export const getProduct = (data) => {
    return {
        type: "Get_Product",
        payload: data
    }
}
export const loading = () => {
    return {
        type: "Loading",
    }
}

export const getAllProductAsync = () => {
    return async (dispatch) => {
      dispatch(loading());
  
      try {
        const querySnapshot = await getDocs(collection(db, "Product"));
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({...doc.data(), id: doc.id});
        });
        dispatch(getAllProduct(result));
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const AddProductAsync = (data) => {
    return async (dispatch) => {
      dispatch(loading());
      try {
         await addDoc(collection(db, "Product"), data);       
        dispatch(addProduct());
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
  };

  export const deleteProductAsync = (id) => {
    return async(dispatch) => {
      dispatch(loading());
      try {
          let deleteRec = await deleteDoc(doc(db, "Product", id));
          dispatch(getAllProductAsync());
      } catch (error) {
          console.error("Error : ", error);
      }
    };
  };
  


  export const getProductAsync = (id) => {
    return async(dispatch) => {
      dispatch(loading());
      try {
          let getRecord = await getDoc(doc(db, "Product", id));
          console.log("Get Record: => ", getRecord);
          if(getRecord){
              dispatch(getProduct({...getRecord.data(), id: getRecord.id}));
          }
      } catch (error) {
          console.error("Error : ", error);
      }
    };
  };


export const updateProductAsync = (id, data) => {
  return async(dispatch) => {
    dispatch(loading());
    try {
        let record = await updateDoc(doc(db, "Product", id), data);
        dispatch(updateProduct());
    } catch (error) {
        console.error("Error : ", error);
    }
  };
};