# Use official Python image as a base
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies for ODBC (SQL Server) and PySpark (Java)
RUN apt-get update && apt-get install -y \
    unixodbc \
    unixodbc-dev \
    curl \
    gnupg \
    default-jre \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy ML pipeline code
COPY . .

# Command to trigger the MLOps training pipeline
CMD ["python", "predictive_maintenance.py"]
