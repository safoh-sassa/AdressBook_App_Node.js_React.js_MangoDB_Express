var PersonAll = React.createClass({   
  
    getInitialState: function () {  
      return { name: '' ,address: '',email:'',contact:'',id:'',Buttontxt:'Save', data1: []};  
    },  
     handleChange: function(e) {  
          this.setState({[e.target.name]: e.target.value});  
      },  
    
    componentDidMount() {  
     
      $.ajax({  
         url: "api/getdata",  
         type: "GET",  
         dataType: 'json',  
         ContentType: 'application/json',  
         success: function(data) {           
           this.setState({data1: data});   
             
         }.bind(this),  
         error: function(jqXHR) {  
           console.log(jqXHR);  
               
         }.bind(this)  
      });  
    },  
      
  DeleteData(id){  
    var personDelete = {  
          'id': id  
             };        
      $.ajax({  
        url: "/api/Removedata/",  
        dataType: 'json',  
        type: 'POST',  
        data: personDelete,  
        success: function(data) {  
          alert(data.data);  
           this.componentDidMount();  
    
        }.bind(this),  
        error: function(xhr, status, err) {  
           alert(err);   
               
              
        }.bind(this),  
        });  
      },  
     
      EditData(person){           
     this.setState({name: person.name,address:person.address,contact:person.contact,email:person.email,id:person._id,Buttontxt:'Update'});  
       },  
    
     handleClick: function() {  
     if (!this.isValidEmail(this.state.email)){
      alert("Email is not valid.")
      return
     }
   
     if (this.state.name == ''){
      alert("Name is Required.")
      return
     }
     
     var Url="";  
     if(this.state.Buttontxt=="Save"){  
        Url="/api/savedata";  
         }  
        else{  
        Url="/api/Updatedata";  
        }  
        var persondata = {  
          'name': this.state.name,  
          'address':this.state.address,  
          'email':this.state.email,  
          'contact':this.state.contact,  
          'id':this.state.id,  
            
      }  
      $.ajax({  
        url: Url,  
        dataType: 'json',  
        type: 'POST',  
        data: persondata,  
        success: function(data) {         
            alert(data.data);         
            this.setState(this.getInitialState());  
            this.componentDidMount();  
             
        }.bind(this),  
        error: function(xhr, status, err) {  
           alert(err);       
        }.bind(this)  
      });  
    }, 
    isValidEmail(email) {  
      return /\S+@\S+\.\S+/.test(email);
    }, 
    
    render: function() {  
      return (   
        <div  className="container"  style={{marginTop:'50px'}}>  
         <p className="text-center" style={{fontSize:'25px'}}><b>Address book</b></p>  
    <form>  
      <div className="col-sm-12 col-md-12"  style={{marginLeft:'400px'}}>   
    <table className="table-bordered" >  
       <tbody>  
      <tr>  
        <td><b>Name</b></td>  
        <td>  
           <input className="form-control" type="text" value={this.state.name}    name="name" onChange={ this.handleChange } />  
            <input type="hidden" value={this.state.id}    name="id"  />  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>Address</b></td>  
        <td>  
        <input type="text" className="form-control" value={this.state.address}  name="address" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>Email</b></td>  
        <td>  
          <input type="email"  className="form-control" value={this.state.email}  name="email" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
    
      <tr>  
        <td><b>Contact</b></td>  
        <td>  
          <input type="number"  className="form-control" value={this.state.contact}  name="contact" onChange={ this.handleChange } />  
        </td>  
      </tr>  
       
   </tbody>  
      </table>
      <br />
      <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />   
  </div>  
     
    
  <div className="col-sm-12 col-md-12 "  style={{marginTop:'50px',marginLeft:'300px'}} >  
     
   <table className="table-bordered"><tbody>  
     <tr><th><b>#</b></th><th><b>NAME</b></th><th><b>ADDRESS</b></th><th><b>EMAIL</b></th><th><b>CONTACT</b></th><th><b>Edit</b></th><th><b>Delete</b></th></tr>  
      {this.state.data1.map((person, index) => (  
          <tr key={index}>  
             <td>{index+1}</td>   
            <td>{person.name}</td>                        
            <td>{person.address}</td>  
            <td>{person.email}</td>  
            <td>{person.contact}</td>  
             <td>   
              
             <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(person)}}>Edit</button>      
            </td>   
            <td>   
               <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(person._id)}}>Delete</button>  
            </td>   
          </tr>  
      ))}  
      </tbody>  
      </table>  
       </div>  
  </form>          
        </div>  
      );  
    }  
  });  
    
  ReactDOM.render(<PersonAll  />, document.getElementById('root'))  