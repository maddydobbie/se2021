To access out code, please follow the instructions below:


Install Python3 using the command in bash/terminal: sudo dnf install python3


Go to our github repo and clone it: https://github.com/unsw-se2021/idk


In the directory the idk project is in create a virtual environment by running the following commands in bash/terminal:


py -m pip install --upgrade pip


python3 -m pip install --user --upgrade pip


python3 -m pip install --user virtualenv


python3 -m venv env


. env/bin/activate


Install requests packages using the command: pip install requests


Apply migrations using the command: python3 manage.py migrate


Run server using the command: python3 manage.py runserver
