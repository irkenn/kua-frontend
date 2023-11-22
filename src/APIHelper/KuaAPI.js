import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:3001";

/**
 * This class will have all the methods needed to intereact 
 * with the API and send and retrieve all the important
 * information.
 */

class KuaApi {

    /**For many interactions with the API, the request need
     * to include the Token
     */

    // This a general request methd, all the different methods use this to make calls to the API.
    static async request( endpoint, data={}, method='get', userInfo = undefined ){
        
        //Creates the url to which the app places the request
        const url = `${BASE_URL}/${endpoint}`;
        
        console.debug("API Call:", "url", url, "data", data, "method", method, "userInfo", userInfo);
        
        // Retrieves the token from the localStorage or the state that holds user info
        const headers = { kua_token : data?.token || userInfo?.token || "" };
        
        //Second proof for empty data
        const params = (method === "get") ? data : {};

        try{
            //Sends the request to the API
            return (await axios({ url, method, data, params, headers })).data;
        }catch (err){
            console.error("Received an error response", err.response);
            // let message = err.response.data.error.message;
            // return Array.isArray(message) ? message : [message];
            // throw Array.isArray(message) ? message : [message];
        }
    }

    static async singUp(data){
        
        let response = await this.request(`auth/signup`, data, 'post');
        return response;
    }

    static async login(data){

        let response = await this.request(`auth/token`, data, 'post');
        return response;
    }

    static async search( keyword, userInfo ){
        
        //second argument 'data' is not needed that's why it's being passed as undefined
        let response = await this.request(`search/recipe/${keyword}`, undefined, 'get', userInfo);
        
        //The error message is catched by KuaAPI, this helps in rendering
        if(response[0] === "The query didn't produced any results")return undefined;
        
        return response;
    }

    static async getRecipe( recipeID, userInfo ){

        let response = await this.request(`recipe/${recipeID}`, undefined, 'get', userInfo);
        return response;
    }

    static async getUser( userID, userInfo ){

        let response = await this.request(`user/${userID}`, undefined, 'get', userInfo);
        return response;
    }

    static async getHome( userInfo ){

        let response = await this.request('user/home', undefined, 'get', userInfo);
        return response;
    }

    static async updateUser( data, userInfo ){

        //username has to be url encoded
        const encodedName = encodeURIComponent(userInfo.username);
        let response = await this.request(`user/${encodedName}`, data, 'patch', userInfo);
        return response;
    }

    static async searchIngredient( ingredientName, userInfo ){

        const response = await this.request(`search/ingredients/${ingredientName}`, undefined, 'get', userInfo);
        return response;
    }

    static async getIngredientDetails( ingredientID, userInfo){
        const response = await this.request(`search/ingredients/${ingredientID}/information`, undefined, 'get', userInfo);
        return response;
    }

    static async newRecipe( recipeData, userInfo ){
        const response = await this.request(`recipe`, recipeData, 'post', userInfo);
        return response;
    }

    static async addIngredients( ingredientList, recipeId, userInfo){

        const response = await this.request(`recipe/${recipeId}/add`, ingredientList, 'post', userInfo );
        return response;
    }
}


export default KuaApi;