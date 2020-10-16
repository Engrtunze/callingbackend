import React from 'react';
import logo from './logo.svg';
import './App.css';
import httpsService from "./httpsService";
import config from './config.json';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


class App extends React.Component {
state = {
  posts:[]
};

 async componentDidMount() {
   const {data : posts} = await httpsService.get(config.apiEndpoint);
   this.setState({posts});
   console.log({posts})
  }

  handleAdd = async() => {
const obj = {title:"a", body:"b"}
const {data : post} = await httpsService.post(config.apiEndpoint, obj)
//console.log(post)
    const posts = [post, ...this.state.posts];
   this.setState({posts});

  };

  handleUpdate = async post =>
  {
      post.title="UPDATED"
    await httpsService.put(config.apiEndpoint +  '/' +  post.id,  post);

      const posts =[...this.state.posts];
      const index = posts.indexOf(post);
      posts[index]={...post};
      this.setState({posts})
  };

  handleDelete = async post => {
     const  originalPosts = this.state.posts;

      //remove from table  ..... calling ui
     const  posts = this.state.posts.filter(p =>p.id  !==post.id);
     this.setState({posts})


      //call server
      try{
      await httpsService.delete( "s" + config.apiEndpoint + "/" + post.id) //.......deleted from
          // server

      }
      catch (ex) {
         //Expected (404: not found, 400:bad request) -CLIENT ERRORS
          // - Display a specific error message
          if (ex.response  &&  ex.response.status === 404)
              alert('This post has already been deleted.');
          this.setState({posts: originalPosts});
          //
          //Unexpected errors(network down, server down, db down, bug)
          //- Log them
          // - Display a generic and friendly error message
          // alert('Something failed while deleting a post!');

      }


    console.log("handle Delete")
  };




  render() {


    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>



            <ToastContainer/>
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
