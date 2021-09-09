import React from 'react';
import Calendar from './Components/Calendar'

class App extends  React.Component{
    state = {
        date:null
    };


    handleDateChange = date => this.setState({date});



    render(){
        const {date} = this.state;
        return(
            <div>
                {date && <h2>выбранная дата:{date.toLocaleDateString()}</h2>}
                <Calendar

                    onChange={this.handleDateChange}

                />
            </div>
        );
    }
}
export default App;