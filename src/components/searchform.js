import React, { Component } from "react";
import Counter from "./counter";
import * as useractions from "../redux/actions"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class SearchForm extends Component {

    flag_asc_sort = false;

    constructor(props) { // properties go inside constructor
        super(props);
        console.log(props);
        this.state = {
            name: "pi",
            age: 31415,
            gender: "other",
            languages: [],
            user: { name: "", age: 0, gender: "male", languages: [] },
            // users: []
        };
        this.update = this.update.bind(this);
        this.update_languages = this.update_languages.bind(this);
    }

    render() {
        return (
            <div>
                <input name="name" value={this.state.name} onChange={this.update}></input>
                <input name="age" value={this.state.age} onChange={this.update}></input>
                <input type="radio" name="gender" value="male" onChange={this.update} /> Male
                <input type="radio" name="gender" value="female" onChange={this.update} /> Female
                <input type="radio" name="gender" value="other" onChange={this.update} /> Other
                <input type="checkbox" name="c" value="C" onChange={this.update_languages} /> C
                <input type="checkbox" name="java" value="Java" onChange={this.update_languages} /> Java
                <input type="checkbox" name="python" value="Python" onChange={this.update_languages} /> Python

                <button onClick={(event) => {
                    this.state.user = {
                        name: this.state.name,
                        age: this.state.age,
                        gender: this.state.gender,
                        languages: Object.assign({}, this.state.languages)
                    };
                    //this.state.users.push(this.state.user);

                    fetch("http://localhost:3000/order", {
                        method: 'POST',
                        headers: new Headers({
                            'Content-Type': 'application/json' // <-- Specifying the Content-Type
                        }),
                        body: JSON.stringify(this.state.user) // <-- Post parameters
                    });

                    this.setState({
                        user: this.state.user
                        //users: this.state.users
                    });
                    this.props.actions.saveAction(this.state.user);
                }}>Search</button>

                <button onClick={() => {
                    if (!this.flag_asc_sort) {
                        this.props.users.sort((user1, user2) => (user1.age - user2.age));
                    } else {
                        this.props.users.sort((user1, user2) => (-1 * (user1.age - user2.age)));
                    }
                    this.flag_asc_sort = !this.flag_asc_sort;
                    this.save_users();
                }}>sort</button>

                <Counter users={this.state.users}></Counter>

                <ol>
                    {this.props.users.map((user, index) =>
                        <li>
                            {user.name + " " + user.age + " " + user.gender + " " + JSON.stringify(user.languages)}

                            <button onClick={() => {
                                this.props.users.splice(index, 1);
                                this.save_users();
                            }}>x</button>
                        </li>
                    )}
                </ol>


            </div>
        )
    }

    //////////////// not required since we are using event.target.name ///////////////////////

    // update_name(event) {
    //     this.setState({
    //         name: event.target.value
    //     });
    // }

    // update_age(event) {
    //     this.setState({
    //         age: event.target.value
    //     });
    // }

    //////////////////////////////////////////////////////////////////////////////////////////

    update(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    update_languages(event) {
        if (event.target.checked) {
            this.state.languages.push(event.target.name);
        } else {
            this.state.languages.splice(this.state.languages.indexOf(event.target.name), 1);
        }
        this.setState({
            languages: this.state.languages
        });
    }

    save_users() {
        // this.setState({
        //     users: this.state.users
        // });  
    }
}

function mapDispatchToProps(dispatch) {
    console.log("searchform end");
    console.log(dispatch);
    return {
        actions: bindActionCreators(useractions, dispatch)
    };
}

function mapReduxStateToProps(reduxState) {
    console.log('mapStateToProps', reduxState);
    return {
        users: reduxState.users
    };
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(SearchForm);