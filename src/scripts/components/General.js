import DataStore from 'flux/stores/DataStore.js'

class General extends React.Component {
    render() {

	let currentSlug = this.props.match.path.replace('/','')
	console.log(currentSlug)
	if(currentSlug === undefined || currentSlug == ''){currentSlug = 'home'}
        let pageData = DataStore.getPageBySlug(currentSlug);
	console.log(DataStore)
        return (
            <div>
                <h2>General page template</h2>
                <h1>{pageData.title.rendered}</h1>

                <div dangerouslySetInnerHTML={{__html: pageData.excerpt.rendered}} />
               	<div>{pageData.content.rendered}</div>
            </div>
        );
    }
}

export default General;
