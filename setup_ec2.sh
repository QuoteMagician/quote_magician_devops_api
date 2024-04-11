#!bin/bash

# Update package lists
sudo yum update -y

# Install Docker
sudo amazon-linux-extras install docker -y
sudo service docker start

# Open necessary ports
# frontend
sudo firewall-cmd --permanent --add-port 80/tcp
# backend
sudo firewall-cmd --permanent --add-port 4000/tcp
sudo firewall-cmd --reload

# Enable Docker on boot
sudo systemctl enable docker