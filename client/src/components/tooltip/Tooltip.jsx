import React from 'react';
import ReactDOM from 'react-dom';
import Style from './Tooltip.module.css';
import HeroCard from './hero_card/HeroCard';
import PlayerCard from './player_card/PlayerCard';
import ItemCard from './item_card/ItemCard';

export default class Tooltip extends React.Component {

    UNSAFE_componentWillMount() {
        this.root = document.createElement('div');
        document.body.appendChild(this.root);
    }

    componentWillUnmount() {
        document.body.removeChild(this.root);
    }
    
    render() {
        switch (this.props.type) {
            case 'hero':
                return ReactDOM.createPortal( 
                <div 
                    className = { Style.tooltip }
                    style = { { ...this.props.coordinates, ...this.props.toolTipSize } }
                >
                    <HeroCard { ...this.props }/>
                </div>, this.root )
            case 'player':
                return ReactDOM.createPortal(
                <div 
                    className = { Style.tooltip }
                    style = { { ...this.props.coordinates, ...this.props.toolTipSize } }
                >
                    <PlayerCard  { ...this.props } />
                </div>, this.root )
            case 'item':
                return ReactDOM.createPortal( 
                <div 
                    className = { Style.tooltip }
                    style = {this.props.coordinates}
                >
                    <ItemCard  { ...this.props } />
                </div>, this.root )
            default:
                return;
        }

    }
}