FROM python:3.12.4

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    apt-transport-https \
    gnupg \
    unixodbc-dev \
    && rm -rf /var/lib/apt/lists/*

# Add Microsoft package signing key to the list of trusted keys
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -

# Add Microsoft SQL Server repository
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list

# Update and install the ODBC driver
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql18

WORKDIR /app
COPY . /app

# Upgrade pip
RUN pip install --upgrade pip

# Install requirements
RUN pip install -r requirements.txt

EXPOSE 5000
CMD python ./run.py