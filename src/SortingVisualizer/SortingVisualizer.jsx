import './SortingVisualizer.css';
import React from 'react';
import {getMergeSortAnimations, getBubbleSortAnimations} from '../SortingAlgorithms/SortingAlgorithms';


const ANIMATION_SPEED = 3;

const NUMBER_OF_BARS = 210;

const MAIN_COLOR = 'firebrick';

const COMPARE_COLOR = 'lightblue';


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }


    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_BARS; i++) {
            array.push(randomIntFromInterval(5,720));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if(isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? COMPARE_COLOR : MAIN_COLOR;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex];
                    barOneStyle.style.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if(isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? COMPARE_COLOR : MAIN_COLOR;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED/20);
            } else {
                setTimeout(() => {
                    const [barOneIndex, barOneNewHeight, barTwoIndex, barTwoNewHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex];
                    const barTwoStyle = arrayBars[barTwoIndex];
                    barOneStyle.style.height = `${barOneNewHeight}px`;
                    barTwoStyle.style.height = `${barTwoNewHeight}px`;
                }, i * ANIMATION_SPEED/30);
            }
        }

    }

    quickSort() {
        
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div 

                        className="array-bar" 
                        key={idx} 
                        style={{
                            backgroundColor: MAIN_COLOR,
                            height: `${value}px`,
                        }}>
                    
                    </div>
                ))}

                <div className="button-container">
                    <button onClick={() => this.resetArray()}>Generate!</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort!</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort!</button>
                    <button onClick={() => this.quickSort()}>Quick Sort!</button>
                </div>
            
            </div>
        );
    }
}

function randomIntFromInterval (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}