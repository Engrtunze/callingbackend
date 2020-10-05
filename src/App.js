import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"

const apiEndpoit = "https://jsonplaceholder.typicode.com/posts";

class App extends React.Component {
state = {
  posts:[]
};

 async componentDidMount() {
   const {data : posts} = await axios.get(apiEndpoit);
   this.setState({posts});
   console.log({posts})
  }

  handleAdd = async() => {
const obj = {title:"a", body:"b"}
const {data : post} = await axios.post(apiEndpoit, obj)
//console.log(post)
    const posts = [post, ...this.state.posts];
   this.setState({posts});

  };

  handleUpdate = (post) =>
  {
    console.log("handle update")
  };

  handleDelete = (post) => {
    console.log("handle Delete")
  };




  render() {


    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>

            <button className="btn btn-primary" onClick={this.handleAdd}>Add +</button>

            <table className="table">
              <thead>
              <tr>
                {/*<th scope="col">#</th>*/}
                <th scope="col">Title</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
              </thead>
              <tbody>
              {this.state.posts.map(post => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>
                      <button
                          className="btn btn-info btn-sm"
                          onClick={() => this.handleUpdate(post)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                          className="btn btn-danger btn-sm"
                          onClick={() => this.handleDelete(post)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}


              </tbody>
            </table>

          </header>
        </div>
    );
  }



}
export default App;
