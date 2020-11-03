import React from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";

class App extends React.Component {

  state = {
    books: [],
    displayBook: "", 
    currentBookId: "",
    usersWhoLike: ""

  }


  componentDidMount() {
    fetch("http://localhost:4000/books")
    .then(r => r.json())
    .then(data => this.setState({ books: data}))
  }


  targetBook = (book) => {
    this.setState({
      displayBook: book,
      currentBookId: book.id,
      usersWhoLike: book.users
    })
  }

  patchLikes = () => {
    
     if (this.state.displayBook) {
        
       let body = {
        users: [...this.state.displayBook.users, {"id":1, "username":"pouros"} ]
       } 
   
       fetch(`http://localhost:4000/books/${this.state.currentBookId}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(body)
       }).then(res => res.json())
       .then(r => this.setState({usersWhoLike: r.users}))
     

      }

    } 

  render(){

    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
          <Menu vertical inverted>
            {this.state.books.map(book => 
              <Menu.Item as={"a"} onClick={() => this.targetBook(book)}> 
                {book.title} 
              </Menu.Item>)}
          </Menu>
          </Menu>
          <Container text>
            <Header>{this.state.displayBook.title}</Header>
            <Image
              src={this.state.displayBook.img_url}
              size="small"
            />
            <p>{this.state.displayBook.description}</p>
            <Button
              onClick={() => this.patchLikes()}
              color="red"
              content="Like"
              icon="heart"
              label={{
                basic: true,
                color: "red",
                pointing: "left",
                content: "2,048"
              }}
            />
            <Header>Liked by</Header>
            <List>
            {this.state.usersWhoLike ? this.state.usersWhoLike.map(user => <List.Item icon="user" content={user.username} />) : null}
            </List>
          </Container>
        </main>
      </div>
    );
  }
}


export default App;
