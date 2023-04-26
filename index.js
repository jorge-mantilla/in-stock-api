const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5051;
// const inventoryRoutes = require('./routes/inventoryRoute');
const warehouseRoutes = require('./routes/warehouseRoute');
const inventoryRoutes = require('./routes/inventoryRoute');

app.use(cors());
app.use(express.json());

app.use('/warehouses', warehouseRoutes);
app.use('/inventories', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});