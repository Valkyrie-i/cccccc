import React from 'react';
import style from './index.modelu.css'
import * as calendar from './calendar'
import classnames from 'classnames'

export default  class Calendar extends React.Component{



    static defaultProps = {
        date: new Date(),
        years:[2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
        month:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        days:['пн','вт','ср','чт','пт','сб','вс'],
        onChange: Function.prototype
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null
    };

    get year(){
        return this.state.date.getFullYear()
    }

    get month(){
        return this.state.date.getMonth()
    }
    get day(){
        return this.state.date.getDate()
    }

    handlePrev = () =>{
        const date = new Date(this.year, this.month - 1);


        this.setState({date});
    }
    handleNext = () =>{
        const date = new Date(this.year, this.month + 1);


        this.setState({date});
    }
    handleChange = () =>{
        const year = this.yearSelect.value;
        const month = this.monthSelect.value;
        const date = new Date(year,month);
        console.log(date)
        this.setState({date});

    }
    handleDayClick = date =>{
        this.setState({selectedDate: date});
        console.log(date)
        this.props.onChange(date);
    }

    render(){
        const {years,month,days} = this.props;

        const MonthData = calendar.getMonthData(this.year, this.month);
        const {currentDate, selectedDate} = this.state;
        return(
            <div className={style.calendar}>
                <header>
                    <button onClick={this.handlePrev}>{'<'}</button>

                    <select onChange={this.handleChange}
                            value={this.month}
                    ref={element => this.monthSelect = element}
                    >
                        {month.map((name,index)=>
                            <option key={name} value={index}>{name}</option>
                        )}
                    </select>

                    <select onChange={this.handleChange}
                            value={this.year}
                    ref={element => this.yearSelect = element}
                    >
                        {years.map(year =>
                            <option key={year} value={year}>{year}</option>
                            )}
                    </select>

                    <button onClick={this.handleNext}>{'>'}</button>
                </header>

                <table>

                    <thead>
                        <tr>
                            {days.map(name =>
                                <th key={name}>{name}</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {MonthData.map((week, index)=>
                            <tr key={index}>{week.map((date, index)=> date ?

                                <td key={index} onClick={() => this.handleDayClick(date) }
                                className={classnames('day', {
                                    'today': calendar.areEqual(date, currentDate),
                                    'selected': calendar.areEqual(date, selectedDate)
                                })}
                                >{date.getDate()}</td>

                                :

                                <td key={index}/>

                            )}</tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}