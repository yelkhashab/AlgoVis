let array = [];
let delay = 100; // Default delay in ms for visualization

document.addEventListener('DOMContentLoaded', (event) => {
    generateArray();
    const elements = document.getElementsByClassName("array-bar");

    // Bind the sorting buttons to their respective functions
    document.getElementById('bubble-sort-btn').addEventListener('click', () => bubbleSort(elements));
    document.getElementById('quick-sort-btn').addEventListener('click', () => quickSort(elements, 0, array.length - 1));
    document.getElementById('merge-sort-btn').addEventListener('click', () => mergeSort(elements, array, 0, array.length - 1));
    document.getElementById('generate-array-btn').addEventListener('click', () => generateArray());

    // Speed control listener
    document.getElementById('speedRange').addEventListener('input', function () {
        document.getElementById('speedDisplay').innerText = `${this.value}ms`;
        delay = this.value;
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        document.body.classList.toggle('light-mode', !this.checked);
    });

    // Initialize in light mode
    document.body.classList.add('light-mode');
});

function generateArray() {
    array = [];
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";

    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
        const arrayBar = document.createElement("div");
        arrayBar.classList.add("array-bar");
        arrayBar.style.height = `${array[i]*3}px`;
        arrayContainer.appendChild(arrayBar);
    }
}

// Bubble Sort
async function bubbleSort(elements) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            elements[j].style.backgroundColor = "red";
            elements[j + 1].style.backgroundColor = "red";

            if (array[j] > array[j + 1]) {
                await new Promise(resolve => setTimeout(resolve, 100));
                swap(j, j + 1);
                updateHeight(elements, j, j + 1);
            }

            elements[j].style.backgroundColor = "blue";
            elements[j + 1].style.backgroundColor = "blue";
        }
    }
}

// Quick Sort
async function quickSort(elements, start, end) {
    if (start >= end) return;
    let index = await partition(elements, start, end);
    elements[start].style.backgroundColor = "blue";
    elements[end].style.backgroundColor = "blue";

    await quickSort(elements, start, index - 1);
    await quickSort(elements, index + 1, end);
}

async function partition(elements, start, end) {
    const pivotValue = array[end];
    let pivotIndex = start;
    elements[end].style.backgroundColor = "green";

    for (let i = start; i < end; i++) {
        elements[i].style.backgroundColor = "red";
        if (array[i] < pivotValue) {
            await new Promise(resolve => setTimeout(resolve, 100));
            swap(i, pivotIndex);
            updateHeight(elements, i, pivotIndex);
            pivotIndex++;
        }
        elements[i].style.backgroundColor = "blue";
    }

    await new Promise(resolve => setTimeout(resolve, 100));
    swap(pivotIndex, end);
    updateHeight(elements, pivotIndex, end);

    return pivotIndex;
}

// Merge Sort
async function mergeSort(elements, arr, l, r) {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(elements, arr, l, m);
    await mergeSort(elements, arr, m + 1, r);
    await merge(elements, arr, l, m, r);
}


async function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        updateSingleHeight(elements, k, arr[k]);
        k++;
    }

    while (i < n1) {
        await new Promise(resolve => setTimeout(resolve, 100));
        arr[k] = L[i];
        updateSingleHeight(elements, k, arr[k]);
        i++;
        k++;
    }

    while (j < n2) {
        await new Promise(resolve => setTimeout(resolve, 100));
        arr[k] = R[j];
        updateSingleHeight(elements, k, arr[k]);
        j++;
        k++;
    }
}

// Utility Functions
function swap(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function updateHeight(elements, i, j) {
    elements[i].style.height = `${array[i]*3}px`;
    elements[j].style.height = `${array[j]*3}px`;
}

function updateSingleHeight(elements, i, value) {
    elements[i].style.height = `${value*3}px`;
}

const elements = document.getElementsByClassName("array-bar");
generateArray();
