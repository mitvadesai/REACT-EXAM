const initalState = {
    Products: [],
    product: null,
    isCreated: false,
    isUpdate: false,
    isLoading: false
}


export const ProductReducer = (state = initalState, action) => {
    switch (action.type) {
        case "Add_Product":
            return {
                ...state,
                isCreated: true
            }

        case "Get_All_Product":
            return {
                ...state,
                isCreated: false,
                isUpdate: false,
                Products: action.payload,
                isLoading: false
            }

        
        case "Get_Product":
            
            return {
                ...state,
                product: action.payload
            }

        case "Update_Product":
            return {
                ...state,
                product: null,
                isUpdate: true,
            }

        case "Loading":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
}