import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from "jquery";
import Header_view  from 'components/Header_view.js';
import state from 'shared/state'

class Header extends React.Component {

    render() {

      const appUrl = 'http://www.wp.dev'; // Wordpress installation url
      this.menusEndPoint = `${appUrl}/wp-json/wp-api-menus/v2/menus/`; // Endpoint for getting Wordpress Posts
      let self = this
      let re_rendered = false

      axios.get(this.menusEndPoint)
      .then(function (response) {
        //gettinh the right menu by menu name

        let result = response.data.filter(function( obj ) {
            return obj.name == 'Main menu';
        });
        let menuId = result[0].ID
        axios.get(`${appUrl}/wp-json/wp-api-menus/v2/menus/${menuId}/`)
        .then(function (response) {
          //self.menuItems = response.data.items
          state.menuItems = response.data.items;
          state.menuItems.map((item, index) => {
            switch (item.type){
              case 'taxonomy':
                state.menuItems[index].object_slug = item.url.replace(appUrl+'/', '')
                if(state.menuItems[index].object_slug.substr(state.menuItems[index].object_slug.length - 1) == '/'){
                  state.menuItems[index].object_slug = state.menuItems[index].object_slug.slice(0, -1);
                }
              break
              case 'custom':
                state.menuItems[index].object_slug = item.url.replace(appUrl+'/', '')
                if(state.menuItems[index].object_slug.substr(state.menuItems[index].object_slug.length - 1) == '/'){
                  state.menuItems[index].object_slug = state.menuItems[index].object_slug.slice(0, -1);
                }
              break
            }
          })
          //force to re-render
          if(!self.re_rendered){
            self.re_rendered = true
            self.forceUpdate()
          }
        })
        .catch(function (error) {
          console.log('errore nel reperire menu ID:'+ menuId);
        })
      })
      .catch(function (error) {
        console.log('errore nel reperire menu: Main menu');
      })

      return (
          <div className="header"><Header_view /></div>
      );

    }
}

export default Header;
