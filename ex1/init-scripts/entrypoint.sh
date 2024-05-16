#!/bin/bash
echo "Running post-startup scripts..."

#Verify if the environment variables are set, if not set them to default values
DB_NAME=contratos
CL_NAME=contratos

# Navigate to the directory (optional, remove the line if you run the script inside the target directory)
cd /mongo
mongoimport --db $DB_NAME --collection $CL_NAME --file contratos.json --jsonArray
echo "Data import completed successfully."