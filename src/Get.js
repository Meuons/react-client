import React,{ Component } from 'react'
class Get extends Component {
    constructor(props) {
      super(props);
      this.remove = this.remove.bind(this);
      this.state = { array:[], creator:'',movie:'', title:'', content:'',rating:'', id:'', buttonText: 'Post review',  errorMessage: '', put:false} 
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
    
      const { creator, movie, title, content,rating} = this.state
  
      let ratingValue ;
    //If no value is selected use 1 as the default
      if ( `${rating}` != ""){
          ratingValue = `${rating}`
      }
      else{
        ratingValue = "1"
      }
   
      event.preventDefault()
        
    //Send error message if any field is empty
    if ( `${creator}` == "" || `${movie}` == "" || `${title}` == "" || `${content}` == ""){
      this.setState({ errorMessage: "Fill in all the fields" });
    }
    else{
      //Do a post or put request depending on wether or not update mode has been activated
      if( this.state.put == false){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "creator": `${creator}`, "movie": `${movie}`, "title": `${title}`, "content": `${content}`,"rating": `${ratingValue}`})
    }
    
    fetch('https://afternoon-beyond-27166.herokuapp.com/reviews', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
  
            if (!response.ok) {
  
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            window.location.reload();
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
  

    }
    else{
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "creator": `${creator}`, "movie": `${movie}`, "title": `${title}`, "content": `${content}`,"rating": `${ratingValue}`})
    }
    
    fetch('https://afternoon-beyond-27166.herokuapp.com/reviews/' + this.state.id, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
  
            if (!response.ok) {
  
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            window.location.reload();
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
  

    }
    }
  }
  


    
    
  
    handleChange(event){
      //Update the state properties with the value in the fields
      this.setState({
  
        [event.target.name] : event.target.value
      })
    }
    
  
    edit(item) {
      this.setState({ creator: item.creator, movie: item.movie, title: item.title, content: item.content, rating: item.rating, id: item._id, put: true })
      this.setState({ buttonText: "Update review"});
    }

    remove(id) {
      //Remove th item with the sent id
    fetch('https://afternoon-beyond-27166.herokuapp.com/reviews/' + id, { method: 'DELETE' })
    .then(async response => {
        const data = await response.json();

        //Check the response
        if (!response.ok) {

            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        //Reload the browser if the operation i successful
        window.location.reload();
       
    })
    //Display errors if anything goes wrong
    .catch(error => {
      this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
    });
}
    componentDidMount() {
      //Get all the items
        fetch('https://afternoon-beyond-27166.herokuapp.com/')
            .then(async response => {
                const data = await response.json();
    
       
                if (!response.ok) {
        
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
               //Store all the items from the database in an array
               data.reverse();
                  this.setState({ array: data})
                  
                
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }
    
    render() {
        const { array } = this.state
      
          return( 
            //Generate the html code
            <>
                <span>{this.state.errorMessage}</span>
      <form id="form" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='movie'>Movie title</label>
          <input 
            name='movie'
            value = {this.state.movie}
            onChange={this.handleChange}
          />       
           <label htmlFor='rating'>Rating</label>
        <select name={'rating'} value={this.state.rating} onChange={this.handleChange}>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
  <span>/5</span>
        </div>
        <div>
          <label htmlFor='title'>Header</label>
          <input
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='content'>Content</label>

          <textarea onChange={this.handleChange} name='content' value={this.state.content} >
          
</textarea>
        </div>
        <div>
          <label htmlFor='creator'>Your name</label>
          <input
            name='creator' 
            
            value={this.state.creator}
            onChange={this.handleChange}
          />
        
  </div>
        <div>
          <button>{this.state.buttonText}</button>
        </div>
      </form>
            {array.map(item => 
            //Loop all the items and write out their properties
            <React.Fragment key={item._id}>
            <ul id={item._id} className="ReviewContainer">
           <li> <span>{this.state.errorMessage}</span> </li>
          
                <li><button onClick={() =>this.remove(item._id)}>x</button></li> 
                <li><button onClick={() =>this.edit(item)}>edit</button></li> 
                <li><h1>{item.movie} ★{item.rating}/5</h1></li>
             <li><h2>{item.title}</h2></li>
           <li>  <p>{item.content}</p></li>
           <li>  <span>written by {item.creator}</span></li> 
           </ul>
           </React.Fragment>
            
           )}


           </>
           
          )
        }
  }
  
  export default Get

