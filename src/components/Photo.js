import React from 'react';
import '../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    FormGroup, Label, Input
} from 'reactstrap';

class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            desPhoto: {}
        }
    }

    componentDidMount() {
        const url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=c04c70910ae6dce67498eb2cf57b9f02&extras=description%2C+views%2C+owner_name&per_page=500&format=json&nojsoncallback=1`;
        axios.get(url)
            .then(res => {
                console.log(res);
                let cPhoto = this.state.desPhoto;
                res.data.photos.photo.map(photo => {
                    if (photo.id === this.props.match.params.id) {
                        photo.src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
                        cPhoto = photo;
                    }
                });
                this.setState({ desPhoto: cPhoto });
            })

    }
    render() {
        return (
            <div className="App">
                <Navbar color="light" light expand="md">
					<Link to="/">	<NavbarBrand>Explore</NavbarBrand></Link>
					<Link to="/search">	<NavbarBrand>Search</NavbarBrand></Link>
				</Navbar>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <img src={this.state.desPhoto.src} />
                        </div>
                        <span className="col-lg-3"><h3>Author : </h3></span>
                        <a><h3>{this.state.desPhoto.ownername}</h3></a>
                        <span className="col-lg-3"><h3>Title:</h3> </span>
                        <h4>{this.state.desPhoto.title}</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default Photo;