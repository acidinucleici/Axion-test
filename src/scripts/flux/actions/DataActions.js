import axios from 'axios';
import alt   from 'flux/alt/alt.js';

class DataActions {

    constructor() {
        const appUrl = 'http://www.wp.dev'; // Wordpress installation url

        this.pagesEndPoint = `${appUrl}/wp-json/wp/v2/pages`; // Endpoint for getting Wordpress Pages
        this.postsEndPoint = `${appUrl}/wp-json/wp/v2/posts`; // Endpoint for getting Wordpress Posts
        this.menusEndPoint = `${appUrl}/wp-json/wp-api-menus/v2/menus`; // Endpoint for getting Wordpress Posts
    }

    // Method for getting data from the provided end point url
    api(endPoint) {
        return new Promise((resolve, reject) => {

		console.log('gettings data');
            axios.get(endPoint).then((response) => {
                resolve(response.data);
		console.log('getted data');
            }).catch((error) => {
                reject(error);
            }); 
        });     
    }

    // Method for getting Pages data
    getPages(cb){
        this.api(this.pagesEndPoint).then((response)=>{
		console.log('getted pasge')
            this.getPosts(response, cb)
        });
        return true;
    }

    // Method for getting Menus data
    getMenus(cb){
        this.api(this.menusEndPoint).then((response)=>{
		console.log('getted menus')
            this.getPosts(response, cb)
        });
        return true;
    }
    
	// Method for getting Posts data
    getPosts(pages, cb){
        this.api(this.postsEndPoint).then((response)=>{
		console.log('getted posts')
            const posts     = response
            const payload   = { pages, posts }

            this.getSuccess(payload); // Pass returned data to the store
            cb(payload); // This callback will be used for dynamic rout building
        });
        return true;
    }

    // This returnes an object with Pages and Posts data together
    // The Alt Store will listen for this method to fire and will store the returned data
    getSuccess(payload){
	console.log('stored!!!')
	console.log(payload)
        return payload;
    }
}

export default alt.createActions(DataActions);
