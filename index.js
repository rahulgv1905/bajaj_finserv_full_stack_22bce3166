
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());


function processData(data) {
  const odd_numbers = [];
  const even_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;
  let concat_string = '';

  data.forEach(item => {
    
    if (!isNaN(item) && !isNaN(parseFloat(item))) {
      const num = parseInt(item);
      if (num % 2 === 0) {
        even_numbers.push(item);
      } else {
        odd_numbers.push(item);
      }
      sum += num;
    } 
  
    else if (/[a-zA-Z]/.test(item)) {
     
      const allAlphabets = item.split('').every(char => /[a-zA-Z]/.test(char));
      if (allAlphabets) {
        alphabets.push(item.toUpperCase());
        concat_string += item;
      } else {
        
        for (const char of item) {
            if (/[a-zA-Z]/.test(char)) {
                alphabets.push(char.toUpperCase());
                concat_string += char;
            } else {
                special_characters.push(char);
            }
        }
      }
    } 
   
    else {
      special_characters.push(item);
    }
  });

  
  let final_concat_string = '';
  for (let i = concat_string.length - 1; i >= 0; i--) {
    const char = concat_string[i];
   
    if ((concat_string.length - 1 - i) % 2 === 0) {
      final_concat_string += char.toUpperCase();
    } else {
      final_concat_string += char.toLowerCase();
    }
  }

  
  return {
    is_success: true,
    user_id: "vangaveti_rahul_gupta_19012005",  //full name in lower case with dob
    email: "vangavetirahul@gmail.com", //email id
    roll_number: "22bce3166", //VIT Uni registration number
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: String(sum), 
    concat_string: final_concat_string,
  };
}

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the BFHL API. Please use the /bfhl route with a POST request and a JSON body containing a "data" array.');
});

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ 
      is_success: false, 
      error: 'Invalid input. "data" must be an array in the request body.' 
    });
  }

  try {
    const result = processData(data);
    
    res.status(200).json(result); 
  } catch (error) {
  
    console.error("Error processing data:", error);
    res.status(500).json({ 
      is_success: false, 
      error: 'An internal server error occurred.',
      details: error.message 
    });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
