import React, { Component } from 'react';
import Card from "./Card.js"
import CreateCard from "./CreateCard.js"
import Immutable from 'immutable';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CardContainer extends Component {
    constructor() {
      super();
      this.state = {
        cards: Immutable.fromJS([{
          word: '家賃',
          description: 'Tiền nhà. Tiền trả khi thuê nhà.',
        }, {
          word: '管理費',
          description: 'Chi phí quản lý.',
        }, {
          word: '敷金',
          description: 'Tiền đặt cọc,  tiền bảo đảm trước khi thuê nhà.',
        }
      ]),
        cardNumber: 0
      };
      this.boundCallback = this.hideCreateCard.bind(this);
      this.boundCreateCard = this.setCard.bind(this);
      this.boundShowPrevCard = this.showPrevCard.bind(this);
      this.boundShowNextCard = this.showNextCard.bind(this);
    }
    
    hideCreateCard() {
      this.setState({showModal: false});
    }
    
    showNextCard() {
      if ((this.state.cardNumber + 1) !== this.state.cards.size) {
        this.setState({cardNumber: this.state.cardNumber += 1});
      }
    }
    
    showPrevCard() {
      if (this.state.cardNumber !== 0) {
        this.setState({cardNumber: this.state.cardNumber -= 1});
      }
    }
    
    setCard(card) {
      const newCards = this.state.cards.push(card);
      this.setState({cards: newCards});
    }
    
    generateDots() {
      const times = this.state.cards.size;
      let arr = [];
      _.times(times).forEach((num) => {
        const dotClass = num  === this.state.cardNumber ? 'active' : '';
        arr.push(
          <span 
            className={`card-container__dot fa fa-circle ${dotClass}`}
            onClick={() => this.setState({cardNumber: num})}
          />
        )
      });
      return arr;
    }
    
    generateCards() {
      const cards = this.state.cards;
       const cardsList = cards.map((card) => {
          return (
            <Card 
              frontContent={card.get('word')}
              backContent={card.get('description')}
              showNextCard={this.boundShowNextCard}
              showPrevCard = {this.boundShowPrevCard}
              cardNumber={this.state.cardNumber}
            />
            );
        })
       return(cardsList.toJS()[this.state.cardNumber]); 
    }
    render() {
      return (
        <div>
            <button 
                className='card-container__icon fa fa-plus' 
                onClick={() => {
                    this.setState({showModal: !this.state.showModal});
                }}
            >New Card</button>
            {this.state.showModal 
            ? <CreateCard 
                onShadowClick={this.boundCallback}
                onCreateCard={this.boundCreateCard}
              /> 
            : ''}
            {this.generateCards()}
            <div className='card-container__dots-wrapper'>
                {this.generateDots()}
            </div>
        </div>
     );
    }
  }

export default CardContainer;