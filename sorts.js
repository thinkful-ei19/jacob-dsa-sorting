'use strict';

function swap(array, i, j, swapCount=0) {
  swapCount++;
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}


// InsertionSort to be used within bucket sort
function insertionSort(array) {
  var length = array.length;
  
  for(var i = 1; i < length; i++) {
    var temp = array[i];
    for(var j = i - 1; j >= 0 && array[j] > temp; j--) {
      array[j+1] = array[j];
    }
    array[j+1] = temp;
  }
  
  return array;
}

// Implement bucket sort
function bucketSort(array, bucketSize=5) {
  if (array.length === 0) {
    return array;
  }

  // Declaring vars
  let i,
      minValue = array[0],
      maxValue = array[0]
  
  // Setting min and max values
  array.forEach(function (currentVal) {
  	if (currentVal < minValue) {
  		minValue = currentVal;
  	} else if (currentVal > maxValue) {
  		maxValue = currentVal;
  	}
  });

  // Initializing buckets
  var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  var allBuckets = new Array(bucketCount);
  
  for (i = 0; i < allBuckets.length; i++) {
    allBuckets[i] = [];
  }
  
  // Pushing values to buckets
  array.forEach(function (currentVal) {
  	allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
  });

  // Sorting buckets
  array.length = 0;
  
  allBuckets.forEach(function(bucket) {
  	insertionSort(bucket);
  	bucket.forEach(function (element) {
  		array.push(element);
  	});
  });

  return array;
}

function quickSort(array, start=0, end=array.length, quickCount=0) {
  start = start;
  end = end;
  quickCount++;
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle, quickCount);
  array = quickSort(array, middle + 1, end, quickCount);
  return array;
}

function randSort(array, start=0, end=array.length, quickCount=0) {
  start = start;
  end = end;
  quickCount++;
  if (start >= end) {
    return array;
  }
  const middle = randPartition(array, start+1, end-1);
  array = quickSort(array, start, middle-(Math.floor(middle*Math.random())), quickCount);
  array = quickSort(array, middle+(Math.floor(middle*Math.random())), end, quickCount);
  return array;
}


function randPartition(array, start, end, partCount=0) {
  const pivot = array[Math.floor(Math.random() * (array.length-1))];
  let j = start;
  let rand = Math.random()*10;
  for (let i=start; i<end - 1; i++) {
    partCount++;
    if (rand<5) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end-1, j);
  return j;
}
function partition(array, start, end, partCount=0) {
  const pivot = array[end - 1];
  let j = start;
  for (let i=start; i<end - 1; i++) {
    partCount++;
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end-1, j);
  return j;
}

function mergeSort(array, mergeCount=0) {
  if (array.length <= 1) {
    return array;
  }
  mergeCount++;
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left, mergeCount);
  right = mergeSort(right, mergeCount);
  console.log('mergeSortCount', mergeCount);
  return merge(left, right, array);
}

function merge(left, right, array, count=0) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    count++;
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i=leftIndex; i<left.length; i++) {
    array[outputIndex++] = left[i];
    count++;
  }

  for (let i=rightIndex; i<right.length; i++) {
    array[outputIndex++] = right[i];
    count++;
  }
  console.log('mergeCount',count);
  return array;
}


let arr = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 7, 3, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];

console.log(JSON.stringify(randSort(arr)));
//console.log(mergeSort(arr));
//console.log(bucketSort(arr));


/*
  We can write a bubble sort on the array of books which we are given,
  compare each book with each other book and compare the first letter 
  in the first book to the first letter in the second book and if the
  first letter is alphanumerically less than the second book's first 
  letter, we swap and then continue on until all swaps are made.


  compare the letters alphanumerically

  function bubbleSortBooks(array) {
    let swaps = 0;
    for (let i=0; i<array.length; i++) {
      for (let j=1; j<array.length; j++) {
        for (let k=0; k<book1.length; k++){
            if (book1[k].charCode() > book2[k].charCode()) {
              swap(array, i, i +1);
              swaps++;
              break;
            }
          }
        }
      }
    if (swaps > 0) {
        return bubbleSort(array);
    }
    return array;
};
*/