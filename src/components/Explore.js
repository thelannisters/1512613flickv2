import React from 'react';
import '../App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {
	Navbar,
	NavbarBrand,
} from 'reactstrap';
class Explore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listPhoto: [],
			cursor: 1,
			hasMore: true
		}
		this.loadMore = this.loadMore.bind(this);
	}

	loadMore() {
		const url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=c04c70910ae6dce67498eb2cf57b9f02&extras=owner_name%2C+url_n%2C+views&per_page=20&page=${this.state.cursor}&format=json&nojsoncallback=1`;
		axios.get(url)
			.then(res => {
				let listImage = this.state.listPhoto;
				res.data.photos.photo.map(photo => {
					photo.src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
					listImage.push(photo)
				});
				if (this.state.listPhoto.length < 500) {
					const cur = this.state.cursor + 1;
					this.setState({ listPhoto: listImage, cursor: cur });
				} else {
					this.setState({ hasMore: false });
				}
			})
	}
	render() {
		let loader = <div className="loader">Loading ...</div>;
		return (
			<div className="App">
				<Navbar color="light" light expand="md">
					<Link to="/">	<NavbarBrand>Explore</NavbarBrand></Link>
					<Link to="/search">	<NavbarBrand>Search</NavbarBrand></Link>
				</Navbar>
				<InfiniteScroll
					pageStart={0}
					loadMore={this.loadMore}
					hasMore={this.state.hasMore}
					loader={loader}>
					<div className="container">
						{this.state.listPhoto.map((photo, id) =>
							<Link to={`photo/${photo.id}`}>
								<span className="col-lg-3">
									<img src={photo.url_n} alt="" />
								</span>
							</Link>
						)}
					</div>
				</InfiniteScroll>
			</div>
		);
	}
}

export default Explore;