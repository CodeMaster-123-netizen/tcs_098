// script.js

const numberInput = document.getElementById('numberInput');
const convertButton = document.getElementById('convertButton');
const clearButton = document.getElementById('clearButton');
const resultDiv = document.getElementById('result');
const copyButton = document.getElementById('copyButton');

// Function to show toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);
  
  // Show the toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100); // Delay to allow for CSS transition

  // Hide the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    // Remove the toast from the DOM after the animation
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500); // Match this with the CSS transition duration
  }, 3000); // Show for 3 seconds
}

function convertNumberToWords(num) {
  const belowTwenty = [
    'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 
    'Eighteen', 'Nineteen'
  ];
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];
  const thousands = ['', 'Thousand', 'Million', 'Billion'];

  if (num < 20) return belowTwenty[num];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + belowTwenty[num % 10] : '');
  if (num < 1000) return belowTwenty[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + convertNumberToWords(num % 100) : '');

  for (let i = 0; i < thousands.length; i++) {
    const divisor = Math.pow(1000, i);
    if (num < divisor * 1000) {
      return convertNumberToWords(Math.floor(num / divisor)) + ' ' + thousands[i] + (num % divisor !== 0 ? ' ' + convertNumberToWords(num % divisor) : '');
    }
  }
}

function displayResult(text) {
  resultDiv.innerText = text;
  resultDiv.classList.add('visible'); // Add class to show border
}

// Event listener for the convert button
convertButton.addEventListener('click', () => {
  let number = parseFloat(numberInput.value); // Use parseFloat to handle decimal input
  if (!isNaN(number)) {
    number = Math.round(number); // Round off the number
    resultDiv.innerText = ''; // Clear previous result
    resultDiv.classList.remove('visible'); // Remove border initially
    document.querySelector('.loading').style.display = 'block'; // Show loading

    setTimeout(() => { // Simulate processing time
      if (number < 0 || number > 999999999999) {
        displayResult('Please enter a valid positive number between 0 and 999,999,999,999.');
      } else {
        const words = convertNumberToWords(number);
        displayResult(`${words}`); // Show only the words without the rounded number
        
        // Copy the result to clipboard
        navigator.clipboard.writeText(words).then(() => {
          showToast('Converted and copied to clipboard!'); // Show toast notification
        });
      }
      document.querySelector('.loading').style.display = 'none'; // Hide loading
    }, 500); // Simulated delay
  } else {
    displayResult('Please enter a valid number.');
  }
});

// Event listener for the clear button
clearButton.addEventListener('click', () => {
  numberInput.value = '';
  resultDiv.innerText = '';
  resultDiv.classList.remove('visible'); // Remove border
  numberInput.focus();
});

// Event listener for the copy button
copyButton.addEventListener('click', () => {
  const resultText = resultDiv.innerText;
  if (resultText) {
    navigator.clipboard.writeText(resultText).then(() => {
      showToast('Copied to clipboard!');
    });
  } else {
    showToast('Nothing to copy!');
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) {
    navLinks.classList.remove('active');
  }
});
