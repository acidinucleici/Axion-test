import {Link} from 'react-router-dom';
import $ from "jquery";
import state from 'shared/state'

class Header_view extends React.Component {

    render() {
      console.log('view',state.menuItems)
      if(state.menuItems.length > 0){
        return (
            <div className="header_view">

                {state.menuItems.map((page) => {
                  console.log(page.id +'-'+ page.object_slug)
                       return(
                            <Link
                                key={page.id}
                                to={`/${page.object_slug}`}
                                style={{marginRight: '10px'}}
                            >
                                {page.title}
                            </Link>
                        )

                })}
            </div>
        );
      }else{
          return(<Link to="/" style={{marginRight: '10px'}} >sdaadsaHome</Link>);
      }
        return null ;
    }

}

export default Header_view;
