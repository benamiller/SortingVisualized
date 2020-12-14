export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) {
        return array;
    }    
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}


function mergeSortHelper(
    mainArray,
    startIndex,
    endIndex,
    auxiliaryArray,
    animations,
) {
    if (startIndex === endIndex) {
        return;
    }

    const middleIndex = Math.floor((startIndex + endIndex) / 2);

    mergeSortHelper(auxiliaryArray, startIndex, middleIndex, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIndex + 1, endIndex, mainArray, animations);
    mergeStep(mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations);
}


function mergeStep(
    mainArray,
    startIndex,
    middleIndex,
    endIndex,
    auxiliaryArray,
    animations,
) {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;

    while (i <= middleIndex && j <= endIndex) {
        animations.push([i,j]);
        animations.push([i,j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= middleIndex) {
        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([k, auxiliaryArray[i]])
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= endIndex) {
        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([k, auxiliaryArray[j]])
        mainArray[k++] = auxiliaryArray[j++];
    }


}


export function getBubbleSortAnimations(array) {
    const animations = [];
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (array[j] > array[j+1]) {
                animations.push([j,j+1]);
                animations.push([j,j+1]);
                let temp = array[j];
                animations.push([j, array[j+1], j+1, temp]);
                array[j] = array[j+1];
                array[j+1] = temp;
            } else {
                animations.push([j,j+1]);
                animations.push([j,j+1]);
                animations.push([j, array[j], j+1, array[j+1]]);
            }
        }
    }
    return animations;
}