import React from 'react';
import '../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
} from 'reactstrap';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listPhoto: [],
            listSearch: [],
            tag: ''
        }

    }
    componentDidMount() {
        const url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=c04c70910ae6dce67498eb2cf57b9f02&extras=owner_name%2C+url_n%2C+views%2C+tags&per_page=500&format=json&nojsoncallback=1`;
		axios.get(url)
			.then(res => {
				let listImage = this.state.listPhoto;
				res.data.photos.photo.map(photo => {
					photo.src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
					listImage.push(photo)
				});
			})
    }

    onUpdateInput = (event)=> {
        this.setState({ tag: event.target.value });
    }

    submitResult = (event)=> {
        event.preventDefault();

        let listSearch = [];
        this.state.listPhoto.map(photo => {
            if (photo.tags.includes(this.state.tag)) {
                listSearch.push(photo)
            }
        })
        this.setState({ listSearch});
    }
    render() {
        return (
            <div className="container">
                <Navbar color="light" light expand="md">
                    <Link to="/">	<NavbarBrand>Explore</NavbarBrand></Link>
                    <form  onSubmit={this.submitResult}>
                        <input type="text" value={this.state.tag} onChange={this.onUpdateInput} />
                        <button id="btn" type="submit">Search Tag</button>
                    </form>
                </Navbar>
                <div className="row">
                <div className="container">
						{this.state.listSearch.map((photo, id) =>
							<Link to={`photo/${photo.id}`}>
								<span className="col-lg-3">
									<img src={photo.url_n} alt="" />
								</span>
							</Link>
						)}
					</div>
                </div>
            </div>
        );
    }
}
export default Search;
