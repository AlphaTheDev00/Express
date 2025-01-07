import express from 'express'
import supplements from './data.js'

const app = express()

app.use(express.json())

// GET /supplements - Return all supplements
app.get('/supplements', function(req, res) {
  res.send(supplements)
})

// GET /supplements/:name - Return a supplement by name
app.get('/supplements/:name', function(req, res) {
  const supplementName = req.params.name

  const supplement = supplements.find((currentSupplement) => {
    return currentSupplement.name.toLowerCase() === supplementName.toLowerCase()
  })

  res.send(supplement || { message: 'Supplement not found' })
})


//Update supplement by Name
app.put('/supplements/:name', (req, res) => {
    const supplementName = req.params.name;
  
    // Find the supplement by name
    const supplement = supplements.find(
      (currentSupplement) =>
        currentSupplement.name.toLowerCase() === supplementName.toLowerCase()
    );
  
    if (!supplement) {
      return res.status(404).send({ message: 'Supplement not found' });
    }
  
    // Update properties of the supplement with the request body
    const updatedData = req.body;
  
    // Validate the input data (optional)
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).send({ message: 'No data provided to update' });
    }
  
    // Update the supplement (merge properties)
    Object.assign(supplement, updatedData);
  
    res.send({ message: 'Supplement updated successfully', updated: supplement });
  });

// POST /supplements - Add a new supplement
app.post('/supplements', function(req, res) {
  const newSupplement = req.body
  supplements.push(newSupplement)
  res.status(201).send(newSupplement)
})

app.delete('/supplements/:name', (req, res) => {
    const supplementName = req.params.name;
  
    const index = supplements.findIndex(
      (currentSupplement) =>
        currentSupplement.name.toLowerCase() === supplementName.toLowerCase()
    );
  
    if (index === -1) {
      return res.status(404).send({ message: 'Supplement not found' });
    }
  
    // Remove the supplement from the array
    const deletedSupplement = supplements.splice(index, 1);
  
    res.send({ message: 'Supplement deleted successfully', deleted: deletedSupplement });
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000!')
})
