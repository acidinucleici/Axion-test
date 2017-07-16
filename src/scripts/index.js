import {render}             from 'react-dom';
import DataActions          from 'flux/actions/DataActions.js';

import General              from 'components/General.js';
import Header               from 'components/Header.js';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';


class AppInitializer {

    buildRoutes(data){
	return data.pages.map((page, i) => {
	    console.log(page)
            return(
                <Route
                    key={i}
                    component={ General }
                    path={`/${page.slug}`}
                    exact
                />
            )
        })
    }

    run() {
        DataActions.getPages((response)=>{
console.log('pippo')
console.log(response)
            render(
                <Router>
                    <div>
                        <Header />

                        <Switch>
                            <Route path="/" component={ General } exact />

                            {this.buildRoutes(response)}
                            <Route render={() => { return <Redirect to="/" /> }} />
                        </Switch>
                    </div>
                </Router>

                , document.getElementById('app')
            );
        });
    }
}

new AppInitializer().run();
