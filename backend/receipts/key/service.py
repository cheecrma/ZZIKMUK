import os

def connect():
    directory_path = os.path.dirname(__file__)
    file_path = os.path.join(directory_path, 'wise-shell-362502-9c666904064f.json')
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = file_path
    print('service key connect')
    print(os.environ["GOOGLE_APPLICATION_CREDENTIALS"])
    print('-----')