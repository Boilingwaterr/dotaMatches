import React, { useState } from 'react';
import Style from './StatTable.module.css';
import { generateKeys } from '../../../utility';
import { constants } from '../../constants'
//import Tooltip from '../../tooltip/Tooltip';

const ItemImg = props =>{

    const [ showTooltip, setShowTooltip ] = useState(false);
    const { imgSource } = constants;
    let keys;
    //const [ coordinates, setCoordinates ] = useState({});// coordinates for tooltip
    const { backPackItemImg, itemImg, neutralItemImg } = props;
    return <div className = { Style.itemImages }>
        <div className = { Style.items }>
            <div>
                {   
                    itemImg.map( ( item, index) => {          
                        if (index === 0) {
                            keys = Array.from(generateKeys.getRandomKey('item', 0, itemImg.length, itemImg.length));
                        }
                        return <img
                            key = { keys.map( (itm, indx) => indx === index && itm ) }
                            src = {`${ imgSource }${ item }`} 
                            alt = " "
                            onMouseEnter = { () => 
                                setTimeout( () => {
                                    setShowTooltip(true)
                                }, 200)
                            }
                            onMouseMove = { event => {
                                // setCoordinates(
                                //     {
                                //         left: event.pageX + 20, 
                                //         top: event.pageY + 20
                                //     }
                                // )
                            }}
                            onMouseLeave = { () => showTooltip && setShowTooltip(false) }
                        />
                    })
                }
            </div>
            <div>
                {
                    backPackItemImg.map( ( item, index ) => {
                        if (index === 0) {
                            keys = Array.from(generateKeys.getRandomKey('backPack', 0, backPackItemImg.length, backPackItemImg.length));
                        }
                        return <img 
                            key = { keys.map( (itm, indx) => indx === index && itm ) }
                            src = {`${ imgSource }${ item }`} 
                            alt = " "
                            onMouseEnter = { () => setShowTooltip(true)}
                            onMouseMove = { event => {
                                // setCoordinates(
                                //     {
                                //         left: event.pageX + 20, 
                                //         top: event.pageY + 20
                                //     }
                                //)
                            }}
                            onMouseLeave = { () => setShowTooltip(false) }
                        />
                    })
                }
            </div>
        </div>
        <div className = { Style.neutralItems }>
            {
                neutralItemImg.map( ( item, index ) => {
                    if (index === 0) {
                        keys = Array.from(generateKeys.getRandomKey('neutral', 0, neutralItemImg.length, neutralItemImg.length));
                    }
                    return <img
                        key = { keys.map( (itm, indx) => indx === index && itm ) }
                        src = {`${ imgSource }${ item }`} 
                        alt = " "
                        onMouseEnter = { () => setShowTooltip(true)}
                        onMouseMove = { event => {
                            // setCoordinates(
                            //     {
                            //         left: event.pageX + 20, 
                            //         top: event.pageY + 20
                            //     }
                            // )
                        }}
                        onMouseLeave = { () => setShowTooltip(false) }
                    />
                })
            }
        </div>
        {/* { showTooltip && <Tooltip type = "item" coordinates = { coordinates }/> } */}
    </div>
}

export default ItemImg;